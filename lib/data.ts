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
    subtitle: "Digital Presence",
    description:
      "Modern, responsive websites designed to strengthen your digital presence and carry the goals of the business behind them.",
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
    subtitle: "Software Engineering",
    description:
      "Software and internal systems built around how your business actually operates, rather than bending your work to fit a product someone else designed.",
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
    subtitle: "Connected Systems",
    description:
      "Connecting the tools you already run so information moves between them on its own and the repetitive manual work disappears.",
    items: [
      "Workflow Automation",
      "System Integrations",
      "Third Party APIs",
      "Data Processing",
      "Process Automation",
    ],
    tools: ["Node.js", "REST APIs", "Firebase", "Google Cloud", "Integrations"],
    accent: "#34383d",
  },
  {
    number: "04",
    title: "Product Development",
    slug: "product-development",
    subtitle: "Idea to Launch",
    description:
      "Turning an idea into a working digital product: shaping the concept, planning the build, then developing and releasing it.",
    items: [
      "Product Discovery",
      "Technical Planning",
      "Prototypes",
      "MVP Development",
      "Iteration & Release",
    ],
    tools: ["React", "TypeScript", "Node.js", "Firebase", "Figma"],
    accent: "#1a1d20",
  },
  {
    number: "05",
    title: "Hosting & Support",
    slug: "hosting-support",
    subtitle: "Ongoing Care",
    description:
      "Reliable hosting, maintenance, updates and technical support that keep everything running long after launch day.",
    items: [
      "Website Hosting",
      "Domain Management",
      "Business Email Setup",
      "Website Maintenance",
      "Technical Support",
    ],
    tools: ["Netlify", "Vercel", "GoDaddy", "DNS", "SSL"],
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

/**
 * How Katore relates to a piece of work. Client engagements, Katore's own
 * products and self-directed concepts all belong in the portfolio, but a
 * visitor must never be able to mistake one for another — so this is rendered
 * on every tile and every case-study page, not just stored.
 */
export type ProjectType = "Client Project" | "Katore Product" | "Concept Development";

export type CaseStudy = {
  number: string;
  name: string;
  slug: string;
  /** Katore's actual relationship to the work. */
  projectType: ProjectType;
  /**
   * What kind of build this is: a SaaS platform, a storefront, a website.
   * Deliberately separate from `tags`, which say what Katore did, and from
   * `projectType`, which says whose work it is.
   */
  category: string;
  /** The services Katore genuinely delivered; labels mirror `serviceCards`.
   *  "Hosting & Support" asserts an active relationship, not merely that we
   *  built the thing — only tag it where that is true today. */
  tags: string[];
  /** Live site, opened in a new tab from the case-study page. */
  url: string;
  /** What the project is, and what Katore actually contributed. Deliberately
   *  free of invented metrics, outcomes and testimonials: if a claim cannot be
   *  verified, it does not appear here. */
  summary: string;
  /** Set only while the work is not publicly complete. */
  status?: string;
  /** Still frame, shown always. ~30–50KB WebP in /public/work. */
  poster: string;
  /** Muted loop, played on hover only. ~180–245KB MP4 in /public/work. */
  loop: string;
  /** Fallback surface for places that render a tile without the preview.
   *  Sampled from the poster, then spread so the gradient actually reads. */
  gradient: string;
  /**
   * Screens from inside the product, shown on the case study page. Intrinsic
   * dimensions travel with each one so the layout can reserve the right space
   * and never upscale a capture past its native width.
   */
  gallery?: { src: string; alt: string; width: number; height: number }[];
};

/**
 * Real work only. GuardianCheck leads because it is the most recent and the
 * fullest demonstration of Custom Software Solutions — `Navbar` spotlights
 * `caseStudies[0]` as "our latest work", and `WorkGrid` gives the first two
 * entries the larger cells.
 */
export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    name: "GuardianCheck",
    slug: "guardiancheck",
    projectType: "Katore Product",
    category: "SaaS Platform",
    tags: [
      "Custom Software Solutions",
      "Automation & Integrations",
      "Hosting & Support",
    ],
    url: "https://guardiancheck.co.za/",
    summary:
      "GuardianCheck is Katore's own product, a safeguarding platform for churches. It secures the moment a child is signed in and collected, using QR codes, guardian verification, live room capacity and attendance reporting, so volunteers spend less time on administration and parents always know where their children are. Katore designed and built it end to end as a React and Vite application on Firebase, with a separate account for every church, permissions by role, and billing through PayFast, and continues to host and maintain it.",
    poster: "/work/guardiancheck.webp",
    loop: "/work/guardiancheck.mp4",
    gradient: "from-[#1a1f26] to-[#333a44]",
    gallery: [
      {
        src: "/work/guardiancheck/01.webp",
        alt: "Admin control centre showing live counts for parents, children, rooms and volunteers, with attendance report export",
        width: 1100,
        height: 559,
      },
      {
        src: "/work/guardiancheck/02.webp",
        alt: "Volunteer station scanning a child QR code, with a recent check in activity feed",
        width: 1100,
        height: 761,
      },
      {
        src: "/work/guardiancheck/03.webp",
        alt: "Parent dashboard on mobile showing a child profile, allergy alert, room status and downloadable QR identity card",
        width: 376,
        height: 781,
      },
      {
        src: "/work/guardiancheck/04.webp",
        alt: "Security settings with a masked admin override PIN, alongside room and user management",
        width: 1100,
        height: 681,
      },
      {
        src: "/work/guardiancheck/05.webp",
        alt: "Church settings for branding, colours, logo and subscription",
        width: 1100,
        height: 664,
      },
      {
        src: "/work/guardiancheck/06.webp",
        alt: "Church registration screen for starting a free trial",
        width: 1100,
        height: 727,
      },
    ],
  },
  {
    number: "02",
    name: "Hey Beautiful",
    slug: "hey-beautiful",
    projectType: "Client Project",
    category: "Ecommerce",
    tags: ["Web Design & Development", "Custom Software Solutions"],
    url: "https://heybeautifulwellness.co.za/",
    summary:
      "Hey Beautiful is a women's wellness supplement brand. Katore designed and built its storefront as a custom Next.js application with Shopify as a headless commerce backend, giving the brand full control of the shopping experience while Shopify handles catalogue and checkout. The project is still in active development ahead of its public launch.",
    status: "In Progress",
    poster: "/work/hey-beautiful.webp",
    loop: "/work/hey-beautiful.mp4",
    gradient: "from-[#201d1a] to-[#3a332c]",
  },
  {
    number: "03",
    name: "New Lease of Life Foundation",
    slug: "new-lease-of-life",
    projectType: "Client Project",
    category: "Marketing Website",
    tags: [
      "Web Design & Development",
      "Automation & Integrations",
      "Hosting & Support",
    ],
    url: "https://newleaseoflifefoundation.org/",
    summary:
      "New Lease of Life Foundation is a Pretoria nonprofit helping homeless young people build sustainable futures through technical training, life skills and entrepreneurship programmes. Katore designed and built the site, then implemented the paths that turn a visitor into a supporter: the donation flow, the WhatsApp volunteer signup, and the events and fundraiser pages. Katore hosts and maintains it.",
    poster: "/work/new-lease-of-life.webp",
    loop: "/work/new-lease-of-life.mp4",
    gradient: "from-[#171a1c] to-[#2c3439]",
  },
  {
    number: "04",
    name: "Letsha La Bophelo",
    slug: "letsha-la-bophelo",
    projectType: "Client Project",
    category: "Marketing Website",
    tags: ["Web Design & Development", "Hosting & Support"],
    url: "https://letshalabophelo.org.za/",
    summary:
      "Letsha La Bophelo has run retreats, skills training and community empowerment programmes in South Africa since 1999. Katore designed and built its site, covering the programmes, projects, impact and partnership pages, with clear routes to donate or partner, and hosts and maintains it.",
    poster: "/work/letsha-la-bophelo.webp",
    loop: "/work/letsha-la-bophelo.mp4",
    gradient: "from-[#1e1c15] to-[#38332a]",
  },
  {
    number: "05",
    name: "Mintirho Healthcare",
    slug: "mintirho",
    projectType: "Client Project",
    category: "Marketing Website",
    tags: ["Web Design & Development"],
    // The bare domain answers 200 with an empty body; only /index.html renders.
    url: "https://mintirhohcs.co.za/index.html",
    summary:
      "Mintirho Healthcare and Consulting Services is an occupational health provider running medical surveillance and workplace wellness programmes for South African employers. Katore designed and built the site from scratch, presenting its compliance services alongside the offerings delivered on site, such as the IV lounge and the smoothie bike, with clear routes to book an appointment.",
    poster: "/work/mintirho.webp",
    loop: "/work/mintirho.mp4",
    gradient: "from-[#1c2226] to-[#2f383d]",
  },
  {
    number: "06",
    name: "Y68°",
    slug: "y68",
    projectType: "Concept Development",
    category: "Motion Website",
    tags: ["Web Design & Development"],
    url: "https://basketball-lake.vercel.app/",
    summary:
      "Y68° is a concept piece rather than client work. Katore built it to explore how far a motion led product site can go in the browser: a live 3D ball rendered with three.js, choreography driven entirely by scroll with GSAP, and a bold editorial layout. The street basketball premise is a design exercise, so the product, its players and its statistics are illustrative rather than real.",
    poster: "/work/y68.webp",
    loop: "/work/y68.mp4",
    gradient: "from-[#26251f] to-[#3a3833]",
  },
];

/**
 * Genuine client organisations only — the ones represented by a `Client Project`
 * above. GuardianCheck is Katore's own product and Y68° is a concept, so neither
 * belongs in a list of people who hired us. Katore is early-stage; a short honest
 * list is the point.
 */
export const clients = [
  "Hey Beautiful",
  "New Lease of Life Foundation",
  "Letsha La Bophelo",
  "Mintirho Healthcare",
];
