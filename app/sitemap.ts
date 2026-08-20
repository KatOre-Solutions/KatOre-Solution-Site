import type { MetadataRoute } from "next";
import { caseStudies, serviceCards } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

/**
 * Prerendered at build time and served as a static /sitemap.xml, so the slug
 * lists come straight from `lib/data.ts` — the same source
 * `generateStaticParams` uses for the two dynamic segments. Adding a service or
 * case study there puts it in the sitemap with no change here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const marketingPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/work"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/company"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceCards.map((card) => ({
    url: absoluteUrl(`/services/${card.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: absoluteUrl(`/case-study/${study.slug}`),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...marketingPages, ...servicePages, ...caseStudyPages];
}
