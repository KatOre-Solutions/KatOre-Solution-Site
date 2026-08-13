import WorkHero from "@/components/sections/WorkHero";
import WorkGrid from "@/components/sections/WorkGrid";
import Footer from "@/components/sections/Footer";

export const metadata = { title: "Work | Katore Solutions" };

export default function WorkPage() {
  return (
    <main>
      <WorkHero />
      <WorkGrid />
      <Footer />
    </main>
  );
}
