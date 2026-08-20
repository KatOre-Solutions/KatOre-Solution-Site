"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ScrambleText from "@/components/ui/ScrambleText";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { particleController } from "@/lib/particleController";
import { LOGO_SPAN, fitScale, getLogoShape, getShapes } from "@/lib/particleShapes";
import { scramble } from "@/lib/scramble";

/**
 * Two counted figures and one stated fact.
 *
 * The third slot read "24/7 Support Available", which directly contradicted the
 * hosting service page: that page says we do not advertise round the clock
 * cover or a guaranteed response time, because support is scoped per project.
 * Support is genuinely ongoing, it is simply not a 24 hour promise, so the slot
 * now says the true thing instead.
 */
const stats: {
  count?: number;
  suffix?: string;
  text?: string;
  label: string;
}[] = [
  { count: 10, suffix: "+", label: "Projects Delivered" },
  { count: 100, suffix: "%", label: "Client Satisfaction" },
  { text: "Ongoing", label: "Support Available" },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const shapes = getShapes();
    const logo = getLogoShape();
    // Scroll progress is mirrored here so a resize can re-apply the current
    // state with a freshly measured fit scale.
    const progress = { value: 0 };

    const apply = () => {
      // Hold the logo while the hero is on screen, then dissolve it into the
      // sphere over the back half of the scroll so Services — which opens on
      // shapes[0] — inherits a shape that already matches.
      const t = gsap.utils.clamp(0, 1, (progress.value - 0.35) / 0.5);
      const fit = fitScale(LOGO_SPAN);
      particleController.set({
        shapeA: logo,
        shapeB: shapes[0],
        morphT: t,
        offsetX: 0,
        // The mark is sized to the viewport; the sphere it becomes is not.
        scale: fit + (1 - fit) * t,
        opacity: 1 - progress.value * 0.2,
        // Still (spin 0) so the logo stays legible; only the mouse tilts it.
        spin: t,
        tone: 0, // graphite ramp — the hero sits on the light ground
      });
    };
    apply();

    if (prefersReducedMotion()) {
      // The counters start at 0 in the markup, so without the tween they have
      // to be written out or every figure reads as zero.
      rootRef.current
        ?.querySelectorAll<HTMLElement>(".stat-number")
        .forEach((el) => (el.textContent = el.dataset.value ?? "0"));
      return;
    }

    window.addEventListener("resize", apply);

    const ctx = gsap.context(() => {
      scramble(rootRef.current!.querySelectorAll<HTMLElement>(".scramble-char"));

      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          delay: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress.value = self.progress;
          apply();
        },
      });
    }, rootRef);

    return () => {
      window.removeEventListener("resize", apply);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/*
        Platinum pool behind the mark. On the dark build this was a bright
        bloom; on Soft White the same idea has to run the other way — a faint
        metallic shadow slightly darker than the ground, not a light source.
        It sits at -z-20, under the -z-10 particle canvas, which works because
        `body` is transparent and `html` paints the base colour beneath both.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[min(620px,70vh)] w-[min(1400px,94vw)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `
            radial-gradient(48% 46% at 50% 46%, rgba(167,171,176,0.20) 0%, rgba(217,221,226,0.14) 42%, transparent 74%),
            radial-gradient(74% 66% at 54% 52%, rgba(228,230,233,0.42) 0%, transparent 78%)
          `,
        }}
      />

      <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
            <ScrambleText text="Building Digital" />
            <br />
            <ScrambleText text="Solutions" className="font-bold italic" />
            <br />
            <ScrambleText text="That Matter" />
          </h1>

          <p className="hero-anim mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
            Katore Solutions is a software development company in South Africa.
            We design and build websites, software and digital systems that
            solve real business problems and create lasting value.
          </p>

          <div className="hero-anim mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(17,19,21,0.16)] transition-colors hover:bg-cta-hover"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Capabilities. Set at text-lg rather than the display size the old
              counters used: a number can carry 4xl on three characters, a
              phrase at that size would run the row onto four lines. Held at one
              size across breakpoints too — at text-xl the longest title wrapped
              on desktop only, leaving the three captions off a shared baseline. */}
          <div className="hero-anim mt-16 flex flex-wrap gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                {s.count !== undefined ? (
                  <div className="flex items-baseline text-3xl font-bold tabular-nums text-foreground md:text-4xl">
                    <span className="stat-number" data-value={s.count}>
                      0
                    </span>
                    <span>{s.suffix}</span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {s.text}
                  </div>
                )}
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
