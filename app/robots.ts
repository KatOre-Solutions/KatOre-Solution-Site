import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Same switch as the X-Robots-Tag rule in next.config.ts: only the production
// context is crawlable. Preview, branch and pre-production deploys serve a
// blanket Disallow so they cannot compete with the real domain in search.
const isProduction = process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
