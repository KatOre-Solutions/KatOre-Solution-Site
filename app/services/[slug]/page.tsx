import PlaceholderPage from "@/components/PlaceholderPage";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.href.split("/").pop()! }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const match = services.find((s) => s.href.endsWith(slug));
  const title = match?.label ?? slug.replace(/-/g, " ");

  return (
    <PlaceholderPage
      eyebrow="Service"
      title={title}
      description="Detailed service offering page coming soon. Reach out to discuss your project."
    />
  );
}
