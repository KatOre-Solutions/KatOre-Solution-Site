import Link from "next/link";
import PageHeading from "@/components/PageHeading";
import Footer from "@/components/sections/Footer";

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-28">
        <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.6)_0%,_transparent_70%)]" />
        <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
          <PageHeading eyebrow={eyebrow} title={title} />
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
          {/* Secondary CTA: white ground, graphite type, light silver border. */}
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-silver hover:bg-platinum"
          >
            ← Back home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
