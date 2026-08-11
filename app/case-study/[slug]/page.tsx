import Link from "next/link";
import Footer from "@/components/sections/Footer";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  const name = cs?.name ?? slug.replace(/-/g, " ");

  return (
    <main>
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back home
          </Link>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {cs?.number ?? "—"} · Case Study
          </p>
          <h1 className="mt-3 text-4xl font-bold capitalize tracking-tight md:text-7xl">
            {name}
          </h1>

          {cs && (
            <div className="mt-6 flex flex-wrap gap-2">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className={`mt-12 aspect-[16/7] w-full overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br ${
              cs?.gradient ?? "from-[#111315] to-[#3a3e43]"
            }`}
          >
            {cs ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cs.poster}
                alt={`${cs.name} website preview`}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-3xl font-bold italic text-white/90 md:text-5xl">
                  {name}
                </span>
              </div>
            )}
          </div>

          <p className="mt-12 max-w-2xl text-base text-muted-foreground md:text-lg">
            Detailed case study content for {name} is coming soon. This is a
            placeholder page demonstrating the dynamic route.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
