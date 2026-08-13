import PlaceholderPage from "@/components/PlaceholderPage";
import { serviceCards } from "@/lib/data";

export function generateStaticParams() {
  return serviceCards.map((card) => ({ slug: card.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = serviceCards.find((c) => c.slug === slug);

  return (
    <PlaceholderPage
      eyebrow="Service"
      title={card?.title ?? slug.replace(/-/g, " ")}
      // The service's own description, rather than the "coming soon" line that
      // used to sit here: the copy already exists on the home page deck, and a
      // real answer beats a placeholder on a page people reach from the menu.
      description={
        card?.description ??
        "Tell us what you are trying to build and we will come back to you."
      }
    />
  );
}
