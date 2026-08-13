import { Fragment } from "react";

/**
 * Renders text as per-character spans that `lib/scramble` can drive.
 *
 * Characters are grouped into per word wrappers rather than emitted as one flat
 * run. Every character is an inline-block, which gives the browser a line break
 * opportunity between any two of them, so a flat run wraps mid word: "HOSTING
 * AND ONGOIN / G SUPPORT". Wrapping each word in its own nowrap inline-block
 * confines breaks to the real spaces between words.
 *
 * Shared rather than redeclared: the home hero and every page heading run the
 * same reveal, and two copies of this markup drifted apart once already.
 */
export default function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, i) => (
              <span key={i} className="scramble-char inline-block" data-final={ch}>
                {ch}
              </span>
            ))}
          </span>
          {/* A real space, so the line may break here and only here. */}
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
