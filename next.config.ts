import type { NextConfig } from "next";

// Set per Netlify deploy context in netlify.toml. Anything that is not the
// production context is a pre-production or preview build and must stay out of
// search results. Netlify's own _headers rules only cover statically served
// assets, so this has to come from Next itself to reach function-rendered pages.
const isProduction = process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

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
};

export default nextConfig;
