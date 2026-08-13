import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import ServiceVisual from "@/components/ui/ServiceVisual";
import type { ServiceCard } from "@/lib/data";
import type { ServicePage } from "@/lib/serviceContent";

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

const SHELL = "mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8";

/**
 * The full service page. Composed from the pieces the rest of the site already
 * uses: `PageHeading` for the display title and rule, `SectionHeading` for the
 * section titles, and the same card, pill and button treatments as the work
 * grid and services deck. Nothing new is introduced to the visual system.
 */
export default function ServiceDetail({
  card,
  content,
}: {
  card: ServiceCard;
  content: ServicePage;
}) {
  return (
    <main>
      {/* 01 Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.55)_0%,_transparent_70%)]" />
        <div className={SHELL}>
          <PageHeading eyebrow="Service" title={content.pageTitle} />

          <div className="mt-10 grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12">
            <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {content.headline}
            </h2>
            <div>
              <p className="text-base text-muted-foreground md:text-lg">
                {content.intro}
              </p>
              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(17,19,21,0.16)] transition-colors hover:bg-cta-hover"
              >
                {content.ctaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <Reveal className="mt-14 md:mt-16">
            <ServiceVisual
              src={content.hero.src}
              alt={content.hero.alt}
              number={card.number}
            />
          </Reveal>
        </div>
      </section>

      {/* 02 Overview */}
      <section className="py-20 md:py-28">
        <div className={SHELL}>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <SectionHeading title={content.overview.heading} />
            <div className="space-y-5">
              {content.overview.body.map((p) => (
                <Reveal key={p}>
                  <p className="text-base text-muted-foreground md:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 What we do */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <SectionHeading title={content.capabilities.heading} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.capabilities.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-card-border bg-surface p-6 shadow-[0_1px_3px_rgba(17,19,21,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(17,19,21,0.10)]">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Our approach */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <SectionHeading
            title={content.approach.heading}
            subtitle={content.approach.intro}
          />
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {content.approach.steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 2) * 0.06}>
                <div className="flex gap-5 border-t border-border pt-5">
                  <span className="shrink-0 text-sm font-semibold tabular-nums text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Why this matters */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <Reveal>
            <div className="rounded-3xl border border-card-border bg-surface p-8 shadow-[0_1px_3px_rgba(17,19,21,0.05)] md:p-14">
              <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {content.why.heading}
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-10">
                {content.why.body.map((p) => (
                  <p key={p} className="text-base text-muted-foreground md:text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 Relevant technology */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <SectionHeading title={content.tech.heading} subtitle={content.tech.note} />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.tech.groups.map((group, i) => (
              <Reveal key={group.label} delay={(i % 3) * 0.06}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {group.label}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md border border-card-border bg-platinum/50 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Final CTA. The one full strength dark block on the page, matching
          the home page band so the close feels like the same site. */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-[var(--w-main)]">
          <Reveal>
            <div className="metal-dark relative overflow-hidden rounded-3xl px-6 py-20 text-center shadow-[0_24px_70px_rgba(17,19,21,0.16)] md:py-28">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.20)_0%,_transparent_62%)]" />
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl xl:text-5xl">
                  {content.closing[0]}{" "}
                  <span className="font-bold">{content.closing[1]}</span>
                </h2>
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-platinum"
                  >
                    {content.ctaLabel}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
