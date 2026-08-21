/**
 * The Katore Solutions `<KO/>` lockup, as the site's single SVG source of
 * truth.
 *
 * The geometry is lifted directly from `logoMark()` in lib/particleShapes.ts,
 * which until now was the only place the full lockup existed — it was drawn
 * into a canvas and sampled into the hero's particle field, so nothing else
 * could reuse it. The unit math there is expressed against `u = mark height`;
 * here that is fixed at u = 100, giving the documented 3.8:1 aspect and a
 * `0 0 380 100` viewBox.
 *
 * Strokes use `currentColor`, so the mark takes the colour of whatever it sits
 * in rather than carrying its own. The one place that cannot work is
 * app/icon.svg, which is a static file convention Next.js reads off disk and
 * so has to hardcode the brand graphite — keep the two in sync by hand.
 *
 * The hairline rules that `logoMark()` draws between the chevrons and the core
 * are deliberately absent. They stand in for the "KATORE SOLUTIONS" wordmark at
 * a point count too low to resolve real text; anywhere this component is used,
 * the wordmark is set as actual type beside it.
 */
export default function Logo({
  className = "",
  title = "Katore Solutions",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 380 100"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      {/* Outer chevrons: < ... > */}
      <g strokeWidth="13">
        <path d="M64 7 12 50l52 43" />
        <path d="M316 7l52 43-52 43" />
      </g>
      {/* KO/ core */}
      <g strokeWidth="15">
        {/* K */}
        <path d="M100 13v74" />
        <path d="M150 13 100 50l52 37" />
        {/* O */}
        <circle cx="204" cy="50" r="37" />
        {/* Slash */}
        <path d="M252 87 284 13" />
      </g>
    </svg>
  );
}
