import { gsap } from "@/lib/gsap";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/*<>{}[]";

/**
 * Runs a per-character scramble/settle reveal over the given char spans.
 * Each span must expose its final glyph via `data-final`. Whitespace settles
 * instantly. Returns the GSAP timeline so callers can revert it on cleanup.
 */
export function scramble(spans: ArrayLike<HTMLElement>) {
  const tl = gsap.timeline();
  Array.from(spans).forEach((span, i) => {
    const final = span.dataset.final ?? "";
    if (!final.trim()) {
      span.textContent = final;
      return;
    }
    const o = { p: 0 };
    tl.to(
      o,
      {
        p: 1,
        duration: 0.5,
        ease: "none",
        onUpdate: () => {
          span.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        },
        onComplete: () => {
          span.textContent = final;
        },
      },
      0.1 + i * 0.028
    );
  });
  return tl;
}
