"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";
import { getColors, sphere } from "@/lib/particleShapes";

/** Every Nth point of the shared sphere buffer — the hero cloud's density is
 *  far more than a decorative footer globe needs. */
const STRIDE = 3;

/**
 * The particle globe at the centre of the orbit rings.
 *
 * This file was referenced by `orbiting-circles-02.tsx` but not shipped with
 * it, so it's built here on the site's own sphere generator and graphite colour
 * ramp (`lib/particleShapes`) rather than a stock one — that keeps the footer
 * globe identical in character to the hero cloud.
 *
 * It runs its own WebGL context, so rendering is gated on an IntersectionObserver:
 * the footer is off-screen for most of a visit and there is no reason to burn
 * frames on it.
 */
export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const reduced = prefersReducedMotion();

    const full = sphere();
    const fullColors = getColors("onLight");
    const count = Math.floor(full.length / 3 / STRIDE);

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const src = i * STRIDE * 3;
      positions[i * 3] = full[src];
      positions[i * 3 + 1] = full[src + 1];
      positions[i * 3 + 2] = full[src + 2];
      colors[i * 3] = fullColors[src];
      colors[i * 3 + 1] = fullColors[src + 1];
      colors[i * 3 + 2] = fullColors[src + 2];
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 1, 3000);
    camera.position.z = 620;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      vertexColors: true,
      size: 2.6,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const render = () => {
      if (!reduced) points.rotation.y += 0.0016;
      points.rotation.x = 0.18;
      renderer.render(scene, camera);
    };

    let frameId = 0;
    let running = false;
    const start = () => {
      if (running || reduced) return;
      running = true;
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        render();
      };
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    render(); // paint one frame so it is never blank before it scrolls in
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" }
    );
    io.observe(parent);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}
