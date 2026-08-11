# Implementation Plan — Work Page (`/work`)

Prepared from (a) a review of the local demo-web project and (b) a live Playwright
analysis of `https://www.antimatterai.com/work` (headed session, full video +
screenshots + computed-style data in `motion-capture/`). No code has been written yet.

---

## 1. Learnings from the local project files

**Stack correction (important):** this project is *not* a static HTML/CSS/JS site.
It is a **Next.js 16 App Router** app with **Tailwind CSS v4**, **GSAP 3.15 +
ScrollTrigger**, **Lenis** smooth scroll, Swiper, and Three.js. There is no
`index.html`, `css/styles.css`, or `js/main.js`. The design tokens are **not**
cobalt/paper and the fonts are **not** Archivo/Figtree/IBM Plex Mono — per
confirmation, the work page will match the *actual* design system:

- **Colors** (`app/globals.css`): background `#020202`, foreground `#f6f6fd`,
  primary `#3e3f7e`, accent `#696aac`, secondary `#a2a3e9`, tertiary `#c7c8f2`,
  card `#0a0a0e`, borders `#1f1f26`. Content width token `--w-main: 1500px`.
- **Font**: Plus Jakarta Sans (self-hosted via `@fontsource`), weights 400–800 + italics.
- **Layout conventions**: `mx-auto max-w-[var(--w-main)] px-5 md:px-8`; sections
  `py-24 md:py-32`; decorative radial-glow divs (see `PlaceholderPage.tsx`).

**Reusable homepage patterns for the work page:**

| Existing asset | Reuse |
|---|---|
| `lib/gsap.ts` | gsap + ScrollTrigger registration, `prefersReducedMotion()` guard — use everywhere |
| `components/SectionHeading.tsx` | word-stagger scroll reveal (y:30, opacity, stagger 0.08, 0.7s power3.out, trigger `top 85%`) |
| `lib/scramble.ts` | per-character scramble/settle reveal — candidate for the big "WORK"-style page title |
| `components/sections/CaseStudiesSection.tsx` | closest analog: numbered project rows, tag pills, GSAP entrance stagger (`x:-40, opacity, stagger 0.08`), React-state hover overlay |
| `lib/data.ts` → `caseStudies[]` | 5 projects (number/name/slug/tags/gradient) already feed `/case-study/[slug]` routes |
| `components/SmoothScrollProvider.tsx` | Lenis is already global — scroll feel matches the live site for free |
| `components/sections/Footer.tsx` | already appended by page components (see `PlaceholderPage`) |
| `app/work/page.tsx` | currently renders `PlaceholderPage` — this file gets replaced |

**Constraint from AGENTS.md:** this Next.js version has breaking changes; the
relevant guides in `node_modules/next/dist/docs/` must be read before writing
any Next.js code (first build task below).

---

## 2. Learnings from the Playwright analysis of the live `/work` page

Artifacts: `motion-capture/work-page-session.webm` (full recorded session),
`work-top.png`, `work-full.png`, `work-bottom.png`, `work-mobile-top.png`,
`work-mobile-grid.png`, `hover-card-*.png`, `click-*.png`, `analysis-results.json`.

**Layout / structure**
- Fixed translucent navbar, then a page hero that is just a **giant "WORK"
  headline** (left-aligned, ~display size) with a **thin full-width rule** under it.
  No intro paragraph, no sub-copy.
- Main content is a **grid, not a list**: `grid grid-cols-1 md:grid-cols-12
  gap-x-5 gap-y-10 md:gap-y-20` containing **9 project cards**.
  - Row 1 is **asymmetric**: `md:col-span-6 lg:col-span-7` + `md:col-span-6 lg:col-span-5`.
  - All remaining cards are uniform `md:col-span-6` (2-up rows).
- Each card = one `<a>` (links to a case-study page) containing:
  1. small **index number** ("01"…"09") top-left above the image,
  2. large **project image** (device mockup, `object-cover`),
  3. caption row below: **project name** (left) + **icon + label tag pills** (right; pills wrap under the name on mobile).
- Footer: contact email, underlined "Linkedin ↗", "Based in Atlanta, GA / Serving
  clients globally", **giant live clock (HH:MM:SS AM)**, three link columns,
  violet radial glow bottom — same footer as the homepage.

**Filtering behavior**
- **There are no filters, category tabs, sort controls, or search** on the page.
  The only buttons found are the navbar's Services/Resources mega-menu toggles
  and the mobile hamburger. The census of all 46 interactive elements confirms this.

**Hover behavior (project cards)**
- Image zoom: `img … transition-transform duration-300 group-hover:scale-105`
  (300ms, `cubic-bezier(0.4, 0, 0.2, 1)`) — Tailwind `group-hover` driven.
