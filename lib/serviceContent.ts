/**
 * Long form content for `/services/[slug]`.
 *
 * Kept apart from `serviceCards` in lib/data.ts, which drives the home page
 * deck and the navigation and is deliberately terse. This is the page copy:
 * one entry per service, keyed by the same slug so the two can never point at
 * different routes.
 *
 * Rules this copy is written under: no statistics we have not measured, no
 * invented clients or testimonials, no promises about revenue, funding, market
 * outcomes or response times, and no technology listed that we do not actually
 * work with.
 */

export type ServicePage = {
  /**
   * The display title for the page heading. Spelled out rather than using the
   * ampersand in `serviceCards.title`, which exists only because the home page
   * card pins its headline to a single line.
   */
  /**
   * Search metadata for this service. Lives beside the page copy so a new
   * service cannot ship carrying the title or description of another one.
   *
   * `titlePart` leads with the service's own target term and carries no
   * brand suffix — the root layout's title template appends that.
   */
  seo: { titlePart: string; description: string };
  pageTitle: string;
  /** Sentence case headline under the display heading. */
  headline: string;
  /** Hero supporting paragraph. */
  intro: string;
  /** Action label, used in the hero and again in the closing band. */
  ctaLabel: string;
  hero: { src: string; alt: string };
  overview: { heading: string; body: string[] };
  capabilities: { heading: string; items: { title: string; body: string }[] };
  approach: { heading: string; intro: string; steps: { title: string; body: string }[] };
  why: { heading: string; body: string[] };
  tech: { heading: string; note: string; groups: { label: string; items: string[] }[] };
  closing: string[];
};

