"use client";

import { useEffect, useRef } from "react";
import ScrambleText from "@/components/ui/ScrambleText";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { scramble } from "@/lib/scramble";

/**
 * The shared page title: an uppercase display heading that scrambles into place
 * above a metallic rule. Previously only /work had this treatment while every
 * other page used a plain medium heading, so the site changed character as soon
 * as you navigated.
 *
 * Size steps with the length of the title rather than being one clamp. "WORK"
 * can carry 13rem; "START YOUR PROJECT" at the same size would run off the
 * screen. The typeface, weight, casing, tracking, reveal and rule stay fixed,
 * which is what actually reads as consistency.
 */
function sizeFor(title: string): string {
  const n = title.length;
  if (n <= 6) return "text-[clamp(4rem,18vw,13rem)]";
  if (n <= 12) return "text-[clamp(3rem,13vw,9rem)]";
  if (n <= 20) return "text-[clamp(2.25rem,9vw,6rem)]";
  return "text-[clamp(1.875rem,7vw,4.5rem)]";
}

export default function PageHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      scramble(el.querySelectorAll<HTMLElement>(".scramble-char"));
      gsap.from(".page-heading-rule", {
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
    <div ref={rootRef}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`select-none font-bold uppercase leading-[0.9] tracking-tight ${sizeFor(
          title
        )}`}
      >
        <ScrambleText text={title} />
      </h1>
      <div className="page-heading-rule metal-rule mt-6 h-px w-full md:mt-8" />
    </div>
  );
}
