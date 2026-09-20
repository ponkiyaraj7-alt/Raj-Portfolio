// ─── Phase 5 — Authoritative Project Data ─────────────────────────────────
// Single source of truth for all project case studies.
// DO NOT fabricate: links, clients, metrics, or architecture that didn't exist.

export type ProjectTier = 1 | 2 | 3;
export type ProjectCategory =
  | "AI & Automation"
  | "AI SaaS"
  | "Full-Stack AI"
  | "Business Automation"
  | "Voice AI";

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  tech?: string;
  role: string;
  isAI?: boolean;
  isAccent?: boolean; // highlight in blue
}

export interface TechGroup {
  label: string;
  items: string[];
}

export interface CaseStudyProject {
  id: string;
  index: number;           // display order (1-indexed)
  tier: ProjectTier;
  name: string;
  tagline: string;
  category: ProjectCategory;
  badge: string;
  color: string;
  imageUrl: string;
  role: string;
  status: string;

  // Content sections
  problem: string;
  solution: string;
  aiComponents: string[];  // bullet list of AI capabilities used
  automationFlow: string;  // narrative paragraph
  outcome: string;         // qualitative only — no fabricated numbers

  // Architecture diagram
  architecture: ArchNode[];

  // Tech stack grouped
  techStack: TechGroup[];

  // Links — only shown if != "#"
  liveUrl: string;
  githubUrl: string;
}

