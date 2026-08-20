import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import TeamPortrait from "@/components/ui/TeamPortrait";
import { founders, howWeThink } from "@/lib/team";

const SHELL = "mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </p>
  );
}

/**
 * The company page. Built from the same pieces as the service and contact
 * pages — `PageHeading`, `SectionHeading`, `Reveal`, the bordered surface
 * card — so it reads as one site rather than a one-off design drop.
 */
export default function CompanyDetail() {
  return (
    <main>
      {/* 01 Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.55)_0%,_transparent_70%)]" />
        <div className={SHELL}>
          <PageHeading eyebrow="Company" title="Who We Are" />
          <p className="mt-10 max-w-2xl text-base text-muted-foreground md:text-lg">
            Katore Solutions is an engineering led technology company, founded
            and run by software engineers. We start with the problem, design
            the right solution, and build it properly. Based in Johannesburg,
            South Africa, working with clients globally.
          </p>
        </div>
      </section>

      {/* 02 Founding team */}
      <section className="py-20 md:py-28">
        <div className={SHELL}>
          <Eyebrow>Founding Team</Eyebrow>
          <div className="mt-4">
            <SectionHeading title="The people behind Katore Solutions." />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            {founders.map((founder, i) => (
              <Reveal key={founder.name} delay={i * 0.08}>
                <div className="grid h-full overflow-hidden rounded-3xl border border-card-border bg-surface shadow-[0_1px_3px_rgba(17,19,21,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(17,19,21,0.10)] sm:grid-cols-[0.85fr_1.15fr]">
                  <TeamPortrait
                    src={founder.photo}
                    alt={founder.name}
                    initials={founder.initials}
                    className="aspect-[4/5] w-full sm:aspect-auto sm:h-full sm:min-h-[280px]"
                  />
                  <div className="flex flex-col p-6 md:p-8">
                    <h3 className="text-xl font-medium leading-tight tracking-tight text-foreground md:text-2xl">
                      {founder.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {founder.role}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground md:text-base">
                      {founder.bio}
                    </p>
                    <div className="mt-auto border-t border-border pt-5">
                      <Eyebrow>Focus</Eyebrow>
                      <p className="mt-2 text-sm text-foreground/80">
                        {founder.focus.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 Why Katore exists */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <Eyebrow>Why Katore Exists</Eyebrow>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <SectionHeading title="Technology should solve something." />
            <div className="space-y-5">
              <Reveal>
                <p className="text-base text-muted-foreground md:text-lg">
                  We started Katore Solutions with a simple belief: businesses
                  should have access to technology built around their actual
                  challenges.
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="text-base text-muted-foreground md:text-lg">
                  Too often, organizations are forced to adapt their processes
                  around generic tools. We believe the better approach is to
                  understand the problem first, then build the right solution.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-base text-muted-foreground md:text-lg">
                  From websites and digital platforms to custom software,
                  automation and technical infrastructure, our focus is on
                  creating work that is useful, scalable and built to last.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 04 How we think */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          <SectionHeading title="How we think" />
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-3">
            {howWeThink.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="border-t border-border pt-5">
                  <span className="text-sm font-semibold tabular-nums text-silver">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Final CTA. The same dark band the other pages close on. */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-[var(--w-main)]">
          <Reveal>
            <div className="metal-dark relative overflow-hidden rounded-3xl px-6 py-20 text-center shadow-[0_24px_70px_rgba(17,19,21,0.16)] md:py-28">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.20)_0%,_transparent_62%)]" />
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl xl:text-5xl">
                  Want to build something that{" "}
                  <span className="font-bold">actually works?</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
                  Tell us about your idea, challenge, or project, and let&apos;s
                  find the right solution together.
                </p>
                <div className="mt-10">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-platinum"
                  >
                    Start a conversation
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
