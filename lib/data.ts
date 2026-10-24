// All site content lives here, so copy changes never touch components.

export const site = {
  name: "Mucyo Bertrand",
  short: "M/B",
  initials: "MB",
  // TODO: replace with your public email
  email: "mucyobertrand07@gmail.com",
  location: "Kigali, Rwanda",
  timezone: "Africa/Kigali",
  github: "https://github.com/mucyobertrand",
  entelon: "https://www.entelon.co/",
  iwp: "https://iwpafrica.org/",
  // Portrait at public/img/me.jpg (from "Elegant Plaid Suit Studio Portrait.png").
  hasPortrait: true,
  // Core engineering disciplines, shown across the site.
  skills: ["Web & Mobile Engineer", "Backend Engineer", "Applied AI Engineer"],
};

/** "Web & Mobile Engineer · Backend Engineer · Applied AI Engineer" */
export const skillsLine = site.skills.join(" · ");

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
];

// Rotating hero words. (`glow` is no longer used: the hero rim light is always the accent colour.)
// Add `image: "/img/your-photo.jpg"` to a word to use a photo instead.
export const heroWords: { word: string; glow: [string, string]; image?: string }[] = [
  { word: "web apps", glow: ["#054d8a", "#48a68c"] },
  { word: "mobile apps", glow: ["#48a68c", "#054d8a"] },
  { word: "backends", glow: ["#fdb022", "#ff7a2a"] },
  { word: "AI systems", glow: ["#e3175f", "#3b1a6b"] },
];

export const logos = [
  { kind: "word" as const, label: "entelon" },
  { kind: "img" as const, src: "/img/iwp-logo.png", label: "IWP Africa" },
  { kind: "img" as const, src: "/img/partner-hdi.png", label: "Health Development Initiative" },
  { kind: "img" as const, src: "/img/partner-rtb.png", label: "Rwanda TVET Board" },
  { kind: "img" as const, src: "/img/partner-ictchamber.png", label: "ICT Chamber" },
  { kind: "img" as const, src: "/img/partner-edupoto.png", label: "Edupoto" },
  { kind: "img" as const, src: "/img/klok.png", label: "Klok AI" },
  { kind: "img" as const, src: "/img/rca-logo.png", label: "Rwanda Coding Academy" },
];

export const statement =
  "I turn messy, real-world problems into products people actually use. Handwritten exam papers, outbreak reports, farm records, hours of call-centre audio. Web and mobile apps, solid backends and applied AI, shaped by product thinking and field research, from the first interview to the shipped app.";

export const stats = [
  { value: 7, suffix: "", label: "Products across Entelon & IWP" },
  { value: 25, suffix: "+", label: "Public repositories" },
  { value: 10, suffix: "M", label: "Hours/yr Entelon saves clients" },
  { value: 3, suffix: "", label: "Disciplines: web & mobile · backend · applied AI" },
];

