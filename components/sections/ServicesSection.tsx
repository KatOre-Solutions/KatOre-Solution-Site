"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { serviceCards } from "@/lib/data";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { particleController } from "@/lib/particleController";
import {
  LOGO_SPAN,
  SERVICES_SPLIT_MIN,
  fitScale,
  getLogoShape,
  getShapes,
  pxToWorldX,
  servicesScale,
} from "@/lib/particleShapes";

/**
 * Card track geometry, in px. These are the widths the deck wants; on a narrow
 * viewport the track measures itself and scales them down, since a 380px card
 * inside a ~335px content column would be clipped by the pin's overflow.
 */
const MAX_ACTIVE_W = 380;
const MAX_COLLAPSED_W = 168;
const MIN_COLLAPSED_W = 92;
const GAP = 16;
/** How far each spent card peels to the left as it slides under the stack. */
const STACK_STEP = 22;

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

function ServiceDetail({ card }: { card: (typeof serviceCards)[number] }) {
  return (
    <div>
      <h3 className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {card.subtitle}
      </h3>
      <p className="mt-4 text-sm text-muted-foreground">{card.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
          <div className="space-y-1">
            {card.items.map((item) => (
              <p key={item} className="text-xs text-foreground/90">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tools
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-card-border bg-platinum/50 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const triggerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }

    const shapes = getShapes();
    const logo = getLogoShape();
    const n = serviceCards.length;

    /**
     * Card widths, remeasured from the track whenever the viewport changes.
     * `layout` runs per scroll frame, so it reads these rather than touching
     * the DOM itself.
     */
    let activeW = MAX_ACTIVE_W;
    let collapsedW = MAX_COLLAPSED_W;

    const measure = () => {
      const w = trackRef.current?.clientWidth ?? MAX_ACTIVE_W;
      activeW = Math.min(MAX_ACTIVE_W, w);
      // Keep the queued cards proportional to the active one so the deck reads
      // the same at any width, but never so thin the spine label can't sit.
      collapsedW = Math.max(
        MIN_COLLAPSED_W,
        Math.min(MAX_COLLAPSED_W, activeW * 0.44)
      );
    };

    /**
     * The last frame the ScrollTrigger produced. Held so a resize can re-run
     * the layout and re-place the cloud without waiting for the next scroll —
     * an orientation change would otherwise leave both mid-transition at the
     * old geometry.
     */
    const view = { pos: 0, index: 0, next: 0, morphT: 0, band: 0, exitFade: 0 };
    let owns = false;

    /**
     * Where the cloud sits horizontally, in world units.
     *
     * On the split layout it centres in the gutter the inset cards leave, taken
     * from the track's measured position rather than a tuned constant — the
     * content column is capped by `--w-main`, so that gutter is not a fixed
     * fraction of the viewport and a hard-coded offset drifts off the mark on
     * wide screens and portrait aspects alike.
     *
     * Below the breakpoint the cards are full width and there is no gutter, so
     * the cloud centres and sits behind them as a backdrop instead.
     */
    const cloudOffsetX = () => {
      if (window.innerWidth < SERVICES_SPLIT_MIN) return 0;
      const left = trackRef.current?.getBoundingClientRect().left ?? 0;
      return pxToWorldX(left / 2);
    };

    const applyCloud = () => {
      particleController.set({
        shapeA: shapes[view.index],
        shapeB: shapes[view.next],
        morphT: view.morphT,
        offsetX: cloudOffsetX(),
        scale: servicesScale(),
        opacity: 1 - view.exitFade * 0.88,
        spin: 0.12,
        tone: view.band, // platinum ramp while the dark band is up
      });
    };

    /**
     * Past the section the cloud would otherwise be stranded as the last
     * service glyph (the cube), parked off to the left. Settle it back onto the
     * centred `<KO/>` mark instead, faint enough to read as page texture.
     *
     * offsetX / scale are already smoothed inside ParticleField, so only the
     * morph needs tweening — assigning morphT directly would snap.
     */
    const exit = { t: 0 };
    let exitTween: gsap.core.Tween | null = null;

    const settleOnLogo = () => {
      exitTween?.kill();
      exit.t = 0;
      owns = false;
      particleController.set({
        offsetX: 0,
        scale: fitScale(LOGO_SPAN),
        opacity: 0.16,
        spin: 0,
        tone: 0,
      });
      exitTween = gsap.to(exit, {
        t: 1,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          // Re-asserted every frame: a boundary onUpdate from the ScrollTrigger
          // would otherwise yank the cloud back to the left-hand service slot.
          particleController.set({
            shapeA: shapes[n - 1],
            shapeB: logo,
            morphT: exit.t,
            offsetX: 0,
            scale: fitScale(LOGO_SPAN),
            opacity: 0.16,
            spin: 0,
            tone: 0,
          });
        },
      });
    };

    /**
     * Lay the track out from a continuous position. Cards to the right of the
     * active one queue up collapsed; the active one is expanded; spent cards
     * peel left and slide *under* the stack, which is what reads as the deck
     * shuffling rather than a carousel scrolling.
     */
    const layout = (pos: number) => {
      view.pos = pos;
      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = i - pos;

        let x: number;
        let w: number;
        let opacity = 1;

        if (d <= 0) {
          // Spent (or active): stacked at the left edge, fading as it goes.
          x = d * STACK_STEP;
          w = activeW;
          opacity = Math.max(0, 1 + d * 0.55);
        } else {
          // Queued: first slot opens to the full active width, then a run of
          // collapsed slots.
          x = d <= 1 ? d * (activeW + GAP) : activeW + GAP + (d - 1) * (collapsedW + GAP);
          w = activeW + (collapsedW - activeW) * Math.min(d, 1);
        }

        el.style.transform = `translate3d(${x}px,0,0)`;
        el.style.width = `${w}px`;
        el.style.opacity = `${opacity}`;
        // Strictly ascending: each card must cover the one it replaces as it
        // slides in, otherwise the two blend into a ghost mid-transition.
        el.style.zIndex = `${10 + i}`;
      }
    };
    measure();
    layout(0);

    // Re-measure before ScrollTrigger recalculates, so the pin's own resize
    // pass sees the new card widths rather than last frame's.
    const onResize = () => {
      measure();
      layout(view.pos);
      if (owns) applyCloud();
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${n * 520}`,
        pin: pinRef.current,
        scrub: true,
        onUpdate: (self) => {
          const raw = self.progress * n;
          const index = Math.min(Math.floor(raw), n - 1);
          const localT = raw - index;
          const next = Math.min(index + 1, n - 1);
          // Dwell on each shape, then morph into the next in the last ~45%.
          const morphT =
            index === n - 1 ? 0 : gsap.utils.clamp(0, 1, (localT - 0.55) / 0.4);

          // Cards ride the same dwell-then-move rhythm as the shape morph, so
          // the deck and the cloud change together instead of drifting apart.
          layout(index + morphT);

          // Fade the cloud toward ambient over the last slice of the scrub so
          // it doesn't sit bright behind the following section.
          const exitFade = gsap.utils.clamp(0, 1, (self.progress - 0.9) / 0.1);
          // Band fades in fast at the top and back out as the section leaves.
          const bandIn = gsap.utils.clamp(0, 1, self.progress / 0.05);
          const band = bandIn * (1 - exitFade);
          if (bandRef.current) bandRef.current.style.opacity = `${band}`;
          // Lets the fixed header invert while the band is up (see globals.css)
          // — an opaque light navbar would cut a strip across the dark section.
          document.documentElement.dataset.band = band > 0.5 ? "dark" : "";

          view.index = index;
          view.next = next;
          view.morphT = morphT;
          view.band = band;
          view.exitFade = exitFade;
          owns = true;
          applyCloud();

          if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
          }
        },
        onLeave: () => {
          settleOnLogo();
          document.documentElement.dataset.band = "";
        },
        onEnterBack: () => {
          // Scrolling back in — drop the settle so onUpdate owns the shape again.
          exitTween?.kill();
          exit.t = 0;
          particleController.set({ opacity: 1, spin: 0.12, tone: 1 });
        },
        // Landing below the section (reload, deep link, back-nav) never fires
        // onLeave, which would strand the cloud on whatever it last rendered.
        onRefresh: (self) => {
          if (self.progress >= 1 && exit.t === 0) settleOnLogo();
        },
      });

      return () => st.kill();
    }, triggerRef);

    return () => {
      exitTween?.kill();
      window.removeEventListener("resize", onResize);
      ctx.revert();
      document.documentElement.dataset.band = "";
    };
  }, []);

  // Reduced-motion: plain stacked list, no pin / particle dependence.
  if (reduced) {
    return (
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-[var(--w-main)] px-5 md:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {serviceCards.map((card) => (
              <div
                key={card.number}
                className="rounded-xl border border-card-border bg-card p-7 shadow-[0_1px_3px_rgba(17,19,21,0.05)]"
              >
                <span className="text-sm font-semibold text-muted-foreground">
                  {card.number}
                </span>
                <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  {card.title}
                </h2>
                <ServiceDetail card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={triggerRef} className="relative">
      {/*
        The dark band. Fixed and at -z-20 so it slides *under* the -z-10
        particle canvas — a glow only reads as light when the cloud sits on top
        of it. It escapes to the root stacking context because neither this
        section nor `body` creates one.
      */}
      <div
        ref={bandRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          opacity: 0,
          background: `
            radial-gradient(46% 52% at 24% 50%, rgba(226,229,233,0.28) 0%, rgba(120,127,138,0.20) 34%, transparent 70%),
            linear-gradient(135deg, #111315 0%, #24272b 52%, #111315 100%)
          `,
        }}
      />

      <div
        ref={pinRef}
        className="flex h-screen flex-col justify-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
          <div className="md:pl-[38%]">
            <SectionHeading
              title="Our Services"
              subtitle="We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint."
              onDark
            />
          </div>

          {/* Card track. Cards are absolutely placed and driven directly from
              the ScrollTrigger, so scrubbing stays on the compositor. */}
          <div className="mt-8 md:mt-10 md:pl-[38%]">
            {/* Taller on narrow screens: the card is only as wide as the column
                there, so the detail grid inside it runs longer. */}
            <div ref={trackRef} className="relative h-[440px] sm:h-[380px]">
              {serviceCards.map((card, i) => (
                <article
                  key={card.number}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`absolute left-0 top-0 h-full overflow-hidden rounded-2xl border p-6 transition-colors duration-500 will-change-transform ${
                    i === active
                      ? "border-transparent bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
                      : "border-white/10 bg-white/[0.05]"
                  }`}
                >
                  {/* Always-on layer: number + title, the only thing a
                      collapsed card shows. */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-sm font-semibold tabular-nums transition-colors duration-500 ${
                        i === active ? "text-muted-foreground" : "text-white/50"
                      }`}
                    >
                      {card.number}
                    </span>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-colors duration-500 ${
                        i === active ? "text-foreground" : "text-white/50"
                      }`}
                    />
                  </div>

                  {/* Expanded body. Hidden rather than clipped on collapsed
                      cards — a truncated headline reads as a bug. */}
                  <div
                    className={`transition-opacity duration-300 ${
                      i === active ? "opacity-100 delay-150" : "opacity-0"
                    }`}
                  >
                    {/* Only pinned to one line once the card has the width for
                        it; below that a nowrap headline is clipped outright. */}
                    <h2 className="mt-3 text-xl font-bold text-foreground sm:whitespace-nowrap sm:text-2xl">
                      {card.title}
                    </h2>
                    <ServiceDetail card={card} />
                  </div>

                  {/* Collapsed cards carry just a foot label, like a spine. */}
                  <span
                    className={`absolute bottom-6 left-6 right-6 text-sm font-medium leading-snug text-white transition-opacity duration-300 ${
                      i === active ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {card.title}
                  </span>
                </article>
              ))}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-10 flex gap-2 md:pl-[38%]">
            {serviceCards.map((card, i) => (
              <span
                key={card.number}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-white" : "w-4 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
