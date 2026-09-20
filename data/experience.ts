export interface ExperienceItem {
  role: string;
  company: string; // TODO — VERIFY: Company name not confirmed
  focus: string;
  period: string;
  startDate: string; // TODO — VERIFY: Start date not confirmed
  type: string;
  location: string;
  whatIWorkOn: string;
  responsibilities: string[];
  aiAutomationWork: string[];
  technologies: string[];
  relatedCapabilities: string[];   // Capability IDs from data/capabilities.ts
  relatedProjects: string[];       // Project IDs from data/projects.ts
}

export interface ProfessionalEvolutionStage {
  stage: string;
  label: string;
  description: string;
  active: boolean;
}

export interface CurrentFocusArea {
  id: string;
  label: string;
  description: string;
}

export interface ThinkingStep {
  number: string;
  action: string;
  question: string;
}

// ─── Experience ───────────────────────────────────────────────────────────────

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Associate AI Developer",
    company: "TODO — VERIFY", // Company name not confirmed in portfolio data
    focus: "AI Systems & Automation Engineering",
    period: "Present",
    startDate: "TODO — VERIFY", // Start date not confirmed
    type: "Engineering Practice",
    location: "Ahmedabad, Gujarat, India",
    whatIWorkOn:
      "Designing and deploying end-to-end intelligent systems that bridge foundational AI models with business databases, APIs, and operational software.",
    responsibilities: [
      "Architecting multi-step agentic workflows using LangGraph and LangChain for autonomous task execution.",
      "Building high-throughput FastAPI and Python backend services to ingest, chunk, and embed business data.",
      "Developing production RAG pipelines with pgvector and Pinecone for contextual question-answering with citations.",
      "Engineering full-stack Next.js interfaces with streaming LLM responses and real-time state synchronization.",
    ],
    aiAutomationWork: [
      "Automated document processing pipelines converting unstructured PDFs into normalized vector indexes.",
      "Agent tool-calling integrations connecting language models to external REST APIs and database mutations.",
      "Background job queues with Redis for asynchronous task processing and fault-tolerant retries.",
      "Prompt engineering and schema enforcement pipelines ensuring deterministic JSON outputs for production systems.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "pgvector",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    relatedCapabilities: [
      "ai-automation",
      "llm-applications",
      "ai-agents",
      "rag-systems",
      "fullstack-ai",
      "process-automation",
    ],
    relatedProjects: [],
  },
];

// ─── Professional Evolution ────────────────────────────────────────────────────
// Only stages supported by verified background information.
// No stages invented.

export const PROFESSIONAL_EVOLUTION: ProfessionalEvolutionStage[] = [
  {
    stage: "01",
    label: "Web Development",
    description: "Building web interfaces, layouts, and interactive UI components.",
    active: false,
  },
  {
    stage: "02",
    label: "Full-Stack Development",
    description: "Connecting frontends to backend services, APIs, and databases.",
    active: false,
  },
  {
    stage: "03",
    label: "AI Applications",
    description: "Integrating language models into application workflows.",
    active: false,
  },
  {
    stage: "04",
    label: "Automation",
    description: "Building event-driven pipelines and background job systems.",
    active: false,
  },
  {
    stage: "05",
    label: "LLM Systems",
    description: "Designing production-grade LLM pipelines with structured outputs and RAG.",
    active: false,
  },
  {
    stage: "06",
    label: "AI Agents",
    description: "Engineering multi-step autonomous agents with tool calling and state machines.",
    active: false,
  },
  {
    stage: "07",
    label: "AI System Engineering",
    description: "Architecting full-stack intelligent systems from data ingestion to user interface.",
    active: true,
  },
];

// ─── Current Focus ─────────────────────────────────────────────────────────────
// Only areas accurately representing current work, based on verified data.

export const CURRENT_FOCUS: CurrentFocusArea[] = [
  {
    id: "agentic-systems",
    label: "Agentic Systems",
    description: "Building autonomous multi-step agents that reason, plan, and execute across tools.",
  },
  {
    id: "rag",
    label: "RAG Architectures",
    description: "Connecting LLMs to private business data with verified, cited retrieval.",
  },
  {
    id: "llm-applications",
    label: "LLM Applications",
    description: "Production applications powered by frontier language models with deterministic outputs.",
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    description: "Replacing manual operational processes with intelligent, self-adapting workflows.",
  },
  {
    id: "fullstack-ai",
    label: "Full-Stack AI Systems",
    description: "End-to-end applications spanning reactive UIs to distributed AI backends.",
  },
];

// ─── Thinking Framework ────────────────────────────────────────────────────────

export const THINKING_STEPS: ThinkingStep[] = [
  {
    number: "01",
    action: "UNDERSTAND",
    question: "What problem are we actually solving?",
  },
  {
    number: "02",
    action: "DECOMPOSE",
    question: "Where does the manual work happen?",
  },
  {
    number: "03",
    action: "IDENTIFY",
    question: "Where can AI genuinely add value?",
  },
  {
    number: "04",
    action: "INTEGRATE",
    question: "How does AI connect to existing systems and tools?",
  },
  {
    number: "05",
    action: "VALIDATE",
    question: "Does the system actually solve the problem?",
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const EDUCATION = {
  institution: "TODO — VERIFY",
  program: "TODO — VERIFY",
  period: "TODO — VERIFY",
};

// ─── Certifications ───────────────────────────────────────────────────────────
// No certifications currently confirmed. Placeholder structure ready.
// Status: "completed" | "in-progress"

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
  status: "completed" | "in-progress";
  credentialUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  // TODO — VERIFY: No certifications confirmed in portfolio data.
  // Add verified entries here when available.
];
