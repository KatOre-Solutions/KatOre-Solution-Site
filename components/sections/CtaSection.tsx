"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const CtaBackground = dynamic(
  () => import("@/components/three/CtaBackground"),
  { ssr: false }
);

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[var(--w-main)]">
        {/*
          The one full-strength dark block on an otherwise light page — this is
          where the contrast is spent, so everything inside runs inverted.
        */}
        <div
          ref={ref}
          className="metal-dark relative overflow-hidden rounded-3xl px-6 py-24 text-center shadow-[0_24px_70px_rgba(17,19,21,0.16)] md:py-36"
        >
          <CtaBackground />
          {/* CSS sheen fallback / reinforcement */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.20)_0%,_transparent_62%)]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
              Every solution starts with{" "}
              <span className="font-bold">a problem worth solving.</span>
            </h2>

            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-foreground transition-colors hover:bg-platinum"
              >
                Let&apos;s work together
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
