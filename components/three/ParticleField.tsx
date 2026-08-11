"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";
import { particleController } from "@/lib/particleController";
import {
  CAMERA_FOV,
  CAMERA_Z,
  POINT_COUNT,
  getColors,
  getLogoShape,
  getShapes,
} from "@/lib/particleShapes";

type Inst = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  points: THREE.Points;
  material: THREE.PointsMaterial;
  geometry: THREE.BufferGeometry;
  arr: Float32Array;
  attr: THREE.BufferAttribute;
  shapes: Float32Array[];
  dispOffsetX: number;
  dispScale: number;
  dispOpacity: number;
  parX: number;
  parY: number;
  mouseX: number;
  mouseY: number;
  spinAngle: number;
  /** Per-point repulsion offset, eased toward the cursor's target each frame. */
  push: Float32Array;
  pointerActive: boolean;
  /** Colour ramps and the cross-fade between them. */
  colLight: Float32Array;
  colDark: Float32Array;
  colArr: Float32Array;
  colAttr: THREE.BufferAttribute;
  dispTone: number;
  appliedTone: number;
};

/** Cursor repulsion, in world units. */
const PUSH_RADIUS = 125;
const PUSH_STRENGTH = 65;
/** Ease rates: particles flee quickly, then drift back into formation. */
const PUSH_OUT = 0.3;
const PUSH_BACK = 0.055;

