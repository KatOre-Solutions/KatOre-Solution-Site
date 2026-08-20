import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/plus-jakarta-sans/400-italic.css";
import "@fontsource/plus-jakarta-sans/700-italic.css";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  organizationJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // Every relative URL below and in each page's `alternates.canonical`
  // resolves against this, so canonicals and og:url are always absolute.
  metadataBase: new URL(SITE_URL),
  title: {
    // Pages set only their own part; the brand is appended here once.
    template: `%s | ${SITE_NAME}`,
    default: `Software Development Company in South Africa | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary",
  },
  verification: {
    google: "MBRhCK7Z0a31F7y4F5nDhSWbf2aeRMW8RwNshOqNgwk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className="antialiased">
      <body className="min-h-screen text-foreground">
        {/* Organization schema, site wide. Rendered in the server HTML so
            crawlers see it without executing anything. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
