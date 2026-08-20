import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/sections/ServiceDetail";
import { serviceCards } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/serviceContent";

export function generateStaticParams() {
  return serviceCards.map((card) => ({ slug: card.slug }));
}

/** Only the five real services resolve; anything else is a 404 rather than a
 *  de-slugged page for something we do not offer. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = servicePages[slug];
  if (!content) return {};

  // Both parts come from `servicePages`, the same source the page body renders
  // from, so a service can never carry another service's metadata.
  return pageMetadata({
    titlePart: content.seo.titlePart,
    description: content.seo.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = serviceCards.find((c) => c.slug === slug);
  const content = servicePages[slug];
  if (!card || !content) notFound();

  return <ServiceDetail card={card} content={content} />;
}
