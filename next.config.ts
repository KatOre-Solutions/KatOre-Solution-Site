import type { NextConfig } from "next";

// Set per Netlify deploy context in netlify.toml. Anything that is not the
// production context is a pre-production or preview build and must stay out of
// search results. Netlify's own _headers rules only cover statically served
// assets, so this has to come from Next itself to reach function-rendered pages.
const isProduction = process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

/**
 * Service slugs retired when the Services section was consolidated from six
 * offerings to four (see `serviceCards` in lib/data.ts), each pointed at the
 * service that absorbed it.
 *
 * Without these, `/services/[slug]` still answers on the old paths — it falls
 * back to de-slugging whatever it is handed — so a stale link would render a
 * plausible-looking page for a service that is no longer sold.
 */
const retiredServices: Record<string, string> = {
  "ui-ux-design": "web-design-development",
  "website-design": "web-design-development",
  "web-development": "web-design-development",
  "ai-development": "custom-software",
  "ai-agents": "automation-integrations",
  "healthcare-apps": "custom-software",
};

const nextConfig: NextConfig = {
  async headers() {
    if (isProduction) return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  // Checked before the filesystem, so these win over the dynamic service route.
  async redirects() {
    return Object.entries(retiredServices).map(([from, to]) => ({
      source: `/services/${from}`,
      destination: `/services/${to}`,
      permanent: true, // 308
    }));
  },
};

export default nextConfig;
