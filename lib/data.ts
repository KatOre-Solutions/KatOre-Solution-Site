export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

export type ServiceCard = {
  number: string;
  title: string;
  /** Route segment under /services. Also the key case-study tags mirror. */
  slug: string;
  subtitle: string;
  description: string;
  items: string[];
  tools: string[];
  accent: string;
};

/**
 * Titles are held to ~25 characters: the expanded card pins its headline to a
 * single line (`sm:whitespace-nowrap`) inside a 380px track, and anything longer
 * is clipped by the card's own overflow rather than wrapping.
 */
export const serviceCards: ServiceCard[] = [
  {
    number: "01",
    title: "Web Design & Development",
    slug: "web-design-development",
    subtitle: "Digital Experiences",
    description:
      "Modern, responsive websites that represent your brand, engage your audience, and turn visitors into customers.",
    items: [
      "Website Design",
      "Responsive Development",
      "Ecommerce Websites",
      "Landing Pages",
      "Website Redesign",
    ],
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shopify"],
    accent: "#111315",
  },
  {
    number: "02",
    title: "Custom Software Solutions",
    slug: "custom-software",
    subtitle: "Software Development",
    description:
      "Purpose-built software designed around your business — solving complex problems and streamlining how you operate.",
    items: [
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "Business Systems",
      "API Development",
    ],
    tools: ["React", "React Native", "Node.js", "TypeScript", "Firebase"],
    accent: "#2b2e32",
  },
  {
    number: "03",
    title: "Automation & Integrations",
    slug: "automation-integrations",
    subtitle: "Digital Automation",
    description:
      "Smarter workflows that connect your systems, automate repetitive tasks, and help your business run more efficiently.",
    items: [
      "Workflow Automation",
      "System Integrations",
      "Third-Party APIs",
      "Data Processing",
      "Process Automation",
    ],
    tools: ["Node.js", "REST APIs", "Firebase", "Google Cloud", "Integrations"],
    accent: "#34383d",
  },
  {
    number: "04",
    title: "Hosting & Support",
    slug: "hosting-support",
    subtitle: "Digital Infrastructure",
    description:
      "Reliable infrastructure and ongoing technical support that keeps your sites, apps, and domains running smoothly.",
    items: [
      "Website Hosting",
      "Domain Management",
      "Business Email Setup",
      "Website Maintenance",
      "Technical Support",
    ],
    tools: ["Netlify", "GoDaddy", "Zoho Mail", "DNS", "SSL"],
    accent: "#111315",
  },
];

/**
 * Service links for the navbar dropdown and the `/services/[slug]` routes,
 * derived from the cards so a label can never drift from the section that
 * defines it.
 */
export const services = serviceCards.map((card) => ({
  label: card.title,
  href: `/services/${card.slug}`,
}));

export type CaseStudy = {
  number: string;
  name: string;
  slug: string;
  /** The services used to deliver the site; labels mirror `serviceCards`. */
  tags: string[];
  /** Still frame, shown always. ~30–95KB WebP in /public/work. */
  poster: string;
  /** Muted loop, played on hover only. ~200–310KB MP4 in /public/work. */
  loop: string;
  /** Fallback surface for places that render a tile without the preview. */
  gradient: string;
};

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    name: "Space Voyage",
    slug: "space-voyage",
    tags: ["Web Design & Development", "Hosting & Support"],
    poster: "/work/space-voyage.webp",
    loop: "/work/space-voyage.mp4",
    gradient: "from-[#111315] to-[#3a3e43]",
  },
  {
    number: "02",
    name: "CodeNest",
    slug: "codenest",
    tags: ["Web Design & Development", "Custom Software Solutions"],
    poster: "/work/codenest.webp",
    loop: "/work/codenest.mp4",
    gradient: "from-[#2b2e32] to-[#111315]",
  },
  {
    number: "03",
    name: "Vex Ventures",
    slug: "vex-ventures",
    tags: ["Web Design & Development"],
    poster: "/work/vex-ventures.webp",
    loop: "/work/vex-ventures.mp4",
    gradient: "from-[#34383d] to-[#15181a]",
  },
  {
    number: "04",
    name: "Stellar AI",
    slug: "stellar-ai",
    tags: ["Custom Software Solutions", "Automation & Integrations"],
    poster: "/work/stellar-ai.webp",
    loop: "/work/stellar-ai.mp4",
    gradient: "from-[#1a1d20] to-[#3a3e43]",
  },
  {
    number: "05",
    name: "DesignPro",
    slug: "designpro",
    tags: ["Web Design & Development"],
    poster: "/work/designpro.webp",
    loop: "/work/designpro.mp4",
    gradient: "from-[#111315] to-[#2b2e32]",
  },
  {
    number: "06",
    name: "Wealth",
    slug: "wealth",
    tags: ["Web Design & Development", "Automation & Integrations"],
    poster: "/work/wealth.webp",
    loop: "/work/wealth.mp4",
    gradient: "from-[#15181a] to-[#34383d]",
  },
];

export const clients = [
  "Lowe's",
  "Cognizant",
  "Trimble",
  "e2open",
  "Toyota",
  "OWASP",
  "Injazat",
];

/** @deprecated Unused since the footer link columns were replaced by the
 *  "Technologies We Use" orbit. Kept only if those columns are ever restored. */
export const footerColumns = [
  {
    title: "SERVICES",
    links: services.map((s) => s.label),
  },
  {
    title: "ATOM",
    links: [
      "Atom Enterprise",
      "Atom Agentic",
      "Atom IntentIQ",
      "Compare Atom",
      "Atom GIS",
      "Atom Red Team",
      "Website Auditor",
    ],
  },
  {
    title: "RESOURCES",
    links: [
      "Case Studies",
      "Open Antimatter",
      "Clinix AI Platform",
      "Generative UI",
      "Sentiment AI",
      "Lie Detector",
      "Contact",
    ],
  },
];
