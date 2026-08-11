"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scramble } from "@/lib/scramble";

/** Renders text as per-character spans the scramble effect can drive. */
function ScrambleText({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="scramble-char inline-block"
          data-final={ch}
          style={ch === " " ? { width: "0.3em" } : undefined}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

export default function WorkHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      scramble(el.querySelectorAll<HTMLElement>(".scramble-char"));
      gsap.from(".work-hero-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        delay: 0.35,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden pt-28 md:pt-36">
      {/* Top-left platinum wash, mirrors the placeholder/hero language */}
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.55)_0%,_transparent_70%)]" />

      <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
        <h1 className="select-none text-[clamp(4rem,18vw,13rem)] font-bold uppercase leading-[0.9] tracking-tight">
          <ScrambleText text="Work" />
        </h1>
        <div className="work-hero-rule metal-rule mt-6 h-px w-full md:mt-8" />
      </div>
    </section>
  );
}
