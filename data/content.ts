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

export const aboutData = {
  name: "Raj Ponkiya",
  title: "Associate AI Developer",
  location: "Ahmedabad, Gujarat, India",
  githubUrl: "https://github.com/ponkiyaraj7-alt",
  linkedinUrl: "https://www.linkedin.com/in/raj-ponkiya/",
  email: "ponkiyaraj7@gmail.com",
  university: "",
  bio: "Associate AI Developer specializing in AI development, AI automation, LLM-based solutions, AI agents, and workflow automation.",
  bioExtended:
    "I build practical AI-powered systems and intelligent automation solutions. Focusing on turning manual business processes into automated workflows, my work spans LLM solutions, autonomous AI agents, retrieval-augmented generation (RAG), and end-to-end intelligent architectures.",
  techArsenal: [
    { name: "Python", icon: "🐍" },
    { name: "FastAPI", icon: "⚡" },
    { name: "LangChain", icon: "🦜" },
    { name: "LangGraph", icon: "🕸️" },
    { name: "OpenAI / Claude", icon: "🤖" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Next.js", icon: "▲" },
    { name: "PostgreSQL / pgvector", icon: "🐘" },
    { name: "Docker", icon: "🐳" },
    { name: "Redis", icon: "🔴" },
  ],
  interests: [
    {
      title: "AI Agents & Autonomy",
      emoji: "🤖",
      description: "Architecting multi-agent systems and task-oriented agent workflows",
      color: "#10B981",
    },
    {
      title: "Workflow Automation",
      emoji: "⚙️",
      description: "Converting manual business processes into intelligent automated systems",
      color: "#8B5CF6",
    },
    {
      title: "RAG & Knowledge Engines",
      emoji: "🧠",
      description: "Building production RAG pipelines with semantic indexing and citations",
      color: "#F59E0B",
    },
  ],
  beyondTheCode:
    "When I'm not designing AI agents and automation pipelines, I explore emerging research papers, test new open-weight LLM models, and build experimental automation tooling.",
  philosophy:
    "I believe the greatest value of AI comes from practical implementation: eliminating repetitive busywork, augmenting human decision-making, and transforming complex data into streamlined action.",
  experience: [
    {
      role: "Associate AI Developer",
      period: "Present",
      description: "Developing LLM-powered applications, AI agents, and automated workflow pipelines."
    }
  ],
};

// ─── Skills / Stack Data ──────────────────────────────────────────────────────

export type SkillCategory = "Web" | "AI & GenAI" | "Mobile" | "Infra" | "DesignOps";
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
  { name: "Generative AI",  level: 92, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio", "CloudPulse"], color: "#A855F7", category: "AI & GenAI", role: "RAG + agent architecture",     hero: true, cell: "rag",    badge: "core",     trend: [40,55,62,71,84,92] },
  { name: "Flutter",        level: 90, years: "3 yrs", tag: "MobileSuite",       projects: ["MobileSuite"],                               color: "#027DFD", category: "Mobile",     role: "Cross-platform mobile",        hero: true, cell: "phone",  badge: "shipping", trend: [70,78,85,90,93,95] },
  { name: "Next.js",        level: 92, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "Artisan Bakery"],            color: "#E2E8F0", category: "Web",        role: "Full-stack React framework",   hero: true, cell: "next",   badge: "core",     trend: [60,70,78,85,90,92] },
  { name: "OpenAI",         level: 90, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#10A37F", category: "AI & GenAI", role: "LLM integration",              hero: true, cell: "neural", badge: "shipping", trend: [50,62,72,82,88,90] },
  { name: "TypeScript",     level: 88, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio"],             color: "#3178C6", category: "Web",        role: "Type-safe everything",         hero: true, cell: "ts",     badge: "core",     trend: [55,66,74,80,85,88] },

  // ── Primary chips (always visible) ────────────────────────────────────────
  { name: "React",          level: 90, years: "4 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "ContentStudio"],             color: "#61DAFB", category: "Web",        role: "UI component layer",                                                  trend: [60,70,78,85,88,90] },
  { name: "Python",         level: 85, years: "3 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#3776AB", category: "AI & GenAI", role: "AI & backend scripting"                                              },
  { name: "Node.js",        level: 84, years: "3 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub", "Artisan Bakery"],            color: "#339933", category: "Web",        role: "Server-side runtime"                                                  },
  { name: "Firebase",       level: 85, years: "3 yrs", tag: "CloudPulse",        projects: ["CloudPulse"],                                color: "#FFCA28", category: "Infra",      role: "Realtime backend"                                                     },
  { name: "RAG",            level: 88, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#F97316", category: "AI & GenAI", role: "Retrieval-augmented gen.",   badge: "shipping"                        },
  { name: "Vercel AI SDK",  level: 82, years: "1 yr",  tag: "Commerce Hub",      projects: ["Commerce Hub"],                              color: "#0EA5E9", category: "AI & GenAI", role: "Streaming UI for LLMs",      badge: "new"                             },

  // ── Extended arsenal (collapsible) ────────────────────────────────────────
  { name: "LangGraph",      level: 78, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#1C7E5F", category: "AI & GenAI", role: "Multi-agent orchestration",  badge: "new"                             },
  { name: "LangChain",      level: 80, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#3ECFCF", category: "AI & GenAI", role: "LLM tooling framework"                                                },
  { name: "LlamaIndex",     level: 76, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#FFB800", category: "AI & GenAI", role: "Document indexing",          badge: "new"                             },
  { name: "Pinecone",       level: 80, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#0BA5A4", category: "AI & GenAI", role: "Vector database"                                                      },
  { name: "pgvector",       level: 78, years: "1 yr",  tag: "ContentStudio",     projects: ["ContentStudio"],                             color: "#4169E1", category: "Infra",      role: "Postgres vector search",     badge: "new"                             },
  { name: "Claude",         level: 86, years: "1 yr",  tag: "AI Platform",       projects: ["AI Platform"],                               color: "#D97706", category: "AI & GenAI", role: "Long-context reasoning",     badge: "new"                             },
  { name: "Gemini",         level: 76, years: "1 yr",  tag: "ContentStudio",     projects: ["ContentStudio"],                             color: "#4285F4", category: "AI & GenAI", role: "Multimodal LLM",             badge: "new"                             },
  { name: "MCP",            level: 72, years: "<1 yr", tag: "AI Platform",       projects: ["AI Platform"],                               color: "#FF6B6B", category: "AI & GenAI", role: "Model Context Protocol",     badge: "new"                             },
  { name: "Whisper",        level: 84, years: "1 yr",  tag: "CloudPulse",        projects: ["CloudPulse"],                                color: "#6F1FFF", category: "AI & GenAI", role: "Speech transcription"                                                 },
  { name: "FastAPI",        level: 82, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform"],                               color: "#009688", category: "AI & GenAI", role: "High-perf Python API"                                                 },
  { name: "Cursor",         level: 90, years: "1 yr",  tag: "Workflow",          projects: ["Workflow"],                                 color: "#7C3AED", category: "DesignOps",  role: "AI-pair-programming",        badge: "shipping"                        },
  { name: "Dart",           level: 90, years: "3 yrs", tag: "MobileSuite",       projects: ["MobileSuite"],                               color: "#0175C2", category: "Mobile",     role: "Cross-platform development"                                           },
  { name: "Supabase",       level: 80, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform"],                               color: "#3ECF8E", category: "Infra",      role: "Open-source BaaS"                                                     },
  { name: "MongoDB",        level: 80, years: "3 yrs", tag: "Artisan Bakery",    projects: ["Artisan Bakery"],                            color: "#47A248", category: "Infra",      role: "Document database"                                                    },
  { name: "PostgreSQL",     level: 76, years: "2 yrs", tag: "AI Platform",       projects: ["AI Platform", "ContentStudio"],              color: "#4169E1", category: "Infra",      role: "Relational database"                                                  },
  { name: "AWS",            level: 74, years: "2 yrs", tag: "ContentStudio",     projects: ["ContentStudio"],                             color: "#FF9900", category: "Infra",      role: "Cloud infrastructure"                                                 },
  { name: "Redis",          level: 72, years: "1 yr",  tag: "ContentStudio",     projects: ["ContentStudio"],                             color: "#DC382D", category: "Infra",      role: "In-memory cache"                                                      },
  { name: "Stripe",         level: 78, years: "2 yrs", tag: "Commerce Hub",      projects: ["Commerce Hub"],                              color: "#635BFF", category: "Infra",      role: "Payment infrastructure"                                               },
];

export const MARQUEE_TECH = [
  "Shopify API", "Vercel", "Netlify", "Cloudinary", "WebSocket",
  "Bull Queue", "FFmpeg", "Riverpod", "NextAuth", "Tailwind CSS",
  "GSAP", "Framer Motion", "REST APIs", "GraphQL", "Docker",
  "Git", "CI/CD", "Figma", "Lenis", "Resend",
  "Drizzle", "Zod", "tRPC", "Bun", "Hono",
  "Anthropic", "pnpm", "Turborepo", "Playwright", "Upstash",
];


// ─── Website Projects ─────────────────────────────────────────────────────────

export const websiteProjects: Project[] = [
  {
    id: "commerce-hub",
    name: "Commerce Hub",
    tagline: "Modern E-Commerce Storefront",
    type: "E-Commerce Platform",
    description:
      "A high-performance modern e-commerce storefront designed for seamless navigation, lightning-fast product loading, and an optimized checkout experience.",
    caseStudy: `Commerce Hub was built to explore ultra-fast client and server transitions for digital storefronts. 

Key architectural highlights include Next.js App Router for dynamic routing and caching, headless inventory management, and zero-latency instant search queries. The single-page checkout flow minimizes drop-offs while offering real-time stock validation and sleek visual feedback.`,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Vercel"],
    color: "#C4A265",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "content-studio",
    name: "ContentStudio",
    tagline: "Automated Digital Media Studio",
    type: "Creative SaaS Platform",
    description:
      "A web application designed for modern digital creators to streamline asset workflows, media processing, and visual asset exports.",
    caseStudy: `ContentStudio addresses friction in media production. By pairing Next.js with background processing queues, the application provides creators with immediate browser previews and reliable file exports.

WebSocket updates inform users of task status in real time. The minimalist design system guarantees effortless usage across all screen sizes.`,
    stack: ["Next.js", "TypeScript", "Node.js", "Redis", "Tailwind CSS"],
    color: "#EC4899",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "ai-platform",
    name: "AI Platform",
    tagline: "Intelligent Document Analysis",
    type: "SaaS Platform",
    description:
      "An automated platform that extracts, structures, and synthesizes key insights from documents with high accuracy.",
    caseStudy: `AI Platform demonstrates retrieval-augmented workflows with an intuitive user interface. 

The architecture pairs a Next.js frontend with robust API pipelines. Documents are indexed and queried with contextual templates, returning citations and clean summaries in seconds.`,
    stack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    color: "#0EA5E9",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "artisan-bakery",
    name: "Artisan Bakery",
    tagline: "Local Delights, Digital Ordering",
    type: "Food & Beverage Web App",
    description:
      "A warm, inviting web app featuring menu browsing, order scheduling, and smooth interactive menus.",
    caseStudy: `Artisan Bakery brings neighborhood storefront charm into an intuitive digital experience.

The ordering flow supports pickup and delivery with real-time slot availability, interactive item customization, and a responsive mobile layout.`,
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
    name: "CloudPulse",
    tagline: "Real-Time Systems Monitor",
    type: "Mobile & Cloud Utility",
    description:
      "A cross-platform mobile application providing real-time system metrics, automated alert triggers, and clean data visualizations.",
    caseStudy: `CloudPulse provides engineering teams with instant visibility into deployment health and cloud services.

Built with Flutter for smooth 60fps animations across mobile platforms, it connects to real-time streams with offline cache persistence and customizable push notifications.`,
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "REST APIs",
      "TypeScript",
    ],
    color: "#8B5CF6",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
];

// ─── Unified Projects (Home Showcase) ────────────────────────────────────────

export const allProjects: Project[] = [
  appProjects[0],      // CloudPulse
  websiteProjects[0],  // Commerce Hub
  websiteProjects[2],  // AI Platform
  websiteProjects[3],  // Artisan Bakery
  websiteProjects[1],  // ContentStudio
];
