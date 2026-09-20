// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  type: string;
  description: string;
  caseStudy: string;
  stack: string[];
  color: string;
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  useIframe?: boolean;
}

// ─── About Data ───────────────────────────────────────────────────────────────

// ─── About Data ───────────────────────────────────────────────────────────────

export const aboutData = {
  name: "Raj Ponkiya",
  title: "Associate AI Developer",
  location: "Ahmedabad, Gujarat, India",
  githubUrl: "https://github.com/ponkiyaraj7-alt",
  linkedinUrl: "https://www.linkedin.com/in/raj-ponkiya/",
  email: "ponkiyaraj7@gmail.com",
  university: "",
  tagline: "I build AI-powered systems that turn repetitive business processes into intelligent, automated workflows.",
  bio: "Associate AI Developer working at the intersection of AI, software engineering, and business process automation. I engineer usable systems that connect language models and autonomous agents with real-world business tools.",
  bioExtended:
    "I work at the convergence of Artificial Intelligence, software engineering, and process automation. Rather than treating AI as an isolated chatbot or speculative experiment, I integrate LLMs, autonomous agents, and RAG pipelines directly into production software. From ingesting messy business data to orchestrating multi-step agent actions and external API tool calls, my focus is delivering reliable, automated workflows that eliminate manual friction.",
  techArsenal: [
    { name: "Python", icon: "Code" },
    { name: "FastAPI", icon: "Zap" },
    { name: "LangChain", icon: "Link" },
    { name: "LangGraph", icon: "GitBranch" },
    { name: "OpenAI / Claude", icon: "Bot" },
    { name: "TypeScript", icon: "FileCode" },
    { name: "Next.js", icon: "Globe" },
    { name: "PostgreSQL / pgvector", icon: "Database" },
    { name: "Docker", icon: "Box" },
    { name: "Redis", icon: "Cpu" },
  ],
  interests: [
    {
      title: "Agentic Workflows",
      icon: "Bot",
      description: "Designing autonomous multi-step agents that reason, call external tools, and verify outputs",
      color: "#10B981",
    },
    {
      title: "Business Process Automation",
      icon: "Workflow",
      description: "Mapping manual operational bottlenecks and replacing them with connected AI workflows",
      color: "#8B5CF6",
    },
    {
      title: "RAG & Vector Retrieval",
      icon: "Database",
      description: "Connecting language models to structured and unstructured business data with cited retrieval",
      color: "#F59E0B",
    },
  ],
  beyondTheCode:
    "When I'm not writing agent graphs or backend integrations, I evaluate open-source model weights, read LLM reasoning literature, and build tooling for workflow reliability.",
  philosophy:
    "Business Problem → Understand the Process → Identify Repetitive Work → Apply AI / LLM / Agents → Connect to Tools & APIs → Automate the Workflow → Create a Measurable Outcome.",
  experience: [
    {
      role: "Associate AI Developer",
      period: "Present",
      description: "Building production LLM applications, agentic workflows, and automated operational pipelines."
    }
  ],
};

// ─── Skills / Stack Data ──────────────────────────────────────────────────────

export type SkillCategory = "AI & LLMs" | "Backend" | "Frontend" | "Data & Infra";
export type SkillCell = "rag" | "phone" | "next" | "neural" | "ts" | "chip";
export type SkillBadge = "new" | "core" | "shipping";

export interface Skill {
  name: string;
  level: number;
  years: string;
  tag: string;            // primary project this powered
  projects?: string[];    // every project this skill powered (for cross-links)
  color: string;
  category: SkillCategory;
  role: string;
  hero?: boolean;
  cell?: SkillCell;       // which renderer the bento should use
  badge?: SkillBadge;     // small ribbon on the cell
  trend?: number[];       // 6 numbers 0–100, drives a sparkline on hover
}