- A **circular "View Work" badge** appears over the hovered image (semi-transparent
  `bg-background/20` disc with `border-foreground/40`, transition ~300ms) —
  captured in `hover-card-13.png`. It sits where the cursor is (cursor-follower style).
- Card-level computed styles otherwise don't change — hover work happens on
  descendants (`group-hover:`), and tag pills have a subtle 300ms background/border
  transition (`bg-foreground/10 border-foreground/5`).

**Scroll behavior**
- Lenis smooth scroolling is active (`<html class="lenis">`).
- Cards animate **into view on scroll**: sampled mid-flight at
  `translateY ≈ 8–13px → 0` and `opacity ≈ 0.85–0.99 → 1` (a fade-up entrance,
  triggered per-card as it enters the viewport). Zero CSS keyframe animations
  running; entrances are JS-driven element transforms.

**Timing summary (computed styles)**
- Dominant timing function: `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind default ease).
- Card image zoom: 0.3s. Tag pills: 0.3s. Nav/mega-menu panels: 0.2–0.3s
  (opacity/transform). Mega-menu item hover: 0.15s. CTA arrow svg: 0.5s ease, 0.2s delay.

**Libraries (global scope check)**
- Present: **Lenis** (html class), **Next.js**. Zero `<canvas>` elements on this page
  (no particle system, unlike the homepage).
- **Not present on `window`**: GSAP, ScrollTrigger, Swiper, Three.js. No Framer
  Motion DOM markers found. Entrance animations are bundled/scoped (see Assumptions).

**Capture caveats (honest notes)**
- In the recorded session, a URL-shadowing bug in the first script caused some
  external/nav links to be **clicked instead of hover-only**; each navigation was
  immediately reverted with `goBack` (visible as brief page flashes in the video).
  A second hover-only pass captured hover data without clicking anything.
  Both notes are also embedded in `analysis-results.json` → `notes`.
- The purple block partway down `work-full.png` is a lazy-load artifact of the
  full-page screenshot, not a real page element.

---

## 3. Assumptions (clearly labeled — not verified facts)

- **A1 — Entrance mechanism:** the live site's card fade-up is JS-driven with no
  global GSAP/Framer detected; it is *assumed* to be a bundled animation lib or
  IntersectionObserver. We will implement it with **our existing GSAP +
  ScrollTrigger pattern** regardless, per the requirement to match this project's conventions.
- **A2 — "View Work" badge motion:** *assumed* to be a cursor-follower (tracks
  mouse within the card) based on screenshots; exact easing/lerp of the follow
  is not observable from computed styles. We will implement a GSAP
  `quickTo`-style follower with ~0.3s ease and treat exact feel as tunable.
- **A3 — Hero entrance:** any entrance animation on the "WORK" headline was not
  reliably isolated in the capture. *Assumed* a simple reveal; we will use the
  project's existing `scramble()` or word-stagger reveal (open question Q3).
- **A4 — Data:** the live site shows 9 projects; our `lib/data.ts` has 5
  case studies with routes. *Assumed* we build from our own data (5 cards) rather
  than fabricating 4 more projects (open question Q2).
- **A5 — Tag pill icons:** live pills each have a small icon per service.
  *Assumed* small inline SVGs are acceptable; we will map icons per tag category.
- **A6 — Asymmetric first row:** *assumed* intentional design (7/5 split on lg)
  and worth replicating; falls back to 6/6 on md either way.
- **A7 — Mobile breakpoint behavior** was verified only at 390px and 1440px
  widths; intermediate tablet behavior follows Tailwind `md:`/`lg:` classes as read
  from the DOM, not from device testing.

---

## 4. Step-by-step build plan (small, independently verifiable tasks)

Each task is a checkbox and states its verification. **No task modifies files
outside the listed ones.**

- [ ] **T0 — Read Next.js 16 docs (AGENTS.md mandate).** Read the routing/pages,
  metadata, and image guides in `node_modules/next/dist/docs/` before coding.
  *Verify:* conventions used in later tasks match the shipped docs.

- [ ] **T1 — Extend `lib/data.ts` with work-page fields.** Add an optional
  `image`/`mockupStyle` field (placeholder gradients already exist) and a
  per-tag icon mapping (`tagIcons`). Keep `caseStudies` as the single source of truth.
  *Verify:* `npm run build` type-checks; homepage `CaseStudiesSection` unaffected.

- [ ] **T2 — Page scaffold.** Replace `PlaceholderPage` usage in
  `app/work/page.tsx` with a server component rendering: hero (T3), grid (T4),
  `Footer`. Keep `metadata` export.
  *Verify:* `/work` renders headline + empty grid section + footer; no console errors.

- [ ] **T3 — Hero: giant "WORK" title + rule.** New client component
  (`components/sections/WorkHero.tsx`): display-size headline
  (~`text-[clamp(4rem,14vw,11rem)]`, tight tracking), thin `border-b
  border-foreground/20` full-width rule, `pt-28` clearance under the fixed navbar
  (matches `PlaceholderPage`). Entrance via `lib/scramble.ts` **or**
  `SectionHeading`-style stagger (per Q3), guarded by `prefersReducedMotion()`.
  *Verify:* visual check desktop + 390px; reduced-motion shows static text.

- [ ] **T4 — Project grid layout.** New `components/sections/WorkGrid.tsx`
  (client): `grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-10 md:gap-y-20`;
  first two cards `md:col-span-6 lg:col-span-7` / `lg:col-span-5`, rest
  `md:col-span-6`. Card = `<Link href={/case-study/${slug}}>` wrapping index
  number, image block (placeholder gradient from `cs.gradient`, aspect ~4/3,
  `overflow-hidden`), caption row (name left, pills right, pills wrap below name
  on mobile — `flex-col md:flex-row`).
  *Verify:* 1 col at 390px, 2 cols ≥768px, 7/5 first row ≥1024px; all 5 cards
  link to existing case-study routes.

- [ ] **T5 — Card hover: image zoom + pill transitions.** Tailwind only:
  `group` on card, inner image layer `transition-transform duration-300
  group-hover:scale-105`; pills `transition-colors duration-300
  hover:bg-foreground/10`.
  *Verify:* hover in browser; zoom is 300ms and contained by `overflow-hidden`.

- [ ] **T6 — "View Work" cursor badge.** In `WorkGrid`, one absolutely-positioned
  circular badge per card (`border border-foreground/40 bg-background/20
  backdrop-blur`, small uppercase label): fades/scales in on card mouseenter,
  follows the cursor within the image via `gsap.quickTo` on x/y, fades out on
  leave. Skip entirely under `prefersReducedMotion()` and on touch devices
  (no hover: `@media (hover: hover)` / pointer check).
  *Verify:* badge tracks cursor smoothly over each card, never intercepts clicks
  (`pointer-events-none`); absent on touch emulation.

- [ ] **T7 — Scroll entrance animation.** GSAP + ScrollTrigger per card
  (mirroring `CaseStudiesSection`): `gsap.from(card, { y: 32, opacity: 0,
  duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: card, start:
  "top 85%" } })` — per-card trigger (not one batch) so late rows animate when
  reached, matching the live behavior. Wrap in `gsap.context`, revert on
  unmount, skip under reduced motion.
  *Verify:* scroll down slowly — each row fades/rises once as it enters; scroll
  up does not re-trigger; no layout shift with JS disabled beyond starting visible.

- [ ] **T8 — No filtering (parity decision).** The live page has no filters —
  ship without them unless Q1 says otherwise.
  *Verify:* n/a (documents intent).

- [ ] **T9 — Responsive + polish pass.** Check 390 / 768 / 1024 / 1440 widths:
  heading clamp, grid gaps, pill wrapping, focus-visible styles on card links,
  alt text/aria-labels, `::selection` consistency.
  *Verify:* DevTools responsive sweep + keyboard tab-through.

- [ ] **T10 — Final verification.** `npm run lint`, `npm run build`, then drive
  `/work` in the dev server end-to-end (scroll, hover, click through to a case
  study and back). Confirm `git status` touches only the files listed above.

Files touched: `app/work/page.tsx`, `lib/data.ts`, new
`components/sections/WorkHero.tsx`, new `components/sections/WorkGrid.tsx`.
Nothing else.

---

## 5. Open questions (need your answer before implementation)

1. **Filters:** the live work page has none. Ship exact parity (no filters), or
   add tag-based filtering as an enhancement?
2. **Project count:** we have 5 case studies in `lib/data.ts`; the live site
   shows 9. Keep our 5, or add placeholder entries (and stub case-study pages)
   to reach a fuller grid?
3. **Hero treatment:** plain giant "WORK" like the live site, scramble-in via
   `lib/scramble.ts` (homepage signature move), or word-stagger via
   `SectionHeading`? Recommendation: scramble — it ties the page to the homepage hero.
4. **Card imagery:** real project screenshots/mockups aren't in the repo. Use the
   existing per-project `gradient` placeholders (current recommendation), or will
   you supply images to drop into `public/`?
5. **Navbar "Work" link state:** should the navbar mark `/work` as active
   (current `Navbar.tsx` behavior unknown to change)? Out of scope unless requested.
