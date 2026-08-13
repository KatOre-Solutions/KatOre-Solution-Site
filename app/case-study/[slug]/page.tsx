import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import { ProjectTypeBadge, StatusBadge } from "@/components/ui/ProjectMeta";
import { caseStudies } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/**
 * Only the six real case studies resolve. Previously any slug rendered a
 * plausible page by de-slugging whatever it was handed, which meant retired or
 * invented work still answered on its old URL.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};

  return {
    title: `${cs.name} — Katore Solutions`,
    // First sentence of the summary: enough to describe the work without
    // running past what a search result will show.
    description: `${cs.projectType}. ${cs.summary.split(". ")[0]}.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <main>
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
          <Link
            href="/work"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to work
          </Link>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {cs.number} · Case Study
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-7xl">
            {cs.name}
          </h1>

          {/* Attribution sits directly under the name, ahead of the services,
              so the nature of the work is established before anything else. */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ProjectTypeBadge projectType={cs.projectType} />
            {cs.status ? <StatusBadge status={cs.status} /> : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`mt-12 aspect-[16/7] w-full overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br ${cs.gradient}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cs.poster}
              alt={`${cs.name} website preview`}
              className="h-full w-full object-cover object-top"
            />
          </div>

          <p className="mt-12 max-w-2xl text-base text-muted-foreground md:text-lg">
            {cs.summary}
          </p>

          <a
            href={cs.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-cta-hover"
          >
            Visit the live site
            <span aria-hidden>→</span>
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
