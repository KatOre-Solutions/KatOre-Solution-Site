import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const SITE_NAME = "Katore Solutions";

/** Default description, used on the root layout and as the OG/Twitter fallback. */
export const SITE_DESCRIPTION =
  "Katore Solutions is an engineering led software development company in South Africa, building websites, custom software and digital systems that last.";

/**
 * Per-page metadata.
 *
 * `titlePart` is the page's own title only — the `%s | Katore Solutions`
 * template in the root layout adds the brand, so no page repeats it. Open Graph
 * and Twitter take the full branded string because those previews are read
 * without the tab context that makes a bare page title legible.
 *
 * `path` is site-root-relative and carries no trailing slash, matching
 * `trailingSlash: false` (the Next default here) and the URLs in sitemap.xml.
 * It is resolved against `metadataBase`, so the canonical is always self
 * referencing and absolute.
 */
export function pageMetadata({
  titlePart,
  description,
  path,
}: {
  titlePart: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${titlePart} | ${SITE_NAME}`;

  return {
    // The root layout's title template applies to child segments only, never to
    // app/page.tsx in that same segment (see the generate-metadata docs in
    // node_modules/next/dist/docs). The home page therefore has to spell the
    // branded title out; every other route goes through the template.
    title: path === "/" ? { absolute: fullTitle } : titlePart,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_ZA",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      // "summary", not "summary_large_image": the site has no Open Graph image
      // asset yet, and the large-image card renders badly without one.
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Placeholder for the LinkedIn company page, which does not exist yet.
 *
 * Kept here rather than inline in the schema so it is obvious what to fill in.
 * `organizationJsonLd` drops anything that is not a real URL, so the shipped
 * markup never advertises this string to Google — replace it with the profile
 * URL and it starts being emitted.
 */
export const LINKEDIN_PROFILE_URL = "LINKEDIN_COMPANY_PAGE_URL_TO_BE_ADDED";

const sameAs = [LINKEDIN_PROFILE_URL].filter((url) => /^https?:\/\//.test(url));

/**
 * Organization schema for the root layout.
 *
 * Deliberately `Organization` and not `LocalBusiness`: there is no verified
 * public street address or phone number, and both are required for a credible
 * local business entry. Once a Google Business Profile with a real address and
 * phone exists, this can be upgraded to `ProfessionalService` (a LocalBusiness
 * subtype) with `address.streetAddress`, `telephone` and `openingHours` to
 * compete in local SEO and the map pack.
 *
 * `address` carries only what is true today — city, province, country — which
 * PostalAddress permits without a street line.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  // The KO mark from app/icon.svg, the only real brand asset in the project.
  logo: `${SITE_URL}/icon.svg`,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  ...(sameAs.length > 0 ? { sameAs } : {}),
};