/**
 * Single persistent, full-viewport point cloud shared by the hero and the
 * pinned Services section. The renderer/scene are created exactly once and kept
 * in a ref so React Strict Mode's dev remount (which would otherwise dispose the
 * WebGL context and leave the canvas blank) can't tear them down — the effect
 * only starts and stops the animation loop.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instRef = useRef<Inst | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = prefersReducedMotion();

    // ---- one-time setup ----
    if (!instRef.current) {
      const shapes = getShapes();
      const logo = getLogoShape();
      if (!particleController.state.shapeA) {
        particleController.set({
          shapeA: logo,
          shapeB: logo,
          morphT: 0,
          spin: 0,
        });
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        1,
        3000
      );
      camera.position.z = CAMERA_Z;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);

      const positions = new Float32Array(POINT_COUNT * 3);
      positions.set(logo);
      const colLight = getColors("onLight");
      const colDark = getColors("onDark");
      const colArr = new Float32Array(colLight);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colArr, 3));

      const material = new THREE.PointsMaterial({
        // Additive blending only works over a dark ground — on Soft White it
        // drives every point to white and the mark disappears. Normal blending
        // with the graphite/silver vertex ramp is what makes it read on light.
        color: 0xffffff,
        vertexColors: true,
        size: 2.4,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      instRef.current = {
        renderer,
        scene,
        camera,
        points,
        material,
        geometry,
        arr: positions,
        attr: geometry.attributes.position as THREE.BufferAttribute,
        shapes,
        dispOffsetX: 0,
        dispScale: 1,
        dispOpacity: 1,
        parX: 0,
        parY: 0,
        mouseX: 0,
        mouseY: 0,
        spinAngle: 0,
        push: new Float32Array(POINT_COUNT * 3),
        pointerActive: false,
        colLight,
        colDark,
        colArr,
        colAttr: geometry.attributes.color as THREE.BufferAttribute,
        dispTone: 0,
        appliedTone: 0,
      };
    }

    const inst = instRef.current;

    const setSize = () => {
      inst.renderer.setSize(window.innerWidth, window.innerHeight, false);
      inst.camera.aspect = window.innerWidth / window.innerHeight;
      inst.camera.updateProjectionMatrix();
    };
    setSize();

    const onMouseMove = (e: MouseEvent) => {
      inst.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      inst.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      inst.pointerActive = true;
    };
    // Releasing on leave lets the cloud reassemble instead of holding a hole at
    // the last known cursor position.
    const onMouseLeave = () => {
      inst.pointerActive = false;
    };
    if (!reduced) {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
    }
    window.addEventListener("resize", setSize);

    // Scratch vectors, reused every frame so the hot loop allocates nothing.
    const cursor = new THREE.Vector3();
    const viewAxis = new THREE.Vector3();
    const invMatrix = new THREE.Matrix4();

    /**
     * Blend the two target shapes, then shoulder every point out of the cursor's
     * way. The cursor is a line through the scene along the camera axis rather
     * than a single point, so the cavity tracks what the viewer actually sees
     * near their pointer regardless of the cloud's depth or rotation.
     */
    const applyMorph = () => {
      const { shapeA, shapeB, morphT } = particleController.state;
      const a = shapeA ?? inst.shapes[0];
      const b = shapeB ?? a;
      const arr = inst.arr;
      const push = inst.push;

      // Cursor and camera axis in the cloud's own (rotated, scaled) space.
      let active = inst.pointerActive;
      let radius = PUSH_RADIUS;
      let strength = PUSH_STRENGTH;
      if (active) {
        const halfH =
          Math.tan(THREE.MathUtils.degToRad(inst.camera.fov) / 2) *
          inst.camera.position.z;
        cursor.set(inst.mouseX * halfH * inst.camera.aspect, -inst.mouseY * halfH, 0);
        inst.points.updateMatrixWorld();
        invMatrix.copy(inst.points.matrixWorld).invert();
        cursor.applyMatrix4(invMatrix);
        viewAxis.set(0, 0, 1).transformDirection(invMatrix);
        // Distances below are local, so undo the cloud's uniform scale.
        const s = inst.dispScale || 1;
        radius /= s;
        strength /= s;
        if (!Number.isFinite(cursor.x)) active = false;
      }
      const r2 = radius * radius;

      for (let i = 0; i < POINT_COUNT; i++) {
        const j = i * 3;
        const x = a[j] + (b[j] - a[j]) * morphT;
        const y = a[j + 1] + (b[j + 1] - a[j + 1]) * morphT;
        const z = a[j + 2] + (b[j + 2] - a[j + 2]) * morphT;

        let tx = 0,
          ty = 0,
          tz = 0;
        if (active) {
          // Component of (point - cursor) perpendicular to the view axis.
          const vx = x - cursor.x;
          const vy = y - cursor.y;
          const vz = z - cursor.z;
          const along = vx * viewAxis.x + vy * viewAxis.y + vz * viewAxis.z;
          const px = vx - along * viewAxis.x;
          const py = vy - along * viewAxis.y;
          const pz = vz - along * viewAxis.z;
          const d2 = px * px + py * py + pz * pz;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const falloff = 1 - d / radius;
            const amt = (strength * falloff * falloff) / d;
            tx = px * amt;
            ty = py * amt;
            tz = pz * amt;
          }
        }

        const cx = push[j];
        const cy = push[j + 1];
        const cz = push[j + 2];
        const k =
          tx * tx + ty * ty + tz * tz > cx * cx + cy * cy + cz * cz
            ? PUSH_OUT
            : PUSH_BACK;
        push[j] = cx + (tx - cx) * k;
        push[j + 1] = cy + (ty - cy) * k;
        push[j + 2] = cz + (tz - cz) * k;

        arr[j] = x + push[j];
        arr[j + 1] = y + push[j + 1];
        arr[j + 2] = z + push[j + 2];
      }
      inst.attr.needsUpdate = true;
    };

    const render = () => {
      const s = particleController.state;
      inst.dispOffsetX += (s.offsetX - inst.dispOffsetX) * 0.07;
      inst.dispScale += (s.scale - inst.dispScale) * 0.07;
      inst.dispOpacity += (s.opacity - inst.dispOpacity) * 0.07;
      inst.parX += (inst.mouseX - inst.parX) * 0.05;
      inst.parY += (inst.mouseY - inst.parY) * 0.05;
      inst.dispTone += (s.tone - inst.dispTone) * 0.07;

      // Re-blend the colour ramps only while the tone is actually moving.
      if (Math.abs(inst.dispTone - inst.appliedTone) > 0.002) {
        const t = inst.dispTone;
        const a = inst.colLight;
        const b = inst.colDark;
        const c = inst.colArr;
        for (let i = 0; i < c.length; i++) c[i] = a[i] + (b[i] - a[i]) * t;
        inst.colAttr.needsUpdate = true;
        inst.appliedTone = t;
      }

      inst.points.position.x = inst.dispOffsetX;
      inst.points.scale.setScalar(inst.dispScale);
      inst.material.opacity = inst.dispOpacity * 0.9;
      // Free spin is accumulated, while the mouse only tilts within a bounded
      // range — a flat glyph (spin ≈ 0) must never drift far enough to turn
      // edge-on. The slow rock keeps those glyphs alive and shows their depth.
      inst.spinAngle += 0.0016 * s.spin;
      if (s.spin < 0.05) {
        // Settled on a still glyph: unwind whatever angle the cloud picked up
        // while it was spinning so the mark ends up square to the camera again.
        const TAU = Math.PI * 2;
        const facing = Math.round(inst.spinAngle / TAU) * TAU;
        inst.spinAngle += (facing - inst.spinAngle) * 0.06;
      }
      const rock = (1 - Math.min(s.spin, 1)) * Math.sin(performance.now() * 0.0004) * 0.09;
      inst.points.rotation.y = inst.spinAngle + rock + inst.parX * 0.22;
      inst.points.rotation.x = inst.parY * 0.12;

      // After the transform, so the repulsion maps the cursor through this
      // frame's rotation rather than the last one's.
      applyMorph();

      inst.renderer.render(inst.scene, inst.camera);
    };

    let frameId = 0;
    if (reduced) {
      render();
    } else {
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        render();
      };
      loop();
    }

    // Only stop the loop / listeners here. The renderer + GL context intentionally
    // persist across Strict Mode's dev remount so the canvas is never blanked.
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
