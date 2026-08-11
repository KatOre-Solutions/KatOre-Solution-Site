"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

const FRAGMENT = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv;
    p.x *= uResolution.x / uResolution.y;

    // Drifting glow center
    vec2 center = vec2(0.32 * (uResolution.x / uResolution.y), 0.5);
    center.x += sin(uTime * 0.2) * 0.08;
    center.y += cos(uTime * 0.15) * 0.05;

    float d = distance(p, center);
    float glow = smoothstep(0.75, 0.0, d);
    glow = pow(glow, 1.6);

    // Brushed-metal sheen: graphite ground lifting toward #3A3E43, with a
    // restrained silver core. No hue — the whole palette is neutral.
    vec3 base     = vec3(0.067, 0.075, 0.082); // #111315
    vec3 graphite = vec3(0.227, 0.243, 0.263); // #3A3E43
    vec3 silver   = vec3(0.655, 0.671, 0.690); // #A7ABB0

    vec3 col = mix(base, graphite, glow * 0.95);
    col += silver * pow(glow, 3.5) * 0.16;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERTEX = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export default function CtaBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = prefersReducedMotion();

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let frameId = 0;
    const start = performance.now();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      uniforms.uTime.value = reduced ? 0 : (performance.now() - start) / 1000;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
