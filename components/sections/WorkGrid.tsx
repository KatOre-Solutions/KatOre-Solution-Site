"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { caseStudies } from "@/lib/data";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type QuickTo = (value: number) => void;

/** Small inline icon chosen by tag keyword; generic dot as fallback. */
function TagIcon({ tag }: { tag: string }) {
  const t = tag.toLowerCase();
  const common = {
    viewBox: "0 0 24 24",
    className: "h-3.5 w-3.5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (t.includes("automation") || t.includes("integration"))
    return (
      <svg {...common}>
        <path d="M21 12a9 9 0 1 1-2.6-6.4" />
        <path d="M21 3.5V9h-5.5" />
      </svg>
    );
  if (t.includes("software") || t.includes("app"))
    return (
      <svg {...common}>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    );
  if (t.includes("hosting") || t.includes("support"))
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <path d="M7 7.5h.01M7 16.5h.01" />
      </svg>
    );
  if (t.includes("web") || t.includes("design"))
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M7 6.5h.01M10 6.5h.01" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

/** Column span per card index: asymmetric first row (7/5), 2-up thereafter. */
function spanFor(i: number) {
  if (i === 0) return "md:col-span-6 lg:col-span-7";
  if (i === 1) return "md:col-span-6 lg:col-span-5";
  return "md:col-span-6";
}

export default function WorkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<QuickTo | null>(null);
  const quickY = useRef<QuickTo | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const badge = badgeRef.current;
    if (!grid) return;

    const reduce = prefersReducedMotion();
    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // Per-card fade-up entrance as each row enters the viewport.
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) => {
          gsap.from(card, {
            y: 32,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      }

      // Cursor-following "View Work" badge (desktop pointer only).
      if (canHover && !reduce && badge) {
        gsap.set(badge, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
        quickX.current = gsap.quickTo(badge, "x", {
          duration: 0.4,
          ease: "power3.out",
        });
        quickY.current = gsap.quickTo(badge, "y", {
          duration: 0.4,
          ease: "power3.out",
        });
      }
    }, gridRef);

    return () => {
      ctx.revert();
      quickX.current = null;
      quickY.current = null;
    };
  }, []);

  const showBadge = () => {
    if (!quickX.current || !badgeRef.current) return;
    gsap.to(badgeRef.current, {
      scale: 1,
      autoAlpha: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };
  const moveBadge = (e: React.MouseEvent) => {
    quickX.current?.(e.clientX);
    quickY.current?.(e.clientY);
  };
  const hideBadge = () => {
    if (!badgeRef.current) return;
    gsap.to(badgeRef.current, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-y-20"
        >
          {caseStudies.map((cs, i) => (
            <article key={cs.slug} className={`work-card ${spanFor(i)}`}>
              <span className="block text-sm text-muted-foreground tabular-nums">
                {cs.number}
              </span>

              <Link
                href={`/case-study/${cs.slug}`}
                aria-label={`View ${cs.name} case study`}
                className="group mt-2 block overflow-hidden rounded-2xl border border-card-border"
                onMouseEnter={showBadge}
                onMouseMove={moveBadge}
                onMouseLeave={hideBadge}
              >
                <div
                  className={`relative w-full overflow-hidden bg-platinum ${
                    i < 2 ? "aspect-[16/10]" : "aspect-[4/3]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.poster}
                    alt={`${cs.name} website preview`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                  {cs.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-silver hover:bg-platinum/70 hover:text-foreground"
                    >
                      <TagIcon tag={tag} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Cursor-following badge, rendered once and moved via GSAP. It sits over
          the dark metallic tiles, so it inverts the page rather than being a
          translucent light chip. */}
      <div
        ref={badgeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 flex h-24 w-24 items-center justify-center rounded-full bg-cta/90 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-md"
        style={{ opacity: 0 }}
      >
        View Work
      </div>
    </section>
  );
}
