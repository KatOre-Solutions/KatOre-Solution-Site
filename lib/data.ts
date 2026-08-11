export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Website Design", href: "/services/website-design" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Development", href: "/services/ai-development" },
  { label: "AI Agents", href: "/services/ai-agents" },
  { label: "Healthcare Apps", href: "/services/healthcare-apps" },
];

export type ServiceCard = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  tools: string[];
  accent: string;
};

export const serviceCards: ServiceCard[] = [
  {
    number: "01",
    title: "UI/UX Design",
    subtitle: "Product Design",
    description:
      "Research-driven interfaces that feel effortless. We turn complex flows into intuitive, accessible experiences people love to use.",
    items: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "UI Systems & Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: ["Figma", "Sketch", "Adobe XD", "Blender", "Framer", "Abstract"],
    accent: "#111315",
  },
  {
    number: "02",
    title: "Website Design",
    subtitle: "Brand & Web",
    description:
      "Distinctive brand-led websites with motion and storytelling that convert visitors into customers.",
    items: [
      "Brand & Visual Identity",
      "Art Direction & Storytelling",
      "Motion & Micro-interactions",
      "Conversion Design Systems",
    ],
    tools: ["Figma", "Webflow", "Adobe", "Framer", "Spline", "After Effects"],
    accent: "#2b2e32",
  },
  {
    number: "03",
    title: "Web Development",
    subtitle: "Engineering",
    description:
      "Performant, scalable platforms built with modern stacks — from frontend to cloud infrastructure.",
    items: [
      "Frontend Platforms (React / Next)",
      "Backend APIs & Microservices (Node)",
      "Mobile & Cross-platform (Flutter)",
      "CI/CD & Cloud Ops (Docker)",
    ],
    tools: ["React", "Next.js", "Node", "TypeScript", "Docker", "Vercel"],
    accent: "#111315",
  },
  {
    number: "04",
    title: "AI Development",
    subtitle: "Applied AI",
    description:
      "Production-grade AI systems — from LLM apps and fine-tuning to vision and speech pipelines.",
    items: [
      "LLM Apps & Agents (RAG / Tools)",
      "Fine-tuning & Prompt Optimization",
      "Model Evals, Guardrails & Monitoring",
      "Vision, NLP & Speech Pipelines",
    ],
    tools: ["Python", "OpenAI", "HuggingFace", "LangChain", "PyTorch", "AWS"],
    accent: "#34383d",
  },
  {
    number: "05",
    title: "AI Agents",
    subtitle: "Autonomous Systems",
    description:
      "Tool-using, memory-backed agents that automate real workflows across voice and text.",
    items: [
      "Voice Agents & Call Centers",
      "Tool-using LLM Agents",
      "Multi-provider Orchestration",
      "Knowledge Base & Memory",
    ],
    tools: ["OpenAI", "Twilio", "LangGraph", "Pinecone", "Redis", "n8n"],
    accent: "#2b2e32",
  },
  {
    number: "06",
    title: "Healthcare Apps",
    subtitle: "Regulated Software",
    description:
      "Compliant, secure healthcare products — telehealth, patient portals, and EHR integrations.",
    items: [
      "HIPAA & PHI Compliance",
      "Telehealth & Patient Portals",
      "EHR Integrations (FHIR / HL7)",
      "Audit Logging & Access Controls",
    ],
    tools: ["React Native", "FHIR", "AWS", "PostgreSQL", "Stripe", "Twilio"],
    accent: "#111315",
  },
];

export type CaseStudy = {
  number: string;
  name: string;
  slug: string;
  /** The services used to deliver the site; labels mirror `services` above. */
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
    tags: ["Website Design", "UI/UX Design", "Web Development"],
    poster: "/work/space-voyage.webp",
    loop: "/work/space-voyage.mp4",
    gradient: "from-[#111315] to-[#3a3e43]",
  },
  {
    number: "02",
    name: "CodeNest",
    slug: "codenest",
    tags: ["Website Design", "Web Development", "UI/UX Design"],
    poster: "/work/codenest.webp",
    loop: "/work/codenest.mp4",
    gradient: "from-[#2b2e32] to-[#111315]",
  },
  {
    number: "03",
    name: "Vex Ventures",
    slug: "vex-ventures",
    tags: ["Website Design", "Web Development"],
    poster: "/work/vex-ventures.webp",
    loop: "/work/vex-ventures.mp4",
    gradient: "from-[#34383d] to-[#15181a]",
  },
  {
    number: "04",
    name: "Stellar AI",
    slug: "stellar-ai",
    tags: ["AI Development", "AI Agents", "UI/UX Design"],
    poster: "/work/stellar-ai.webp",
    loop: "/work/stellar-ai.mp4",
    gradient: "from-[#1a1d20] to-[#3a3e43]",
  },
  {
    number: "05",
    name: "DesignPro",
    slug: "designpro",
    tags: ["UI/UX Design", "Website Design"],
    poster: "/work/designpro.webp",
    loop: "/work/designpro.mp4",
    gradient: "from-[#111315] to-[#2b2e32]",
  },
  {
    number: "06",
    name: "Wealth",
    slug: "wealth",
    tags: ["Website Design", "Web Development", "AI Agents"],
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
    links: [
      "UI/UX Design",
      "Website Design",
      "Web Development",
      "AI Development",
      "AI Agents",
      "Healthcare Apps",
    ],
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
