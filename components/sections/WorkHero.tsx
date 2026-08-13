import PageHeading from "@/components/PageHeading";

export default function WorkHero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      {/* Top left platinum wash, mirrors the placeholder and hero language */}
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(217,221,226,0.55)_0%,_transparent_70%)]" />

      <div className="mx-auto w-full max-w-[var(--w-main)] px-5 md:px-8">
        <PageHeading title="Work" />
      </div>
    </section>
  );
}