export const SKILLS: Skill[] = [
  // ── Hero showpieces (live demo cells) ─────────────────────────────────────
  { name: "Generative AI",  level: 92, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio", "CloudPulse"], color: "#A855F7", category: "AI & LLMs",    role: "LLM & agent engineering",      hero: true, cell: "rag",    badge: "core",     trend: [40,55,62,71,84,92] },
  { name: "FastAPI",        level: 88, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "CloudPulse"],                  color: "#009688", category: "Backend",      role: "High-throughput Python APIs",  hero: true, cell: "phone",  badge: "shipping", trend: [70,78,85,90,93,95] },
  { name: "Next.js",        level: 92, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio", "AI Platform"],color: "#E2E8F0", category: "Frontend",     role: "Full-stack web architecture",  hero: true, cell: "next",   badge: "core",     trend: [60,70,78,85,90,92] },
  { name: "OpenAI",         level: 90, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#10A37F", category: "AI & LLMs",    role: "Model prompting & tools",      hero: true, cell: "neural", badge: "shipping", trend: [50,62,72,82,88,90] },
  { name: "TypeScript",     level: 88, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio"],             color: "#3178C6", category: "Frontend",     role: "Type-safe system design",      hero: true, cell: "ts",     badge: "core",     trend: [55,66,74,80,85,88] },

  // ── Primary chips (always visible) ────────────────────────────────────────
  { name: "Python",         level: 90, years: "3 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#3776AB", category: "Backend",      role: "Core automation language"                                              },
  { name: "LangGraph",      level: 84, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#1C7E5F", category: "AI & LLMs",    role: "Multi-agent graph flows",      badge: "new"                             },
  { name: "LangChain",      level: 86, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform"],                               color: "#3ECFCF", category: "AI & LLMs",    role: "Chain & tool orchestration"                                             },
  { name: "RAG",            level: 88, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#F97316", category: "AI & LLMs",    role: "Vector retrieval systems",     badge: "shipping"                        },
  { name: "Vercel AI SDK",  level: 82, years: "1 yr",  tag: "Commerce Hub",      projects: ["Commerce Hub"],                              color: "#0EA5E9", category: "Frontend",     role: "Streaming UI & chat endpoints",badge: "new"                             },
  { name: "PostgreSQL",     level: 80, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#4169E1", category: "Data & Infra", role: "Relational persistence"                                                },

  // ── Extended arsenal (collapsible) ────────────────────────────────────────
  { name: "pgvector",       level: 80, years: "1 yr",  tag: "ContentStudio",     projects: ["ContentStudio", "AI Platform"],              color: "#4169E1", category: "Data & Infra", role: "Vector similarity search",     badge: "new"                             },
  { name: "Pinecone",       level: 82, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#0BA5A4", category: "Data & Infra", role: "Managed vector indexing"                                                },
  { name: "Claude",         level: 86, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#D97706", category: "AI & LLMs",    role: "Reasoning & tool calling",     badge: "new"                             },
  { name: "Whisper",        level: 84, years: "1 yr",  tag: "CloudPulse",        projects: ["CloudPulse"],                                color: "#6F1FFF", category: "AI & LLMs",    role: "Audio speech-to-text"                                                   },
  { name: "Docker",         level: 78, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform"],                               color: "#2496ED", category: "Data & Infra", role: "Containerized environments"                                            },
  { name: "Redis",          level: 76, years: "2 yrs", tag: "ContentStudio",     projects: ["ContentStudio"],                             color: "#DC382D", category: "Data & Infra", role: "Job queue & caching"                                                   },
  { name: "Node.js",        level: 82, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio"],             color: "#339933", category: "Backend",      role: "Event-driven runtime"                                                  },
  { name: "React",          level: 88, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio"],             color: "#61DAFB", category: "Frontend",     role: "Interface component tree"                                               },
];

export const MARQUEE_TECH = [
  "Python", "FastAPI", "LangChain", "LangGraph", "OpenAI API", "Claude",
  "RAG Systems", "pgvector", "Pinecone", "Webhooks", "REST APIs",
  "Next.js", "TypeScript", "Tailwind CSS", "Redis", "Docker",
  "PostgreSQL", "Vercel AI SDK", "Prompt Engineering", "Tool Calling",
  "Process Automation", "Stream Ingestion", "Whisper", "CI/CD",
];


// ─── Website & Product Projects ──────────────────────────────────────────────

export const websiteProjects: Project[] = [
  {
    id: "ai-platform",
    name: "AI Knowledge Platform",
    tagline: "Automated Document Analysis & Knowledge Retrieval",
    type: "AI SaaS & Workflow System",
    description:
      "A document intelligence platform that automates document extraction, semantic chunking, and contextual question-answering with verifiable citations.",
    caseStudy: `PROBLEM: Knowledge workers spent hours manually reviewing lengthy operational manuals, invoices, and contracts to extract key data points.

SOLUTION: Engineered an automated retrieval pipeline with a Next.js interface that ingests unstructured files, generates dense vector embeddings, and enables natural language inquiry.

AI COMPONENT: OpenAI embeddings paired with structured LLM reasoning for multi-document synthesis and verified source citing.

AUTOMATION: Automatic PDF/DOCX parsing on upload, text chunking, embedding generation, and automated vector store re-indexing without human intervention.

TECHNOLOGY: Python, FastAPI, LangChain, PostgreSQL, pgvector, Next.js, TypeScript.

OUTCOME: Reduced manual document lookup time to seconds, replacing manual search with verifiable, cited AI extraction.`,
    stack: ["Python", "FastAPI", "LangChain", "pgvector", "Next.js", "TypeScript"],
    color: "#0EA5E9",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "content-studio",
    name: "ContentStudio Workflow",
    tagline: "Automated Digital Asset Pipeline",
    type: "Intelligent SaaS Platform",
    description:
      "A media asset automation platform that standardizes asset preparation, background job queuing, and automated metadata indexing.",
    caseStudy: `PROBLEM: Digital teams faced high error rates and bottlenecks when manually formatting, labeling, and tagging hundreds of media assets every week.

SOLUTION: Developed an asset processing platform with automated background queue workers and real-time state synchronization.

AI COMPONENT: Vision and text LLM integration to automatically generate relevant tags, clean metadata summaries, and categorize media.

AUTOMATION: File upload triggers background queue jobs via Redis, performs automated validation, indexes metadata, and broadcasts progress via WebSockets.

TECHNOLOGY: Next.js, Node.js, Redis, Bull Queue, Tailwind CSS, PostgreSQL.

OUTCOME: Replaced manual file tagging with automated background processing pipelines.`,
    stack: ["Next.js", "TypeScript", "Node.js", "Redis", "PostgreSQL"],
    color: "#EC4899",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "commerce-hub",
    name: "Commerce Hub Automation",
    tagline: "High-Performance Modern Storefront",
    type: "E-Commerce System",
    description:
      "An automated headless commerce storefront engineered with real-time stock sync, webhook-driven order fulfillment, and checkout flows.",
    caseStudy: `PROBLEM: Traditional storefronts suffered from sluggish page transitions, manual inventory adjustments, and dropped customer checkouts.

SOLUTION: Built a headless storefront leveraging server components, instant search queries, and programmatic webhook handlers.

AI COMPONENT: Smart search indexing and semantic product recommendations to match customer intent with product catalog entries.

AUTOMATION: Automated inventory status sync, webhook-driven payment confirmations via Stripe, and dynamic order tracking.

TECHNOLOGY: Next.js App Router, TypeScript, Tailwind CSS, Stripe, Vercel.

OUTCOME: Streamlined the purchase pipeline from discovery to payment fulfillment with zero manual order intervention.`,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Vercel"],
    color: "#C4A265",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "artisan-bakery",
    name: "Order Automation System",
    tagline: "Menu Scheduling & Automated Ordering",
    type: "Web Application",
    description:
      "A digital ordering platform with automated slot reservation, scheduled inventory windows, and real-time order routing.",
    caseStudy: `PROBLEM: Local food businesses relied on manual phone and chat orders, leading to order mix-ups, double bookings, and stock miscalculations.

SOLUTION: Built an interactive web app with structured menu slots, dynamic validation, and instant confirmation routing.

AI COMPONENT: Automated natural language query handling for order inquiries and dietary preferences.

AUTOMATION: Automated availability tracking, dynamic order slot locks, and instant notification dispatches upon order submission.

TECHNOLOGY: React, Node.js, Express, MongoDB, Tailwind CSS.

OUTCOME: Transitioned manual phone-based ordering into a structured, automated self-service system.`,
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    color: "#D97706",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
];

// ─── App Projects ─────────────────────────────────────────────────────────────

export const appProjects: Project[] = [
  {
    id: "cloud-pulse",
    name: "CloudPulse Monitor",
    tagline: "Real-Time Systems Telemetry & Alerting",
    type: "Telemetry & Automated Alerting",
    description:
      "A systems monitoring utility providing real-time telemetry streaming, automated threshold alerts, and centralized health tracking.",
    caseStudy: `PROBLEM: Engineering operations lacked an immediate, consolidated view of microservice uptime, requiring manual dashboard inspections.

SOLUTION: Built a multi-service monitoring app with real-time data streaming, offline caching, and rule-based incident alerts.

AI COMPONENT: Automated anomaly detection heuristic on inbound latency metrics to flag abnormal spikes before service disruption.

AUTOMATION: Background event listeners trigger automated push alerts when thresholds are breached, routing incidents automatically.

TECHNOLOGY: Flutter, Dart, Firebase, REST APIs, TypeScript.

OUTCOME: Automated infrastructure health tracking with zero manual polling.`,
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "TypeScript"],
    color: "#8B5CF6",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
];

// ─── Unified Projects (Home Showcase) ────────────────────────────────────────

export const allProjects: Project[] = [
  websiteProjects[0],  // AI Knowledge Platform
  websiteProjects[1],  // ContentStudio Workflow
  websiteProjects[2],  // Commerce Hub Automation
  appProjects[0],      // CloudPulse Monitor
  websiteProjects[3],  // Order Automation System
];

// ─── Phase 2 Architectural Data Exports ─────────────────────────────────────
export * from "./workflow";
export * from "./capabilities";
export * from "./experience";
export * from "./playground";
export * from "./projects";
export * from "./stack";
export * from "./capabilityMatrix";

