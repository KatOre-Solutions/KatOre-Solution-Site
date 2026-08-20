/**
 * Canonical origin for absolute URLs (sitemap, robots, metadata).
 *
 * Overridable per deploy via NEXT_PUBLIC_SITE_URL so a preview build can point
 * at its own origin, but the production domain is the fallback so a missing env
 * var never yields relative or localhost URLs in the sitemap.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://katoresolutions.co.za"
).replace(/\/$/, "");

/** Absolute URL for a site-root-relative path ("/" -> the bare origin). */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
