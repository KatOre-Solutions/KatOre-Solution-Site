/**
 * Renders text as per-character spans that `lib/scramble` can drive.
 *
 * Shared rather than redeclared: the hero and every page heading run the same
 * reveal, and three copies of this markup drifted apart once already.
 */
export default function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="scramble-char inline-block"
          data-final={ch}
          // Spaces collapse to nothing once the glyph is swapped out, so they
          // carry their own width.
          style={ch === " " ? { width: "0.3em" } : undefined}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
