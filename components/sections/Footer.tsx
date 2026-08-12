"use client";

import { useEffect, useState } from "react";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";

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
            <a
              href="mailto:katoresolution@gmail.com"
              className="text-2xl font-medium text-foreground transition-colors hover:text-muted-foreground md:text-3xl"
            >
              katoresolution@gmail.com
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
              Johannesburg, SA — Local Time (SAST · UTC+2)
            </p>
            <p className="mt-3 text-5xl font-bold tabular-nums text-foreground">
              {time || "--:--:-- --"}
            </p>
          </div>
        </div>

        {/* Technologies we use — replaces the old Services / Atom / Resources
            link columns. The rings are clipped at the section's bottom edge, so
            this sits directly above the copyright rule. */}
        <div className="pt-16">
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
