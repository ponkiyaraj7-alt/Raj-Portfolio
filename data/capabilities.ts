export interface Capability {
  id: string;
  title: string;
  badge: string;
  summary: string;
  problem: string;
  technology: string;
  ai: string;
  automation: string;
  result: string;
  tags: string[];
  color: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    badge: "Core Focus",
    summary: "Replacing brittle manual rules with adaptive cognitive workflows.",
    problem: "Static automation scripts break when formats change or unstructured human data enters the process.",
    technology: "Python, FastAPI, Redis, Webhooks, Docker",
    ai: "LLM semantic extraction and fallback reasoning when edge-cases arise",
    automation: "Event-triggered pipelines that parse, validate, route, and execute tasks without human supervision",
    result: "Continuous self-adapting workflows that eliminate 80%+ of manual intervention",
    tags: ["FastAPI", "Python", "Webhooks", "Queues"],
    color: "#10b981",
  },
  {
    id: "llm-applications",
    title: "LLM Applications",
    badge: "Production Ready",
    summary: "Production systems that harness frontier language models with strict outputs.",
    problem: "Raw LLM calls suffer from hallucinations, non-deterministic formatting, and prompt drift.",
    technology: "OpenAI API, Claude, Pydantic, TypeScript, Next.js",
    ai: "Carefully calibrated system prompts, temperature controls, and structured JSON schema enforcement",
    automation: "Automated prompt evaluation pipelines and programmatic schema validation before downstream ingestion",
    result: "Deterministic, auditable outputs suitable for high-stakes business software",
    tags: ["OpenAI", "Claude", "Prompt Engineering", "JSON Schemas"],
    color: "#8b5cf6",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    badge: "Multi-Step Autonomy",
    summary: "Autonomous agents that break down high-level business goals into verified actions.",
    problem: "Single-turn chatbots cannot handle complex, branching workflows that require planning and tool execution.",
    technology: "LangGraph, LangChain, State Machines, Python",
    ai: "Multi-step reasoning graphs, self-reflection loops, and dynamic goal replanning",
    automation: "Autonomous tool dispatch, loop termination checks, and checkpointed state resumption",
    result: "Self-governing agent pipelines that execute end-to-end multi-step tasks reliably",
    tags: ["LangGraph", "LangChain", "Tool Calling", "Autonomous State"],
    color: "#ec4899",
  },
  {
    id: "rag-systems",
    title: "RAG Systems",
    badge: "Cited Knowledge",
    summary: "Retrieval-Augmented Generation that connects LLMs to enterprise knowledge.",
    problem: "Language models lack knowledge of private business documentation, internal policies, and dynamic records.",
    technology: "pgvector, Pinecone, PostgreSQL, Text Embeddings",
    ai: "Dense vector retrieval, hybrid keyword/vector search, and context window compression",
    automation: "Automated ingestion pipeline: document chunking, embedding generation, and vector index synchronization",
    result: "Instant contextual answers with clickable, verified source citations",
    tags: ["pgvector", "Pinecone", "Vector Search", "Hybrid Retrieval"],
    color: "#0ea5e9",
  },
  {
    id: "voice-ai",
    title: "Voice AI",
    badge: "Speech Intelligence",
    summary: "Real-time speech-to-text transcription, voice synthesis, and conversational audio.",
    problem: "Voice data remains locked in audio recordings without automated indexing, transcription, or action extraction.",
    technology: "Whisper, Speech-to-Text APIs, Audio Streaming, Python",
    ai: "High-accuracy phonetic transcription, speaker diarization, and semantic action item summarization",
    automation: "Automatic background audio ingestion, transcription queue processing, and task ticket generation",
    result: "Recorded audio converted into structured, actionable business deliverables in seconds",
    tags: ["Whisper", "Audio Pipelines", "Transcription", "Speech AI"],
    color: "#f59e0b",
  },
  {
    id: "ai-saas",
    title: "AI-Powered SaaS",
    badge: "Full Product",
    summary: "Commercial software platforms built from the ground up around intelligent capabilities.",
    problem: "Businesses struggle to integrate AI capabilities into cohesive multi-tenant software with billing and authentication.",
    technology: "Next.js App Router, TypeScript, Tailwind CSS, Stripe, PostgreSQL",
    ai: "Streaming responses, dynamic AI assistants, smart contextual recommendations, and automated insights",
    automation: "Webhook-driven subscription tiers, usage-based token rate limiting, and automated provisioning",
    result: "Scalable commercial applications that monetize AI workflows out of the box",
    tags: ["Next.js", "TypeScript", "Stripe", "Multi-Tenant"],
    color: "#14b8a6",
  },
  {
    id: "process-automation",
    title: "Business Process Automation",
    badge: "Operational ROI",
    summary: "Engineering end-to-end operational pipelines that connect disparate business apps.",
    problem: "Staff waste valuable hours manually copy-pasting data between spreadsheets, CRMs, and email systems.",
    technology: "REST APIs, Webhooks, Redis Bull Queue, Python, Node.js",
    ai: "Intelligent document understanding, receipt/invoice classification, and automated routing decisions",
    automation: "Bi-directional synchronization between internal databases and third-party SaaS tools",
    result: "Elimination of double-data entry and near-zero error rates in daily operations",
    tags: ["Integrations", "Webhooks", "Redis", "Data Sync"],
    color: "#6366f1",
  },
  {
    id: "fullstack-ai",
    title: "Full-Stack AI Applications",
    badge: "End-to-End",
    summary: "Seamlessly architected systems spanning reactive frontends to distributed AI backends.",
    problem: "Disconnection between high-speed reactive user interfaces and heavy, asynchronous AI workloads.",
    technology: "Next.js, React, FastAPI, Vercel AI SDK, Tailwind CSS, PostgreSQL",
    ai: "Streaming server-sent events (SSE) for zero perceived latency during LLM reasoning",
    automation: "Optimistic UI state updates paired with background worker synchronization and audit logging",
    result: "Fluid, modern applications where complex AI computation feels instantaneous to the user",
    tags: ["Full-Stack", "Vercel AI SDK", "Streaming SSE", "FastAPI"],
    color: "#3b82f6",
  },
];
