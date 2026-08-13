import { siWhatsapp } from "simple-icons";
import PageHeading from "@/components/PageHeading";
import SectionHeading from "@/components/SectionHeading";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/ui/Reveal";
import {
  CONTACT_EMAIL,
  emailLink,
  whatsappContacts,
  whatsappLink,
} from "@/lib/contact";

const SHELL = "mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8";

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

/**
 * The WhatsApp mark, taken from `simple-icons` like the footer technology
 * orbit. Filled with `currentColor` rather than the brand green, so it inherits
 * the monochrome palette instead of dropping a saturated accent into it.
 */
function WhatsAppMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={siWhatsapp.path} />
    </svg>
  );
}

export default function ContactDetail() {
  const [emailUser, emailDomain] = CONTACT_EMAIL.split("@");

  return (
    <main>
      {/* 01 Hero */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.55)_0%,_transparent_70%)]" />
        <div className={SHELL}>
          <PageHeading title="Contact" />

          <div className="mt-10 grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12">
            <h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Let&apos;s build something that solves a real problem.
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Tell us about your idea, challenge, or project. Whether you need a
              website, custom software, automation, or another digital solution,
              get in touch and let us know how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* 02 How can we help */}
      <section className="py-20 md:py-28">
        <div className={SHELL}>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
            <SectionHeading title="How can we help?" />
            <Reveal>
              <p className="text-base text-muted-foreground md:text-lg">
                Tell us what you are trying to achieve, the challenge you are
                facing, or the idea you want to bring to life. We will help you
                explore the right digital solution.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 Contact methods */}
      <section className="pb-20 md:pb-28">
        <div className={SHELL}>
          {/* Email. The address itself carries the weight here, set as display
              type rather than tucked into body copy. */}
          <Reveal>
            <div className="rounded-3xl border border-card-border bg-surface p-6 shadow-[0_1px_3px_rgba(17,19,21,0.05)] sm:p-8 md:p-14">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Email
              </p>
              <a
                href={emailLink}
                className="mt-5 block break-words text-xl font-medium tracking-tight text-foreground transition-colors hover:text-muted-foreground sm:text-3xl md:text-5xl"
              >
                {/*
                  A break opportunity at the @ so a narrow screen splits the
                  address at the domain boundary. Left to itself the browser
                  broke it as "gmail.co / m" and stranded a single letter.
                */}
                {emailUser}@<wbr />
                {emailDomain}
              </a>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Send us an email with your idea, challenge, or project
                requirements, and we will get back to you as soon as possible.
              </p>
              <a
                href={emailLink}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(17,19,21,0.16)] transition-colors hover:bg-cta-hover"
              >
                Send an Email
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* WhatsApp */}
          <div className="mt-8 md:mt-10">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                WhatsApp
              </p>
              <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                Prefer a conversation? Chat directly with our founding team.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {whatsappContacts.map((person, i) => (
                <Reveal key={person.international} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-3xl border border-card-border bg-surface p-8 shadow-[0_1px_3px_rgba(17,19,21,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(17,19,21,0.10)] md:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                          {person.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground">
                          {person.role}
                        </p>
                      </div>
                      <WhatsAppMark className="h-5 w-5 shrink-0 text-silver" />
                    </div>

                    <p className="mt-6 text-lg tabular-nums tracking-tight text-foreground md:text-xl">
                      {person.phone}
                    </p>

                    {/* mt-auto on the wrapper so both buttons sit on the same
                        line even when one role label wraps and the other does
                        not, with pt-8 giving the gap that mt-auto cannot. */}
                    <div className="mt-auto pt-8">
                      <a
                        href={whatsappLink(person.international)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-silver hover:bg-platinum"
                      >
                        Chat with {person.name}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final. Same dark band the home page and service pages close on, so the
          contact page ends in the site's own voice rather than a new one. */}
      <section className="px-5 pb-16 md:px-8">
        <div className="mx-auto max-w-[var(--w-main)]">
          <Reveal>
            <div className="metal-dark relative overflow-hidden rounded-3xl px-6 py-20 text-center shadow-[0_24px_70px_rgba(17,19,21,0.16)] md:py-28">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.20)_0%,_transparent_62%)]" />
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl xl:text-5xl">
                  It starts with{" "}
                  <span className="font-bold">a conversation.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
                  Tell us what you are building, what challenge you need to
                  solve, or where you need support. We are ready to hear how we
                  can help.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={emailLink}
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-foreground transition-colors hover:bg-platinum"
                  >
                    Send an Email
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                  <a
                    href={whatsappLink(whatsappContacts[0].international)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5"
                  >
                    <WhatsAppMark className="h-4 w-4" />
                    Message us
                  </a>
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
