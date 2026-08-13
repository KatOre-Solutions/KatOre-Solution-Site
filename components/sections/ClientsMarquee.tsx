"use client";

import { clients } from "@/lib/data";

/**
 * Sized to its content rather than a fixed width: real organisation names run
 * from "Hey Beautiful" to "New Lease of Life Foundation", and a fixed chip
 * wrapped the longer ones onto two lines.
 */
function LogoChip({ name }: { name: string }) {
  return (
    <div className="flex h-16 min-w-44 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-card-border bg-surface px-7 shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
      <span className="text-lg font-semibold tracking-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

/** Minimum chip width (min-w-44 = 176px) plus the flex gap (gap-6 = 24px).
 *  Chips grow with their label, so this under-estimates the real track width —
 *  which is the safe direction: the loop can only end up wider than required. */
const CHIP_PITCH = 200;
/** Widest viewport the loop has to cover without showing a seam. */
const MIN_TRACK = 2560;

export default function ClientsMarquee() {
  // The animation translates the track by -50%, so the loop only looks seamless
  // while half the track is at least as wide as the viewport. Four genuine
  // clients are 800px — nowhere near enough — so the set is repeated to fill the
  // track first, then doubled for the loop. This is a rendering device only: no
  // client is invented, and the duplicates are hidden from assistive tech below
  // so the real list is announced exactly once.
  const repeat = Math.max(2, Math.ceil(MIN_TRACK / (clients.length * CHIP_PITCH)));
  const set = Array.from({ length: repeat }, () => clients).flat();
  const row = [...set, ...set];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[var(--w-main)] px-5 text-center md:px-8">
        {/* Four early-stage clients is not "industry leaders powering innovation
            worldwide". The heading says what is actually true. */}
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Organisations We&rsquo;ve Worked With
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          A small, growing list of the people who trusted us to build it.
        </p>
      </div>

      {/* The real list, announced once. The visible track repeats each name many
          times to keep the loop seamless, which would otherwise be read out over
          and over. */}
      <ul className="sr-only">
        {clients.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      {/*
        overflow-hidden here as well as on the rows: the inner plane is tilted
        with rotateX under this perspective, and the near edge of a tilted plane
        projects wider than its layout box. That sliver escaped the row clipping
        and gave the home page 26px of horizontal scroll.
      */}
      <div
        aria-hidden
        className="relative mt-14 overflow-hidden"
        style={{ perspective: "800px" }}
      >
        <div style={{ transform: "rotateX(15deg)" }}>
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

            <div className="marquee-track flex w-max animate-marquee gap-6 py-4">
              {row.map((name, i) => (
                <LogoChip key={`a-${i}`} name={name} />
              ))}
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

            <div
              className="marquee-track flex w-max animate-marquee gap-6 py-4"
              style={{ animationDirection: "reverse", animationDuration: "55s" }}
            >
              {row.map((name, i) => (
                <LogoChip key={`b-${i}`} name={name} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
