import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import PageHeading from "@/components/PageHeading";
import {
  CategoryBadge,
  ProjectTypeBadge,
  StatusBadge,
} from "@/components/ui/ProjectMeta";
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
    title: `${cs.name} | Katore Solutions`,
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

          {/* preserveCase: these are the projects' own names. Forcing uppercase
              turned GuardianCheck into GUARDIANCHECK and lost the camel case
              the brand is written with. */}
          <div className="mt-10">
            <PageHeading
              eyebrow={`Case Study ${cs.number}`}
              title={cs.name}
              preserveCase
            />
          </div>

          {/* Attribution sits directly under the name, ahead of the services,
              so the nature of the work is established before anything else. */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <ProjectTypeBadge projectType={cs.projectType} />
            <CategoryBadge category={cs.category} />
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

          {cs.gallery?.length ? (
            <div className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Inside the product
              </p>
              {/*
                CSS columns rather than a grid: these are real captures at mixed
                aspect ratios, including one portrait phone view, and a grid
                would either crop them or strand them in tall empty cells.
              */}
              <div className="mt-8 gap-5 md:columns-2">
                {cs.gallery.map((shot) => (
                  <figure
                    key={shot.src}
                    className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-card-border bg-surface shadow-[0_1px_3px_rgba(17,19,21,0.05)]"
                    // Never scaled past the capture's own width, so the narrow
                    // phone screen stays sharp instead of being blown up to
                    // fill the column.
                    style={{ maxWidth: `${shot.width}px` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <Footer />
    </main>
  );
}
