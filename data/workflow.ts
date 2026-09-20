export interface WorkflowStep {
  id: string;
  stepNumber: string;
  title: string;
  stage: string;
  tagline: string;
  description: string;
  inputs: string[];
  action: string;
  outputs: string[];
  tech: string[];
  color: string;
}

export const WORKFLOW_PIPELINE: WorkflowStep[] = [
  {
    id: "business-problem",
    stepNumber: "01",
    stage: "Inception",
    title: "Business Problem",
    tagline: "Uncovering manual operational bottlenecks",
    description: "Every intelligent system starts with an operational friction point: repetitive human steps, fragmented data, high latency, or error-prone processes.",
    inputs: ["Manual procedures", "Unstructured requests", "Operational bottlenecks"],
    action: "Deconstruct the business process into deterministic vs. cognitive sub-tasks",
    outputs: ["Structured problem spec", "Target automation KPIs"],
    tech: ["Process Analysis", "System Topology"],
    color: "#10b981",
  },
  {
    id: "data-ingestion",
    stepNumber: "02",
    stage: "Ingestion",
    title: "Data & Context",
    tagline: "Standardizing input streams and assets",
    description: "Ingesting raw PDFs, documents, customer messages, audio transcripts, or API webhooks into unified structured payloads.",
    inputs: ["PDFs / DOCX", "Audio Streams", "REST Webhooks", "SQL Rows"],
    action: "Parse, clean, normalize, and extract metadata from heterogeneous inputs",
    outputs: ["Clean text chunks", "Typed payloads", "Normalized metadata"],
    tech: ["FastAPI", "Python", "Pydantic", "Whisper"],
    color: "#0ea5e9",
  },
  {
    id: "ai-llm",
    stepNumber: "03",
    stage: "Intelligence",
    title: "AI & LLM Reasoning",
    tagline: "Applying language models for cognitive extraction",
    description: "Configuring state-of-the-art models with grounded system prompts, few-shot contexts, and strict JSON schemas to reason over business data.",
    inputs: ["Normalized payloads", "System directives", "Retrieved context"],
    action: "Perform structured extraction, semantic intent analysis, and logical reasoning",
    outputs: ["Structured JSON output", "Confidence metrics", "Action plans"],
    tech: ["OpenAI API", "Claude", "Prompt Engineering"],
    color: "#8b5cf6",
  },
  {
    id: "rag-retrieval",
    stepNumber: "04",
    stage: "Knowledge",
    title: "RAG & Vector Retrieval",
    tagline: "Grounding responses in verified private data",
    description: "Connecting the reasoning engine to vector databases and dense embeddings to ensure factual answers backed by exact source citations.",
    inputs: ["Semantic queries", "Knowledge base docs", "Vector embeddings"],
    action: "Cosine similarity search over vector spaces with reranking and cite tagging",
    outputs: ["Top-k cited chunks", "Source verifications", "Grounded facts"],
    tech: ["pgvector", "Pinecone", "LangChain", "Text Embeddings"],
    color: "#f59e0b",
  },
  {
    id: "agent-orchestration",
    stepNumber: "05",
    stage: "Agency",
    title: "Autonomous Agents",
    tagline: "Multi-step decision graphs and goal routing",
    description: "Orchestrating agents that can make decisions, loop until output criteria are satisfied, evaluate their own answers, and branch dynamically.",
    inputs: ["Goal directives", "Intermediate states", "Tool feedback"],
    action: "Execute state graphs, manage memory checkpoints, and resolve errors autonomously",
    outputs: ["Validated plan execution", "State checkpoints"],
    tech: ["LangGraph", "LangChain", "State Machines"],
    color: "#ec4899",
  },
  {
    id: "tool-calling",
    stepNumber: "06",
    stage: "Execution",
    title: "Tools & External APIs",
    tagline: "Connecting cognitive models to real-world systems",
    description: "Enabling agents to execute function calls: query databases, trigger external APIs, send emails, generate files, and manipulate business software.",
    inputs: ["Function call schemas", "API credentials", "Agent intentions"],
    action: "Dispatch authenticated REST requests, database queries, and third-party webhooks",
    outputs: ["API responses", "Updated databases", "External artifacts"],
    tech: ["REST APIs", "Function Calling", "Webhooks", "PostgreSQL"],
    color: "#14b8a6",
  },
  {
    id: "automation-engine",
    stepNumber: "07",
    stage: "Scale",
    title: "Automation & Background Jobs",
    tagline: "Reliable, self-healing execution pipelines",
    description: "Encapsulating workflows in asynchronous background job queues with exponential retries, rate limiting, and telemetry monitoring.",
    inputs: ["Queued agent tasks", "Scheduled triggers", "System webhooks"],
    action: "Process parallel workloads with Redis queues and automated error recovery",
    outputs: ["Zero-downtime execution", "Incident telemetry", "Task audit logs"],
    tech: ["Redis", "Bull Queue", "Docker", "CI/CD"],
    color: "#6366f1",
  },
  {
    id: "business-result",
    stepNumber: "08",
    stage: "Outcome",
    title: "Measurable Result",
    tagline: "Hours saved, friction eliminated, value created",
    description: "The business problem is resolved: operational tasks that took hours happen in seconds, errors plummet, and human workers focus on high-leverage decisions.",
    inputs: ["Automated workflow outputs", "Audited data artifacts"],
    action: "Deliver real-time updates to users, dashboards, and client systems",
    outputs: ["90%+ time reduction", "Zero manual data re-entry", "Predictable scale"],
    tech: ["Next.js", "Analytics", "Executive ROI"],
    color: "#10b981",
  },
];
