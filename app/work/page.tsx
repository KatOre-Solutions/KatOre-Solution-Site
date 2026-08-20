import WorkHero from "@/components/sections/WorkHero";
import WorkGrid from "@/components/sections/WorkGrid";
import Footer from "@/components/sections/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Our Work: Project Portfolio",
  description:
    "See the software development portfolio of Katore Solutions: SaaS platforms, ecommerce storefronts and websites we have designed and built.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <WorkGrid />
      <Footer />
    </main>
  );
}
