"use client";

import { useEffect, useState } from "react";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";
import { CONTACT_EMAIL, emailLink } from "@/lib/contact";

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

export default function Footer() {
  const [time, setTime] = useState("");
  const [emailUser, emailDomain] = CONTACT_EMAIL.split("@");

  useEffect(() => {
    // Africa/Johannesburg is SAST (UTC+2) year-round — no DST to handle.
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-ZA", {
          timeZone: "Africa/Johannesburg",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-background px-5 py-16 md:px-8">
      <div className="mx-auto max-w-[var(--w-main)]">
        {/* Top area */}
        <div className="grid gap-12 border-b border-border pb-16 md:grid-cols-2">
          <div>
            {/* Address and link come from lib/contact so the footer cannot
                drift from the contact page. The break opportunity at the @
                stops a 320px screen splitting it as "gmail.co / m". */}
            <a
              href={emailLink}
              className="block break-words text-xl font-medium text-foreground transition-colors hover:text-muted-foreground sm:text-2xl md:text-3xl"
            >
              {emailUser}@<wbr />
              {emailDomain}
            </a>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-sm text-muted-foreground">
                Based in Johannesburg, South Africa
              </p>
              <p className="text-sm text-muted-foreground">
                Serving clients globally
              </p>
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Johannesburg, South Africa. Local time (SAST, UTC+2)
            </p>
            {/* Non breaking space until the client clock mounts, so the row
                keeps its height without printing a dashed placeholder. */}
            <p className="mt-3 text-5xl font-bold tabular-nums text-foreground">
              {time || " "}
            </p>
          </div>
        </div>

        {/* Technologies we use — replaces the old Services / Atom / Resources
            link columns. The rings are clipped at the section's bottom edge, so
            this sits directly above the copyright rule. */}
        {/* overflow-hidden because the orbit rings are a fixed 440px across at
            the small breakpoint, which is wider than a 320px phone and gave
            every page on the site 12px of horizontal scroll there. */}
        <div className="overflow-hidden pt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Technologies We Use
          </p>
          <OrbitingCirclesGlobe />
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            Katore Solutions, © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
