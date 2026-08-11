"use client";

import React from "react";
import {
  siAnthropic,
  siDocker,
  siFigma,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siThreedotjs,
  siTypescript,
  siVercel,
} from "simple-icons";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

type Mark = { title: string; path: string; hex: string };

/**
 * Marks come from `simple-icons`, drawn inline and filled with each brand's own
 * hex. Note these are single-tone marks — Python is one blue rather than
 * blue-and-yellow, Figma one orange rather than five — because simple-icons
 * ships one path and one colour per brand.
 */
const orbits: { size: string; duration: number; icons: { icon: Mark; angle: number }[] }[] = [
  {
    size: "w-110 h-110 md:w-180 md:h-180",
    duration: 18,
    icons: [
      { icon: siReact, angle: -60 },
      { icon: siNextdotjs, angle: 0 },
      { icon: siTypescript, angle: 60 },
    ],
  },
  {
    size: "w-150 h-150 md:w-220 md:h-220",
    duration: 24,
    icons: [
      { icon: siNodedotjs, angle: -60 },
      { icon: siPython, angle: 0 },
      { icon: siThreedotjs, angle: 60 },
    ],
  },
  {
    size: "w-180 h-180 md:w-265 md:h-265",
    duration: 30,
    icons: [
      { icon: siDocker, angle: -75 },
      { icon: siVercel, angle: -25 },
      { icon: siFigma, angle: 25 },
      { icon: siAnthropic, angle: 75 },
    ],
  },
];

export default function OrbitingCirclesGlobe() {
  return (
    <div className="relative flex h-110 w-full justify-center overflow-hidden md:h-160">
      <style>{`
        @keyframes orbit-cw   { from { transform: rotate(var(--start-angle)) }      to { transform: rotate(calc(var(--start-angle) + 360deg)) } }
        @keyframes orbit-ccw  { from { transform: rotate(var(--start-angle)) }      to { transform: rotate(calc(var(--start-angle) - 360deg)) } }
        @keyframes counter-cw { from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) } }
        @keyframes counter-ccw{ from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) } }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring [style*="animation"] { animation: none !important; }
        }
      `}</style>

      {/* Center particle globe */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-75 -translate-x-1/2 translate-y-1/2 md:w-145">
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        // Each mark is mirrored across the ring so the arc never looks lopsided.
        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({ ...ic, angle: ic.angle + 180 })),
        ];

        return (
          <div
            key={index}
            className={`orbit-ring absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map(({ icon, angle }, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute left-1/2 top-0 -ml-8 flex h-1/2 origin-bottom flex-col items-center justify-start"
                style={
                  {
                    "--start-angle": `${angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                {/* Counter-rotates so the mark stays upright as the ring turns. */}
                <div
                  className="relative z-10 -mt-8 rounded-full border border-border bg-surface p-3 shadow-[0_1px_3px_rgba(17,19,21,0.06)] transition-colors hover:border-silver sm:p-4"
                  style={
                    {
                      "--counter-offset": `${-angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                  title={icon.title}
                >
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label={icon.title}
                    fill={`#${icon.hex}`}
                    className="h-6 w-6 md:h-8 md:w-8"
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
