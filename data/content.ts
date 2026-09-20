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
// Ready for real project case studies
export const websiteProjects: Project[] = [];

// ─── App Projects ─────────────────────────────────────────────────────────────
export const appProjects: Project[] = [];

// ─── Unified Projects (Home Showcase) ────────────────────────────────────────
export const allProjects: Project[] = [];

// ─── Phase 2 Architectural Data Exports ─────────────────────────────────────
export * from "./workflow";
export * from "./capabilities";
export * from "./experience";
export * from "./playground";
export * from "./projects";
export * from "./stack";
export * from "./capabilityMatrix";

