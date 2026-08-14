"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { caseStudies, navLinks, services } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** The mega-menu spotlights the first case study rather than a hardcoded one. */
const featured = caseStudies[0];

/**
 * The wordmark is the brand in the bar — the `<KO/>` glyph lives on as the
 * particle field's resting shape, so repeating it here only competed with it.
 * Tracking tightens on the narrowest screens so the full name still fits
 * alongside the menu button rather than being dropped, as it used to be.
 */
function Logo() {
  return (
    <Link
      href="/"
      aria-label="Katore Solutions, home"
      className="flex items-center text-foreground transition-opacity hover:opacity-80"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.22em]">
        Katore Solutions
      </span>
    </Link>
  );
}

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

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Scroll blur / shrink
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      onUpdate: (self) => {
        if (self.progress > 0 || self.scroll() > 80) {
          el.classList.add("nav-scrolled");
        } else {
          el.classList.remove("nav-scrolled");
        }
      },
    });
    const onScroll = () => {
      if (window.scrollY > 80) el.classList.add("nav-scrolled");
      else el.classList.remove("nav-scrolled");
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      st.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Collapse the mobile Services accordion whenever the menu itself closes,
  // so reopening it doesn't resume mid-expansion.
  useEffect(() => {
    if (!open) setMobileServicesOpen(false);
  }, [open]);

  // Mega-menu animation
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(el, { autoAlpha: 0, y: -10, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  return (
    <nav
      ref={navRef}
      /* Light ground at rest so page content never scrolls through the
         wordmark; the sticky state only adds the border and soft shadow. */
      className="fixed inset-x-0 top-0 z-50 bg-background transition-all duration-300 [&.nav-scrolled]:border-b [&.nav-scrolled]:border-border [&.nav-scrolled]:bg-surface/85 [&.nav-scrolled]:shadow-[0_1px_20px_rgba(17,19,21,0.06)] [&.nav-scrolled]:backdrop-blur-xl"
      onMouseLeave={() => setOpen(false)}
    >
      <div className="mx-auto flex max-w-[var(--w-main)] items-center justify-between px-5 py-4 md:px-8">
        <Logo />

        {/* Center links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}

          <button
            onMouseEnter={() => setOpen(true)}
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-foreground"
            aria-expanded={open}
          >
            Services
            <svg
              viewBox="0 0 24 24"
              className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <Link
            href="/contact"
            className="text-sm text-foreground/80 transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="nav-cta group hidden items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_rgba(17,19,21,0.16)] transition-colors hover:bg-cta-hover md:inline-flex"
        >
          Start Your Project
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Services mega-menu — desktop only. Mobile gets its own accordion
          panel below, since this one relies on hover and a wide grid. */}
      <div
        ref={menuRef}
        className="invisible absolute inset-x-0 top-full hidden opacity-0 md:block"
        onMouseEnter={() => setOpen(true)}
      >
        <div className="mx-auto max-w-[var(--w-main)] px-5 pb-4 md:px-8">
          <div className="grid gap-6 rounded-2xl border border-card-border bg-card/95 p-6 shadow-[0_18px_50px_rgba(17,19,21,0.10)] backdrop-blur-xl md:grid-cols-[1.1fr_1.4fr]">
            {/* Featured */}
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                OUR LATEST WORK
              </p>
              <Link
                href={`/case-study/${featured.slug}`}
                // The navbar persists across navigation, so nothing unmounts
                // the panel on its own; without this it stays open over the
                // page the visitor just asked for.
                onClick={() => setOpen(false)}
                className="group block overflow-hidden rounded-xl border border-card-border"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-platinum">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.poster}
                    alt={`${featured.name} website preview`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-sm font-semibold">{featured.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </div>

            {/* Service links */}
            <div className="grid grid-cols-1 content-center gap-1 sm:grid-cols-2">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu — its own accordion panel rather than the hover-driven
          mega-menu above, so Work/Company/Contact stay reachable and
          Services expands in place instead of needing a wide grid. */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-[var(--w-main)] px-5 pb-4">
          <div className="flex flex-col gap-1 rounded-2xl border border-card-border bg-card/95 p-3 shadow-[0_18px_50px_rgba(17,19,21,0.10)] backdrop-blur-xl">
            {navLinks.slice(0, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}

            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-expanded={mobileServicesOpen}
            >
              Services
              <svg
                viewBox="0 0 24 24"
                className={`h-3 w-3 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div
              className={`overflow-hidden pl-3 transition-[max-height] duration-300 ease-in-out ${
                mobileServicesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {s.label}
                </Link>
              ))}
            </div>

            <Link
              href={navLinks[2].href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {navLinks[2].label}
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover"
            >
              Start Your Project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
