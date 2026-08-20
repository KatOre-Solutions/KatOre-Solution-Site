import ParticleField from "@/components/three/ParticleField";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import CtaSection from "@/components/sections/CtaSection";
import Footer from "@/components/sections/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  titlePart: "Software Development Company in South Africa",
  description:
    "Katore Solutions is an engineering led software development company in South Africa, building websites, custom software and digital systems that last.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <ParticleField />
      <main>
        <HeroSection />
        <ServicesSection />
        <CaseStudiesSection />
        <ClientsMarquee />
        <CtaSection />
        <Footer />
      </main>
    </>
  );
}
