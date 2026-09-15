import type { Metadata } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const SITE_NAME = "Katore Solutions";

/** Default description, used on the root layout and as the OG/Twitter fallback. */
export const SITE_DESCRIPTION =
  "Katore Solutions is an engineering led software development company, building websites, custom software and digital systems that last.";

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
      // `app/opengraph-image.tsx` now generates a 1200x630 card for every
      // route, which is the size the large-image layout expects.
      card: "summary_large_image",
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
 * PostalAddress permits without a street line. There is deliberately no
 * `areaServed`: it would assert that the work stops at one border, and the
 * company takes clients wherever they are. Where Katore is based is a fact the
 * footer states; who it will work with is not something to fence off.
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
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

/**
 * Service schema for a single `/services/[slug]` page.
 *
 * `name` and `description` are passed in from `servicePages[slug].seo`, the
 * same fields `pageMetadata` uses for the title and meta description, so the
 * structured data can never drift from what the page actually says.
 */
export function serviceJsonLd({
  slug,
  name,
  description,
}: {
  slug: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(`/services/${slug}`),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Breadcrumb schema for a page one level below Home.
 *
 * There is no `/services` index route (only `/services/[slug]`), so a service
 * page's trail is Home -> the service itself, not a three level path through a
 * listing page that does not exist.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}
