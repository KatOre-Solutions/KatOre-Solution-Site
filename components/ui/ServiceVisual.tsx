import fs from "node:fs";
import path from "node:path";

/**
 * The hero visual for a service page.
 *
 * The art directed images have not been generated yet, so rather than shipping
 * a broken image or an unrelated stock substitute, this checks whether the file
 * is actually present in `public/` and falls back to a panel drawn from the
 * site's own metallic language. The prompts for the real images live in
 * `katore-service-image-prompts.md` at the repo root.
 *
 * The check runs on the server during prerender, so dropping the file into
 * `public/services/` is the only step needed to switch a page over. There is no
 * flag to remember to flip.
 */
function publicFileExists(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

export default function ServiceVisual({
  src,
  alt,
  number,
  className = "",
}: {
  src: string;
  alt: string;
  /** Service number, used as the quiet mark on the placeholder. */
  number: string;
  className?: string;
}) {
  const ready = publicFileExists(src);

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-card-border md:aspect-[21/9] ${className}`}
      data-visual={src}
    >
      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="metal-dark relative h-full w-full">
          {/* Same radial sheen the CTA band uses, so the placeholder reads as a
              deliberate surface rather than an empty box. */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.22)_0%,_transparent_62%)]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(228,230,233,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(228,230,233,0.35) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <span
            aria-hidden
            className="absolute bottom-6 left-7 text-6xl font-bold leading-none tracking-tight text-white/10 md:text-8xl"
          >
            {number}
          </span>
        </div>
      )}
    </div>
  );
}