export type Cover =
  | { kind: "photo"; src: string }
  | { kind: "logo"; src: string; bg: string }
  | { kind: "type"; bg: string; fg?: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  tags: string[];
  meta: string;
  blurb: string;
  href: string;
  cover: Cover;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "klok",
    title: "Klok AI",
    org: "Entelon",
    tags: ["AI", "Education"],
    meta: "AI · Education",
    blurb: "Reads students' handwritten exam answers and suggests marks step by step, while the teacher stays in charge of every grade.",
    href: "https://www.entelon.co/",
    cover: { kind: "logo", src: "/img/klok.png", bg: "#1b2a3a" },
    featured: true,
  },
  {
    slug: "heyrwanda",
    title: "HeyRwanda",
    org: "Entelon",
    tags: ["AI", "Fintech", "Mobile"],
    meta: "Travel · Payments",
    blurb: "A travel companion for Rwanda: choosing where to go, finding your way and paying along the trip.",
    href: "https://www.entelon.co/",
    cover: { kind: "logo", src: "/img/heyrwanda.svg", bg: "#e8e2d4" },
    featured: true,
  },
  {
    slug: "visko",
    title: "Visko",
    org: "Entelon",
    tags: ["AI", "Voice"],
    meta: "Voice · Field research",
    blurb: "Takes the paperwork out of field research. Teams talk through their existing questionnaires and answers flow straight to analysis.",
    href: "https://www.entelon.co/",
    cover: { kind: "logo", src: "/img/visko.svg", bg: "#dde5ee" },
    featured: true,
  },
  {
    slug: "phibram",
    title: "Phibram",
    org: "Entelon",
    tags: ["AI", "Voice"],
    meta: "Voice analytics",
    blurb: "Listens to every call and turns hotline conversations into a continuous picture of service quality.",
    href: "https://www.entelon.co/",
    cover: { kind: "type", bg: "linear-gradient(135deg,#2b1033,#5b1240)" },
    featured: true,
  },
  {
    slug: "mamora",
    title: "Mamora",
    org: "IWP Africa",
    tags: ["Health", "Voice"],
    meta: "Health · Voice reporting",
    blurb: "Voice-based symptom reporting so community health workers hear early and outbreaks are caught sooner.",
    href: "https://iwpafrica.org/projects",
    cover: { kind: "logo", src: "/img/logo.png", bg: "linear-gradient(135deg,#2f7f6b,#48a68c)" },
    featured: true,
  },
  {
    slug: "emi",
    title: "ECD Intelligence",
    org: "IWP Africa",
    tags: ["Health", "Education", "AI"],
    meta: "Early childhood",
    blurb: "Plain-language daily guidance for early-childhood centre managers, adapted weekly from simple health and development measurements.",
    href: "https://iwpafrica.org/projects",
    cover: { kind: "logo", src: "/img/logo.png", bg: "linear-gradient(135deg,#e2601a,#fdb022)" },
    featured: true,
  },
  {
    slug: "trace",
    title: "Trace",
    org: "IWP Africa",
    tags: ["Agriculture", "Web"],
    meta: "Agriculture · Marketplace",
    blurb: "A record book for farmers and a marketplace for buyers, with every product carrying its full history from the farm.",
    href: "https://iwpafrica.org/projects",
    cover: { kind: "logo", src: "/img/logo.png", bg: "linear-gradient(135deg,#032f57,#054d8a)" },
    featured: true,
  },
  {
    slug: "velo",
    title: "Velo",
    org: "Open source",
    tags: ["Fintech", "Mobile"],
    meta: "Fintech · NestJS",
    blurb: "Personal-finance app that extracts MTN & Airtel mobile-money transactions on-device, backed by a NestJS + Prisma API.",
    href: "https://github.com/mucyobertrand/velo-app-backend",
    cover: { kind: "type", bg: "linear-gradient(135deg,#0d2b22,#11634a)" },
  },
  {
    slug: "tap-and-pay",
    title: "Tap & Pay",
    org: "Open source",
    tags: ["IoT", "Fintech"],
    meta: "IoT · RFID · MQTT",
    blurb: "RFID cashless payments for cafeterias and events on ESP8266, with a live dashboard and cashier/admin panels.",
    href: "https://github.com/mucyobertrand/tap_and_pay",
    cover: { kind: "type", bg: "linear-gradient(135deg,#1c1c1c,#3a2a12)" },
  },
  {
    slug: "dent-wise",
    title: "Dent-Wise",
    org: "Open source",
    tags: ["Health", "Web"],
    meta: "Next.js 15 · Prisma",
    blurb: "Dental practice platform: appointment booking, patient records and doctor management with Clerk and PostgreSQL.",
    href: "https://github.com/mucyobertrand/dent-wise",
    cover: { kind: "type", bg: "linear-gradient(135deg,#0f2440,#1f4f8a)" },
  },
  {
    slug: "career-space",
    title: "Career Space",
    org: "Open source",
    tags: ["Mobile"],
    meta: "React Native · Expo",
    blurb: "Mobile career app with its own TypeScript backend, built end to end from data model to UI.",
    href: "https://github.com/mucyobertrand/career-space",
    cover: { kind: "type", bg: "linear-gradient(135deg,#2a1a0e,#7a3d12)" },
  },
  {
    slug: "vehicle-ml",
    title: "Vehicle ML Dashboard",
    org: "Open source",
    tags: ["AI", "Web"],
    meta: "Python · ML",
    blurb: "A machine-learning dashboard for exploring and predicting on vehicle data.",
    href: "https://github.com/mucyobertrand/vehicle_ml_dashboard",
    cover: { kind: "type", bg: "linear-gradient(135deg,#181a2e,#3b2f7a)" },
  },
];

export const workFilters = ["All", "AI", "Health", "Education", "Agriculture", "Voice", "Fintech", "IoT", "Web", "Mobile"];