export const servicePages: Record<string, ServicePage> = {
  "web-design-development": {
    seo: {
      titlePart: "Web Design & Development in South Africa",
      description:
        "Web design and development in South Africa. We build fast, responsive websites that represent your brand clearly and guide visitors toward action.",
    },
    pageTitle: "Web Design and Development",
    headline: "Websites built to do more than look good.",
    intro:
      "We create modern, responsive websites that represent your brand clearly, guide people toward action, and give your digital presence a foundation that still holds up as the business grows.",
    ctaLabel: "Start Your Project",
    hero: {
      src: "/services/web-development-hero.webp",
      alt: "A designed website interface framed on a display in a quiet architectural workspace",
    },
    overview: {
      heading: "A website is usually the first conversation.",
      body: [
        "Most people meet a business online well before they meet anyone in it. That first screen decides whether you look credible, whether the thing they came for is easy to find, and whether they take the next step or close the tab.",
        "A site that only looks good answers none of that. We design around how people actually read, scan and decide, then build it so it stays quick and dependable on the devices your audience really uses.",
      ],
    },
    capabilities: {
      heading: "What we build",
      items: [
        {
          title: "Business websites",
          body: "Clear, credible sites for companies that need to explain what they do and be found doing it.",
        },
        {
          title: "Corporate websites",
          body: "Larger structures with multiple sections, audiences and content owners to account for.",
        },
        {
          title: "Landing pages",
          body: "Focused single page builds for a campaign, a launch or one specific offer.",
        },
        {
          title: "Ecommerce experiences",
          body: "Storefronts with catalogue, cart and checkout, on a platform chosen to suit the catalogue.",
        },
        {
          title: "Portfolio websites",
          body: "Work led sites where the images and the projects carry the argument.",
        },
        {
          title: "Custom web applications",
          body: "For when a site needs accounts, logic and data behind it rather than pages alone.",
        },
      ],
    },
    approach: {
      heading: "How we work",
      intro:
        "Four stages, in order. Each one produces something you can look at and respond to.",
      steps: [
        {
          title: "Discover",
          body: "We learn the business, the audience, the goals and the constraints before proposing anything.",
        },
        {
          title: "Design",
          body: "We shape the structure and the user experience first, then set the visual direction on top of it.",
        },
        {
          title: "Build",
          body: "We develop the site to be fast, responsive and maintainable, and we test it on real devices.",
        },
        {
          title: "Launch and improve",
          body: "We deploy it, hand it over properly, and stay available for the changes that follow.",
        },
      ],
    },
    why: {
      heading: "Why this matters",
      body: [
        "A website earns or loses trust in seconds. Slow pages, unclear navigation and copy written for nobody in particular all quietly cost you the visit.",
        "Getting it right means the people who arrive understand what you offer, find what they need, and can act on it. That is a design and engineering problem long before it is a decoration problem.",
      ],
    },
    tech: {
      heading: "What we build with",
      note: "The stack follows the project rather than the other way around. These are the tools we reach for most.",
      groups: [
        { label: "Interface", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
        { label: "Commerce", items: ["Shopify"] },
        { label: "Delivery", items: ["Netlify", "Vercel"] },
      ],
    },
    closing: [
      "Your business deserves more than a template.",
      "Let's build a digital presence with purpose.",
    ],
  },

  "custom-software": {
    seo: {
      titlePart: "Custom Software Development in South Africa",
      description:
        "Custom software development in South Africa. When off the shelf tools do not fit how you work, we design and build systems around your operations.",
    },
    pageTitle: "Custom Software Solutions",
    headline: "Technology built around your challenges.",
    intro:
      "When off the shelf software does not fit the way you work, we design and develop tailored systems that solve the specific business and operational problems in front of you.",
    ctaLabel: "Discuss Your Solution",
    hero: {
      src: "/services/custom-software-hero.webp",
      alt: "Precision machined components arranged into a single ordered structure",
    },
    overview: {
      heading: "When the tool does not fit the work.",
      body: [
        "Plenty of businesses end up bending their process to fit software somebody else designed. It holds until it does not: the spreadsheet running alongside it, the same data entered twice, the step only one person knows how to finish.",
        "Custom software runs the other way around. We start from how the work actually happens, then build the system to match, so the software carries the process instead of fighting it.",
      ],
    },
    capabilities: {
      heading: "What we can build",
      items: [
        {
          title: "Business management systems",
          body: "The operational core: records, roles, and the daily actions a team repeats.",
        },
        {
          title: "Internal platforms",
          body: "Tools for staff rather than customers, built for speed of use over polish for its own sake.",
        },
        {
          title: "Customer portals",
          body: "A place for your clients to see their own information and act on it without emailing you.",
        },
        {
          title: "Custom dashboards",
          body: "The numbers that actually drive decisions, pulled into one view and kept current.",
        },
        {
          title: "Workflow systems",
          body: "Multi step processes with states, handovers and approvals modelled properly.",
        },
        {
          title: "Data driven applications",
          body: "Software where the data model is the hard part and the interface follows from it.",
        },
        {
          title: "Web and mobile applications",
          body: "Delivered to the browser, to phones, or to both where that is the right call.",
        },
      ],
    },
    approach: {
      heading: "Built around your needs",
      intro:
        "We do not start by writing code. We start by understanding the process that already exists and where it hurts.",
      steps: [
        {
          title: "Understand the problem",
          body: "We sit with the current process, including the workarounds people have quietly invented.",
        },
        {
          title: "Define the right solution",
          body: "We agree what the software should do, and just as usefully, what it should not.",
        },
        {
          title: "Plan the system",
          body: "Data model, integrations and architecture, decided before they become expensive to change.",
        },
        {
          title: "Design the experience",
          body: "We shape the screens around the real task, for the people who will use them every day.",
        },
        {
          title: "Engineer the product",
          body: "We build it in working slices you can try, rather than disappearing for months.",
        },
        {
          title: "Test and refine",
          body: "We test against the real process, then tighten what the first contact with reality exposes.",
        },
      ],
    },
    why: {
      heading: "A solution that can grow",
      body: [
        "Software that only answers today's problem becomes tomorrow's constraint. We design so the parts most likely to change can change, and so adding the next capability does not mean rebuilding the last one.",
        "That is a matter of sensible structure rather than a promise of limitless scale. What we can commit to is a codebase another engineer can read, a data model that holds up as the business shifts, and decisions documented where you can find them.",
      ],
    },
    tech: {
      heading: "What we build with",
      note: "Chosen per project, based on what the system has to do and who has to maintain it.",
      groups: [
        { label: "Application", items: ["React", "React Native", "TypeScript", "Next.js"] },
        { label: "Services and data", items: ["Node.js", "Firebase", "REST APIs", "Google Cloud"] },
        { label: "Payments", items: ["PayFast"] },
      ],
    },
    closing: [
      "Your challenges are unique.",
      "Your technology can be too.",
    ],
  },

  "automation-integrations": {
    seo: {
      titlePart: "Business Automation & Integrations",
      description:
        "Business automation and system integration in South Africa. We connect the tools you already use and automate repetitive work to cut manual effort.",
    },
    pageTitle: "Automation and Integrations",
    headline: "Make your systems work together.",
    intro:
      "We connect the digital tools you already use, streamline repetitive processes, and build practical automations that cut manual effort and keep information moving.",
    ctaLabel: "Explore Automation",
    hero: {
      src: "/services/automation-integrations-hero.webp",
      alt: "Interlocking architectural walkways forming a single continuous route",
    },
    overview: {
      heading: "Your tools do not talk to each other.",
      body: [
        "Most businesses run on several systems that were never designed to meet: the accounting package, the booking form, the inbox, the spreadsheet somebody maintains by hand. The gaps between them get filled by a person copying information across.",
        "That work is slow, easy to get wrong, and invisible until somebody is away. Closing those gaps is usually the cheapest improvement available to a business.",
      ],
    },
    capabilities: {
      heading: "What we help automate",
      items: [
        {
          title: "Data movement between systems",
          body: "Information entered once, then arriving wherever else it is needed.",
        },
        {
          title: "Notifications and alerts",
          body: "The right person told at the right moment, without somebody remembering to tell them.",
        },
        {
          title: "Customer workflows",
          body: "Enquiries, bookings and onboarding steps that progress on their own.",
        },
        {
          title: "Document processing",
          body: "Generating, routing and filing the paperwork a process produces.",
        },
        {
          title: "Approval processes",
          body: "Requests that reach the right approver and record what was decided.",
        },
        {
          title: "Reporting workflows",
          body: "Numbers gathered and delivered on a schedule instead of assembled by hand.",
        },
        {
          title: "Repeated administrative tasks",
          body: "The small recurring jobs that quietly consume a morning every week.",
        },
      ],
    },
    approach: {
      heading: "Start with the process",
      intro:
        "Automating a broken process just makes it break faster. We map what happens today before deciding whether anything should be automated at all.",
      steps: [
        {
          title: "What currently happens",
          body: "The real sequence, step by step, including the parts nobody wrote down.",
        },
        {
          title: "Where time is lost",
          body: "Which steps take the longest, and which ones wait on someone else.",
        },
        {
          title: "Where errors occur",
          body: "The points where information gets retyped, missed or quietly corrupted.",
        },
        {
          title: "Which tasks repeat",
          body: "The work that is identical every time is the work worth handing to a machine.",
        },
        {
          title: "Which systems are involved",
          body: "What each platform can already do, and what it will genuinely allow us to connect to.",
        },
        {
          title: "Decide what to build",
          body: "Sometimes the answer is an integration, sometimes an automation, and sometimes a simpler process.",
        },
      ],
    },
    why: {
      heading: "Connect your technology",
      body: [
        "An integration means two systems sharing information directly, so a booking made in one appears in the other without anyone rekeying it. An automation means a step that used to need a person now happens on its own once its trigger occurs.",
        "Not every platform allows this, and not every process should be automated. Where it does fit, the benefit is steady rather than dramatic: fewer transcription errors, less waiting, and a process that behaves the same way whether or not the usual person is at their desk.",
      ],
    },
    tech: {
      heading: "What we work with",
      note: "Integrations depend on what your existing platforms actually expose. We confirm that before committing to an approach.",
      groups: [
        { label: "Services", items: ["Node.js", "REST APIs", "Webhooks"] },
        { label: "Platforms", items: ["Firebase", "Google Cloud"] },
      ],
    },
    closing: [
      "Spend less time moving information.",
      "Spend more time moving the business forward.",
    ],
  },

  "product-development": {
    seo: {
      titlePart: "Product & MVP Development in South Africa",
      description:
        "MVP and product development in South Africa. We help founders and teams shape an idea into a usable product, from first concept to a working build.",
    },
    pageTitle: "Digital Product Development",
    headline: "Turn the right idea into a real product.",
    intro:
      "We work with founders, businesses and teams to shape a product idea into practical, usable technology, from the first concept through design and development.",
    ctaLabel: "Build Your Product",
    hero: {
      src: "/services/digital-product-hero.webp",
      alt: "A product design desk showing sketches, structured design materials and a working prototype on a device",
    },
    overview: {
      heading: "Build the right thing first.",
      body: [
        "The expensive mistake in product work is rarely bad code. It is building the wrong thing carefully: a long feature list agreed up front, developed in full, and only tested against real people once it is finished.",
        "We would rather narrow the idea down to the part that matters, get that into use, and let what we learn decide the next move.",
      ],
    },
    capabilities: {
      heading: "From idea to product",
      items: [
        {
          title: "Problem definition",
          body: "Naming the problem precisely enough that you can tell whether it has been solved.",
        },
        {
          title: "Product discovery",
          body: "Understanding the people involved, what they do now, and what would make them switch.",
        },
        {
          title: "Feature planning",
          body: "Deciding what belongs in the first useful version and what can honestly wait.",
        },
        {
          title: "User experience design",
          body: "Designing the flow around the task, not around a list of screens.",
        },
        {
          title: "Technical planning",
          body: "Choosing the architecture and the data model that fit the product's real shape.",
        },
        {
          title: "Development",
          body: "Building it in slices you can use, so progress is visible throughout.",
        },
        {
          title: "Testing",
          body: "Checking it against the problem it exists to solve, not only against the spec.",
        },
        {
          title: "Launch preparation",
          body: "Hosting, domains, accounts and the practical work of getting it into the world.",
        },
      ],
    },
    approach: {
      heading: "Four questions before any code",
      intro:
        "Development does not begin with a feature list. It begins with answers to these, written down and agreed.",
      steps: [
        {
          title: "Who is the product for",
          body: "A specific person in a specific situation, not a market segment.",
        },
        {
          title: "What problem does it solve",
          body: "What they are doing today instead, and what that currently costs them.",
        },
        {
          title: "Why does the problem matter",
          body: "Whether it is painful enough that somebody would change their habits to fix it.",
        },
        {
          title: "What goes in the first version",
          body: "The smallest build that genuinely solves the problem for one real user.",
        },
      ],
    },
    why: {
      heading: "Designed for learning",
      body: [
        "A focused first version reaches real use sooner, and real use tells you things no planning session will. Which parts get used, which get ignored, where people hesitate, and what they ask for that nobody predicted.",
        "That is why we build to learn rather than to complete a list. It keeps the early cost down and means the features that follow are the ones the product actually needs. What none of it does is guarantee an audience: a good build gives an idea a fair test, and the test is still a real one.",
      ],
    },
    tech: {
      heading: "What we build with",
      note: "A first version should be built on tools that let it change quickly once it meets real users.",
      groups: [
        { label: "Product", items: ["React", "Next.js", "React Native", "TypeScript"] },
        { label: "Backend", items: ["Node.js", "Firebase"] },
        { label: "Design", items: ["Figma"] },
      ],
    },
    closing: [
      "Good products start with a problem worth solving.",
      "Let's find the right way to build it.",
    ],
  },

  "hosting-support": {
    seo: {
      titlePart: "Website Hosting & Support in South Africa",
      description:
        "Website hosting and support in South Africa. We keep your site and digital systems available, maintained, updated and monitored once they are live.",
    },
    pageTitle: "Hosting and Ongoing Support",
    headline: "Launching is only the beginning.",
    intro:
      "We provide practical support that keeps your website or digital solution available, maintained and up to date once it is live.",
    ctaLabel: "Talk About Support",
    hero: {
      src: "/services/hosting-support-hero.webp",
      alt: "An ordered infrastructure corridor rendered as calm architecture in graphite and silver",
    },
    overview: {
      heading: "Software does not stand still.",
      body: [
        "Launch day is the point where a project stops being a project and starts being something the business relies on. Domains renew, platforms release updates, dependencies need patching, and the content that was accurate in March is out of date by September.",
        "Without somebody holding that thread, small things accumulate quietly until one of them takes the site down at an inconvenient moment.",
      ],
    },
    capabilities: {
      heading: "What support can include",
      items: [
        {
          title: "Website hosting",
          body: "Somewhere reliable for the site to live, set up and configured properly.",
        },
        {
          title: "Domain and DNS support",
          body: "Renewals, records and the changes that are easy to get wrong once and remember forever.",
        },
        {
          title: "Software updates",
          body: "Keeping frameworks and dependencies current so upgrades stay small.",
        },
        {
          title: "Security related updates",
          body: "Applying patches when they matter, and certificates before they lapse.",
        },
        {
          title: "Content changes",
          body: "The copy, images and page edits that come up after launch.",
        },
        {
          title: "Technical troubleshooting",
          body: "A known person to contact when something behaves unexpectedly.",
        },
        {
          title: "Performance monitoring",
          body: "Where applicable, keeping an eye on speed and availability over time.",
        },
        {
          title: "Backup management",
          body: "Where applicable, making sure a recent copy exists and can actually be restored.",
        },
      ],
    },
    approach: {
      heading: "How support is arranged",
      intro:
        "Requirements differ between projects, so support is scoped to the solution rather than sold as a fixed package.",
      steps: [
        {
          title: "Agree what is covered",
          body: "We write down which of the items above apply to your project, and which do not.",
        },
        {
          title: "Agree how to reach us",
          body: "A clear route for raising something, so requests do not depend on catching the right person.",
        },
        {
          title: "Agree the rhythm",
          body: "Whether updates happen on a schedule, on request, or a combination of the two.",
        },
        {
          title: "Review it as things change",
          body: "A solution that grows will need its support arrangement revisited. We would rather adjust it than let it drift.",
        },
      ],
    },
    why: {
      heading: "Built for continuity",
      body: [
        "The point of a support arrangement is that there is a clear path when something needs attention, and a named person who already knows how your solution is put together.",
        "We do not advertise round the clock cover or a guaranteed response time, because we would rather commit to something we can hold to. What we can agree is the scope, the way to reach us and the cadence, all set out before the work begins.",
      ],
    },
    tech: {
      heading: "What we work with",
      note: "Hosting is chosen to suit the build rather than for the sake of a preferred provider.",
      groups: [
        { label: "Hosting", items: ["Netlify", "Vercel", "Firebase"] },
        { label: "Domains and certificates", items: ["DNS", "SSL", "GoDaddy"] },
      ],
    },
    closing: [
      "Build with confidence.",
      "Keep moving with the right support.",
    ],
  },
};
