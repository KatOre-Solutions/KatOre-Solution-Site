import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME}, custom software development company`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/**
 * The card shown when a link to the site is shared, most of all on WhatsApp,
 * which is where this business actually gets passed around. Generated rather
 * than stored as a binary so it stays in the palette `globals.css` defines:
 * graphite ground, soft white type, silver detail.
 *
 * Root segment only, so every route inherits it. A page that wants its own
 * card adds its own `opengraph-image` alongside its `page.tsx`.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111315",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#a7abb0",
            fontSize: "30px",
            letterSpacing: "0.22em",
          }}
        >
          {"<KO/>"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#f7f8fa",
              fontSize: "86px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              color: "#a7abb0",
              fontSize: "38px",
              lineHeight: 1.3,
            }}
          >
            Engineering led software development
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #34383d",
            paddingTop: "32px",
            color: "#a7abb0",
            fontSize: "26px",
          }}
        >
          <div style={{ display: "flex" }}>
            Websites · Custom software · Automation
          </div>
          <div style={{ display: "flex" }}>katoresolutions.co.za</div>
        </div>
      </div>
    ),
    size
  );
}
