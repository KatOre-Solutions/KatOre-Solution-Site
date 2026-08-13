import type { ProjectType } from "@/lib/data";

/**
 * Attribution and status chips for case studies.
 *
 * These deliberately do NOT look like the service tags they sit beside. A
 * service tag says what Katore did; an attribution chip says whose work it is,
 * and confusing the two is the exact failure this portfolio exists to avoid —
 * a visitor must never read "Katore Product" as a service, or assume a concept
 * was a paying client. Solid fills separate them from the outlined tag pills.
 */

const PROJECT_TYPE_STYLES: Record<ProjectType, string> = {
  // Ours: the strongest mark on the page, so it cannot be skimmed past.
  "Katore Product": "bg-foreground text-background",
  // Someone hired us: present but quiet, since it is the common case.
  "Client Project": "bg-platinum text-foreground",
  // Nobody hired us. The dashed edge still says unfinished-by-design; the amber
  // carries the meaning at a glance, before the label is even read.
  "Concept Development":
    "border border-dashed border-status-concept-border bg-status-concept-surface text-status-concept",
};

export function ProjectTypeBadge({
  projectType,
  className = "",
}: {
  projectType: ProjectType;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${PROJECT_TYPE_STYLES[projectType]} ${className}`}
    >
      {projectType}
    </span>
  );
}

/**
 * Live-state chip. Green because the only status in use is "In Progress", and
 * the filled dot borrows the convention people already read as active — the
 * same signal a build indicator or presence dot uses.
 */
export function StatusBadge({
  status,
  className = "",
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-status-live-border bg-status-live-surface px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-status-live ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-status-live" />
      {status}
    </span>
  );
}
