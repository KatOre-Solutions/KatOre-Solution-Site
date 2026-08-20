export type Founder = {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  /** Path under `public/`. Falls back to an initials mark when not yet present. */
  photo: string;
  initials: string;
};

export const founders: Founder[] = [
  {
    name: "Katleho Madaba",
    role: "Co Founder · Software Engineer",
    bio: "As Co Founder of Katore Solutions, Katleho brings her software engineering expertise and technical perspective to the products and solutions we build. Together, the founding team combines engineering, creativity and problem solving to build technology with purpose.",
    focus: ["Software Engineering", "System Design", "Web & Mobile Applications"],
    photo: "/company/katleho.jpg",
    initials: "KM",
  },
  {
    name: "Oreutlwile Diutlwileng",
    role: "Founder · Software Engineer",
    bio: "As Founder of Katore Solutions, Ore leads the company's vision and focuses on turning complex ideas into practical digital solutions. His work spans software engineering, web development, automation, and building products designed around real business needs.",
    focus: [
      "Software Engineering",
      "Product Development",
      "Web Applications",
      "Automation",
    ],
    photo: "/company/ore.jpg",
    initials: "OD",
  },
];

export const howWeThink = [
  {
    title: "Understand the problem",
    body: "We start with context, not assumptions.",
  },
  {
    title: "Build with purpose",
    body: "Every feature, system and interaction should serve a real need.",
  },
  {
    title: "Create for the future",
    body: "We build solutions that can evolve alongside the people and businesses using them.",
  },
];
