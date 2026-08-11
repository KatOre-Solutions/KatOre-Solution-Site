"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  onDark = false,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Set when the heading sits on a dark band rather than the light page. */
  onDark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const words = title.split(" ");

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".heading-word"), {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
      const sub = el.querySelector(".heading-sub");
      if (sub) {
        gsap.from(sub, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={align === "center" ? "text-center" : "text-left"}>
      <h2
        className={`text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl xl:text-6xl ${
          onDark ? "text-white" : "text-foreground"
        }`}
      >
        {words.map((w, i) => (
          <span key={i} className="heading-word inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p
          className={`heading-sub mt-4 max-w-2xl text-base md:text-lg ${
            onDark ? "text-white/60" : "text-muted-foreground"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