export const services = [
  {
    title: "Web & mobile engineering",
    body: "Fast, accessible web apps in Next.js and React, and cross-platform mobile apps in React Native and Expo, from first screen to release.",
  },
  {
    title: "Backend engineering",
    body: "APIs and services in NestJS and Node.js on PostgreSQL with Prisma: auth, payments, mobile-money and SMS integrations, background jobs.",
  },
  {
    title: "Applied AI engineering",
    body: "Taking AI from demo to production: LLM and voice agents, document and handwriting understanding, retrieval over your data, evaluation.",
  },
  {
    title: "Product leadership",
    body: "From discovery to roadmap to launch. I decide what to build with the people who will use it, then keep the team shipping.",
  },
  {
    title: "Research & evidence",
    body: "Field research, community data systems and implementation science, so decisions come from data, not assumptions.",
  },
  {
    title: "IoT & hardware prototypes",
    body: "ESP8266, RFID and MQTT builds that connect physical devices to real-time dashboards.",
  },
];

export const stack = ["TypeScript", "React", "Next.js", "React Native", "Expo", "Tailwind", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Python", "LLMs", "Voice AI", "MQTT"];
export const domains = ["AI", "Health", "Education", "Agriculture", "Fintech"];
export const marqueeWords = ["Web", "Mobile", "Backend", "Applied AI", "Product", "Research"];

export const experience = [
  {
    role: "Product Lead",
    org: "Entelon",
    when: "Now",
    focus: "Applied AI products · Klok, HeyRwanda, Visko, Phibram",
    href: "https://www.entelon.co/",
  },
  {
    role: "Developer & Researcher",
    org: "IWP Africa",
    when: "Now",
    focus: "Full-stack & research · Mamora, EMI, Trace",
    href: "https://iwpafrica.org/",
  },
  {
    role: "Independent builder",
    org: "Open source",
    when: "2023 —",
    focus: "Web, mobile, backend & applied AI projects",
    href: "https://github.com/mucyobertrand",
  },
  {
    role: "Student · admitted on merit",
    org: "Rwanda Coding Academy",
    when: "2024 — 2027",
    focus: "Software engineering, embedded systems, cybersecurity & AI",
    href: "https://rca.ac.rw/",
  },
];

// Awards & selections, shown on the About page. Add hackathons, competitions, certificates here.
export const recognition = [
  {
    award: "Admitted on merit — national selection",
    project: "Africa's first coding-focused high school · 3-year programme",
    year: "2024",
    org: "Rwanda Coding Academy",
    href: "https://rca.ac.rw/admissions",
  },
];

export const entelon = {
  steps: [
    { title: "Analyse the workflow", body: "Find where AI can save time and boost efficiency." },
    { title: "Integrate the solution", body: "Connect AI tools into the systems teams already use." },
    { title: "Maintain & improve", body: "Keep it running smoothly and always up to date." },
  ],
  stats: [
    { value: "10M+", label: "Hours saved / year" },
    { value: "04", label: "AI products" },
    { value: "06", label: "Solution lines" },
  ],
};

export const about = {
  profile: [
    "I'm a web & mobile engineer, backend engineer and applied AI engineer based in Kigali. I lead product at Entelon and build community-first digital tools at IWP Africa.",
    "I work across the whole loop: sitting with teachers, health workers and farmers to understand the problem, shaping the product, writing the code, and measuring whether it actually helped.",
    "I'm also a student at Rwanda Coding Academy, Africa's first coding-focused high school, where I was admitted through a competitive, merit-based national selection.",
  ],
  mission:
    "My mission is to build technology that the people closest to the problem actually want to use, and to prove it works with evidence, not assumptions.",
  tldr: [
    { k: "Core skills", v: "Web & Mobile Engineering · Backend Engineering · Applied AI Engineering" },
    { k: "Education", v: "Rwanda Coding Academy, 2024 – 2027 · admitted through competitive national selection" },
    { k: "Roles", v: "Product Lead at Entelon · Developer & Researcher at IWP Africa" },
    { k: "Based in", v: "Kigali, Rwanda" },
    { k: "Stack", v: "TypeScript, React, Next.js, React Native, Expo, Node.js, NestJS, PostgreSQL, Prisma, Python, LLMs, voice AI" },
    { k: "Domains", v: "AI, health, education, agriculture, fintech" },
    { k: "Approach", v: "Listen · Build · Measure · Improve" },
  ],
  approach: [
    { title: "Listen", body: "Start with what communities and users already know. Interviews, field visits, existing paperwork." },
    { title: "Build", body: "Ship the smallest useful thing quickly, in the tools people already use: voice, mobile, WhatsApp." },
    { title: "Measure", body: "Instrument everything. Usage, outcomes and the stories behind the numbers." },
    { title: "Improve", body: "Evidence feeds back into the roadmap, partnerships and policy." },
  ],
};

export const contactLinks = [
  { label: "GitHub", href: "https://github.com/mucyobertrand" },
  { label: "Entelon", href: "https://www.entelon.co/" },
  { label: "IWP Africa", href: "https://iwpafrica.org/" },
];
