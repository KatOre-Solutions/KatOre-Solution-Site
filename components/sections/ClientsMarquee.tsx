"use client";

import { clients } from "@/lib/data";

function LogoChip({ name }: { name: string }) {
  return (
    <div className="flex h-16 w-44 shrink-0 items-center justify-center rounded-lg border border-card-border bg-surface shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
      <span className="text-lg font-semibold tracking-tight text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

export default function ClientsMarquee() {
  const row = [...clients, ...clients];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[var(--w-main)] px-5 text-center md:px-8">
        <h2 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Trusted by Industry Leaders
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Powering Innovation for Companies Worldwide
        </p>
      </div>

      <div
        className="relative mt-14"
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
