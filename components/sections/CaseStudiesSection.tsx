"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { ProjectTypeBadge, StatusBadge } from "@/components/ui/ProjectMeta";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/** How far each row drifts across the full scroll of the section, in px. */
const DRIFT = 420;

function PreviewTile({ project }: { project: CaseStudy }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // The loop is only fetched once someone hovers — six autoplaying videos in a
  // moving strip would cost more than the whole rest of the page.
  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!v.src) v.src = project.loop;
    void v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  return (
    <Link
      href={`/case-study/${project.slug}`}
      onMouseEnter={play}
      onMouseLeave={stop}
      className="group block w-[300px] shrink-0 sm:w-[380px] lg:w-[440px]"
    >
      <div className="overflow-hidden rounded-2xl border border-card-border bg-surface shadow-[0_1px_3px_rgba(17,19,21,0.05)] transition-shadow duration-300 group-hover:shadow-[0_18px_44px_rgba(17,19,21,0.13)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-platinum">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.poster}
            alt={`${project.name} website preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* Caption carries the attribution and the services used, always
            visible rather than hover-only — the strip is in motion and half the
            audience is on touch, where a hover state never fires. Attribution
            rides with the name so a tile can never be read out of context. */}
        <div className="flex items-start justify-between gap-3 border-t border-card-border px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {project.name}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <ProjectTypeBadge projectType={project.projectType} />
              {project.status ? <StatusBadge status={project.status} /> : null}
            </div>
            <p className="mt-1.5 truncate text-xs text-muted-foreground">
              {project.tags.join(" · ")}
            </p>
          </div>
          <span className="mt-0.5 shrink-0 text-xs tabular-nums text-silver">
            {project.number}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Rows counter-drift across the section's pass through the viewport.
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const t = self.progress - 0.5; // -0.5 … 0.5, centred mid-section
          if (rowARef.current) {
            rowARef.current.style.transform = `translate3d(${-t * DRIFT}px,0,0)`;
          }
          if (rowBRef.current) {
            rowBRef.current.style.transform = `translate3d(${t * DRIFT}px,0,0)`;
          }
        },
      });
      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Doubled so a drifting row never runs out of tiles at either edge.
  const rowA = [...caseStudies, ...caseStudies];
  const rowB = [...caseStudies.slice().reverse(), ...caseStudies.slice().reverse()];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[var(--w-main)] px-5 md:px-8">
        {/* No "proven results" or "measurable impact" claims here: we publish no
            metrics to back them, and the work speaks for itself. */}
        <SectionHeading
          title="Case Studies"
          subtitle="Client work, our own products, and the concepts we build to push what's possible."
        />
      </div>

      <div className="mt-14 flex flex-col gap-5">
        <div ref={rowARef} className="flex w-max gap-5 pl-5 will-change-transform md:pl-8">
          {rowA.map((p, i) => (
            <PreviewTile key={`a-${p.slug}-${i}`} project={p} />
          ))}
        </div>
        <div ref={rowBRef} className="flex w-max gap-5 pl-5 will-change-transform md:pl-8">
          {rowB.map((p, i) => (
            <PreviewTile key={`b-${p.slug}-${i}`} project={p} />
          ))}
        </div>
      </div>

      {/* Edge fades keep the strip from colliding with the page margin. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />

      <div className="mx-auto mt-14 max-w-[var(--w-main)] px-5 md:px-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-silver hover:bg-platinum"
        >
          View all work
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
