import fs from "node:fs";
import path from "node:path";

/**
 * A founder's photo. Mirrors `ServiceVisual`'s approach: not every founder has
 * a portrait ready yet, so this checks whether the file actually exists in
 * `public/` and falls back to an initials mark drawn from the site's own
 * metallic language rather than a broken image. Dropping the photo into
 * `public/company/` is the only step needed to switch a founder over.
 */
function publicFileExists(src: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

export default function TeamPortrait({
  src,
  alt,
  initials,
  className = "",
}: {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}) {
  const ready = publicFileExists(src);

  return (
    <div className={`relative overflow-hidden ${className}`} data-visual={src}>
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
        <div className="metal-dark relative flex h-full w-full items-center justify-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,_rgba(167,171,176,0.22)_0%,_transparent_62%)]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(228,230,233,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(228,230,233,0.35) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <span className="relative text-4xl font-bold tracking-tight text-white/25 md:text-5xl">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