export const CASE_STUDY_PROJECTS: CaseStudyProject[] = [
  // ── TIER 1: AI Knowledge Platform ─────────────────────────────────────────
  {
    id: "ai-knowledge-platform",
    index: 1,
    tier: 1,
    name: "AI Knowledge Platform",
    tagline: "Automated Document Analysis & Contextual Retrieval",
    category: "AI & Automation",
    badge: "TIER 1 · Featured System",
    color: "#0ea5e9",
    imageUrl: "/Dashboard.webp",
    role: "Full-Stack AI Engineering",
    status: "Built",

    problem:
      "Knowledge workers spent hours manually reviewing lengthy operational manuals, contracts, and invoices to extract key data points — leading to workflow delays and lookup fatigue. Finding a specific clause inside a 200-page document required a human reading every page.",

    solution:
      "Built an automated document intelligence platform featuring an ingestion engine, dense vector indexing via pgvector, and a full-stack Next.js interface for natural language document inquiry. Users upload documents and ask questions in natural language — the system finds and returns verified, cited answers.",

    aiComponents: [
      "OpenAI Embeddings — converts document chunks into vector representations for semantic search",
      "LLM Reasoning (OpenAI) — structured extraction and multi-document synthesis",
      "RAG Pipeline — retrieves top-k semantically similar chunks, injects context into LLM prompt",
      "Source citation engine — verifies and attaches document source references to every response",
      "LangChain — orchestrates ingestion chain, embedding pipeline, and retrieval chain",
    ],

    automationFlow:
      "When a document is uploaded, the backend automatically parses it (PDF/DOCX), splits it into overlapping text chunks, generates vector embeddings for each chunk, and writes them into the pgvector index — without any human intervention. When a user submits a question, the system performs a cosine similarity search over the vector index, retrieves the top-k relevant chunks, injects them as context into an LLM prompt, and returns a structured, cited answer in real time.",

    outcome:
      "Reduced manual document lookup time from hours to seconds. Replaced exhaustive manual reading with verified, cited AI extraction. The pipeline handles multiple document types and re-indexes automatically on upload.",

    architecture: [
      { id: "user",    label: "User",           role: "Uploads document / asks question",     sublabel: "Browser Interface" },
      { id: "ui",      label: "Next.js UI",      role: "File upload + natural language Q&A",  sublabel: "TypeScript · React",          isAccent: true },
      { id: "api",     label: "FastAPI Backend", role: "Orchestrates ingestion & query flow",  sublabel: "Python · REST API" },
      { id: "parse",   label: "Document Parser", role: "PDF/DOCX parsing + chunking",         sublabel: "LangChain · Python" },
      { id: "embed",   label: "Embeddings",      role: "Generates vector representations",    sublabel: "OpenAI text-embedding",       isAI: true, isAccent: true },
      { id: "vector",  label: "Vector Store",    role: "Stores & queries embedding index",    sublabel: "PostgreSQL + pgvector" },
      { id: "llm",     label: "LLM Reasoning",   role: "Synthesizes answer from context",     sublabel: "OpenAI GPT",                  isAI: true, isAccent: true },
      { id: "result",  label: "Cited Answer",    role: "Returns verified response to user",   sublabel: "Source-linked output",        isAccent: true },
    ],

    techStack: [
      { label: "AI / LLM",  items: ["OpenAI API", "LangChain", "RAG Pipeline", "pgvector"] },
      { label: "Backend",   items: ["Python", "FastAPI", "PostgreSQL"] },
      { label: "Frontend",  items: ["Next.js", "TypeScript", "React"] },
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  // ── TIER 1: ContentStudio Workflow ─────────────────────────────────────────
  {
    id: "content-studio-workflow",
    index: 2,
    tier: 1,
    name: "ContentStudio Workflow",
    tagline: "Automated Digital Asset Processing Pipeline",
    category: "AI SaaS",
    badge: "TIER 1 · Production SaaS",
    color: "#ec4899",
    imageUrl: "/Dashboard.webp",
    role: "Full-Stack AI Engineering",
    status: "Built",

    problem:
      "Digital operations teams faced high error rates and severe backlogs when manually formatting, labeling, and tagging hundreds of media assets every week. Each asset required manual review, category assignment, and metadata entry — a slow, error-prone process that blocked downstream publishing pipelines.",

    solution:
      "Built an asset processing platform with automated background queue workers, real-time WebSocket state synchronization, and a collaborative dashboard. File uploads trigger a Redis-backed job queue that processes assets in parallel — extracting metadata, generating AI tags, and broadcasting progress to all connected clients.",

    aiComponents: [
      "Vision LLM integration — automatically analyzes image content for category and tag generation",
      "Text LLM integration — generates clean metadata summaries from file names and extracted content",
      "Automated categorization — assigns asset categories without human review",
      "Automated tag generation — produces relevant, searchable tags for every asset",
    ],

    automationFlow:
      "When a file is uploaded to the platform, it is immediately placed into a Redis Bull Queue. Background workers dequeue the job, run automated validation checks, invoke the Vision LLM API to analyze the asset, generate metadata and tags, write results to PostgreSQL, and broadcast a WebSocket progress event to all connected dashboard clients. No human operator touches the asset between upload and indexed completion.",

    outcome:
      "Replaced manual file tagging with automated background processing pipelines. Assets are processed in parallel without operator delay. The system handles concurrent uploads without blocking the main application thread.",

    architecture: [
      { id: "user",     label: "User Upload",       role: "Uploads media asset to platform",       sublabel: "Browser Dashboard" },
      { id: "api",      label: "Node.js API",        role: "Receives upload, enqueues job",         sublabel: "Express · REST" },
      { id: "queue",    label: "Redis Bull Queue",   role: "Async job distribution & retries",      sublabel: "Redis · Bull Queue",         isAccent: true },
      { id: "worker",   label: "Background Worker",  role: "Processes asset in isolation",          sublabel: "Node.js Worker" },
      { id: "vision",   label: "Vision LLM",         role: "Analyzes image content for tags",       sublabel: "LLM API Call",               isAI: true, isAccent: true },
      { id: "db",       label: "PostgreSQL",          role: "Stores processed metadata & tags",      sublabel: "Structured data store" },
      { id: "ws",       label: "WebSocket Broadcast", role: "Pushes real-time progress to clients", sublabel: "Live state sync",             isAccent: true },
      { id: "dash",     label: "Dashboard",           role: "Operator views processed assets",      sublabel: "Next.js UI" },
    ],

    techStack: [
      { label: "AI / LLM",    items: ["Vision LLM API", "Text LLM API", "Auto-tagging"] },
      { label: "Backend",     items: ["Node.js", "Express", "Redis", "Bull Queue"] },
      { label: "Frontend",    items: ["Next.js", "TypeScript", "WebSockets"] },
      { label: "Data",        items: ["PostgreSQL"] },
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  // ── TIER 2: Commerce Hub Automation ────────────────────────────────────────
  {
    id: "commerce-hub-automation",
    index: 3,
    tier: 2,
    name: "Commerce Hub Automation",
    tagline: "Headless Commerce with Automated Order Pipelines",
    category: "Full-Stack AI",
    badge: "TIER 2 · E-Commerce System",
    color: "#c4a265",
    imageUrl: "/Dashboard.webp",
    role: "Full-Stack Engineering",
    status: "Built",

    problem:
      "Traditional storefronts suffered from sluggish page transitions, manual inventory adjustments, and dropped customer checkouts due to brittle third-party plugin dependencies. Order management required manual reconciliation after each purchase.",

    solution:
      "Built a headless storefront leveraging Next.js App Router server components, instant search queries, and programmatic webhook handlers for Stripe payment events. All order fulfillment and inventory sync happens via server-side webhook listeners — no manual processing required.",

    aiComponents: [
      "Smart search indexing — semantic product discovery aligned with customer intent",
      "Semantic product recommendations — matching customer queries to catalog entries",
    ],

    automationFlow:
      "Customer places an order → Stripe processes payment → Stripe fires a webhook to the Next.js API route → Server validates the webhook signature → Inventory is updated in the database → Order confirmation is dispatched to the customer → All steps execute within seconds, without operator action.",

    outcome:
      "Streamlined the purchase pipeline from product discovery to payment fulfillment with zero manual order intervention. Webhook-driven automation eliminated the need for manual payment reconciliation.",

    architecture: [
      { id: "customer", label: "Customer",          role: "Browses products and places order",    sublabel: "Browser Storefront" },
      { id: "next",     label: "Next.js Frontend",  role: "Server-rendered product pages",        sublabel: "App Router · RSC",            isAccent: true },
      { id: "search",   label: "Search Engine",     role: "Semantic product discovery",           sublabel: "Smart Indexing",              isAI: true },
      { id: "stripe",   label: "Stripe",            role: "Handles payment processing",           sublabel: "Payment Gateway" },
      { id: "webhook",  label: "Webhook Handler",   role: "Receives and validates Stripe events", sublabel: "Next.js API Route",           isAccent: true },
      { id: "db",       label: "Database",          role: "Inventory & order persistence",        sublabel: "Data Store" },
      { id: "confirm",  label: "Order Confirmed",   role: "Customer receives confirmation",        sublabel: "Automated output" },
    ],

    techStack: [
      { label: "Frontend",      items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { label: "Integrations",  items: ["Stripe", "Webhooks"] },
      { label: "Deployment",    items: ["Vercel"] },
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  // ── TIER 2: CloudPulse Monitor ─────────────────────────────────────────────
  {
    id: "cloud-pulse-monitor",
    index: 4,
    tier: 2,
    name: "CloudPulse Monitor",
    tagline: "Real-Time Systems Telemetry & Automated Alerting",
    category: "Business Automation",
    badge: "TIER 2 · Telemetry Engine",
    color: "#8b5cf6",
    imageUrl: "/Dashboard.webp",
    role: "Mobile & Backend Engineering",
    status: "Built",

    problem:
      "Engineering operations lacked an immediate, consolidated view of microservice uptime. Monitoring required manual dashboard inspections, causing delayed incident response and missed service degradation events.",

    solution:
      "Built a cross-platform monitoring utility with real-time telemetry streaming, offline caching, and rule-based automated threshold alerting. Background event listeners continuously monitor incoming metrics and fire push notifications when anomalies are detected.",

    aiComponents: [
      "Anomaly detection heuristic — automated latency spike detection against rolling baselines",
      "Automated threshold classification — distinguishes degradation from normal variance",
    ],

    automationFlow:
      "Microservice metrics stream into the Firebase real-time database → Background listeners evaluate each metric against configured thresholds → When a threshold is breached, an automated push notification is dispatched → The mobile dashboard updates in real time without requiring user refresh or manual polling.",

    outcome:
      "Automated infrastructure health tracking with zero manual polling. Incidents are detected and notified instantly — operators no longer need to check dashboards manually.",

    architecture: [
      { id: "services", label: "Microservices",      role: "Emit health & latency metrics",        sublabel: "Monitored systems" },
      { id: "api",      label: "REST API Layer",      role: "Ingests telemetry data streams",       sublabel: "TypeScript API" },
      { id: "firebase", label: "Firebase RTDB",       role: "Real-time data sync & storage",        sublabel: "Firebase",                   isAccent: true },
      { id: "heuristic",label: "Anomaly Detector",    role: "Evaluates metrics vs thresholds",      sublabel: "Rule-based heuristic",       isAI: true },
      { id: "alert",    label: "Alert Engine",        role: "Fires automated push notifications",   sublabel: "Threshold breach",           isAccent: true },
      { id: "app",      label: "Flutter App",         role: "Visualizes real-time dashboard",       sublabel: "Flutter · Dart" },
    ],

    techStack: [
      { label: "Mobile",      items: ["Flutter", "Dart"] },
      { label: "Backend",     items: ["Firebase", "REST APIs", "TypeScript"] },
      { label: "AI / Logic",  items: ["Anomaly Detection Heuristic", "Automated Alerting"] },
    ],

    liveUrl: "#",
    githubUrl: "#",
  },

  // ── TIER 3: Order Automation System ────────────────────────────────────────
  {
    id: "order-automation-system",
    index: 5,
    tier: 3,
    name: "Order Automation System",
    tagline: "Scheduled Inventory & Automated Order Routing",
    category: "Business Automation",
    badge: "TIER 3 · Operational System",
    color: "#d97706",
    imageUrl: "/Dashboard.webp",
    role: "Full-Stack Engineering",
    status: "Built",

    problem:
      "Local food businesses relied on manual phone calls and chat messages for order taking, leading to order mix-ups, double bookings, and inventory miscalculations. No centralized system existed for managing menu slots or availability.",

    solution:
      "Built an interactive web application with structured menu time slots, dynamic availability validation, and instant confirmation routing. Orders are validated and dispatched without human intervention.",

    aiComponents: [
      "Automated NLQ handling — routes order inquiries and dietary preference queries without manual reply",
    ],

    automationFlow:
      "Customer selects available slot → System validates availability and locks slot atomically → Order is persisted with status → Confirmation notification dispatched → Slot marked unavailable for double-booking prevention. No staff action needed between order submission and confirmation.",

    outcome:
      "Transitioned manual phone-based ordering into a structured, automated self-service system. Double bookings were eliminated through atomic slot locking.",

    architecture: [
      { id: "customer", label: "Customer",       role: "Selects menu slot and submits order",   sublabel: "Browser UI" },
      { id: "react",    label: "React UI",        role: "Menu display + slot selection form",    sublabel: "React · JavaScript" },
      { id: "api",      label: "Express API",     role: "Validates and processes order",         sublabel: "Node.js · Express",          isAccent: true },
      { id: "db",       label: "MongoDB",          role: "Order and slot persistence",           sublabel: "Document Store" },
      { id: "notify",   label: "Notification",    role: "Dispatches confirmation to customer",   sublabel: "Automated output",           isAccent: true },
    ],

    techStack: [
      { label: "Frontend",  items: ["React", "Tailwind CSS"] },
      { label: "Backend",   items: ["Node.js", "Express", "MongoDB"] },
    ],

    liveUrl: "#",
    githubUrl: "#",
  },
];
