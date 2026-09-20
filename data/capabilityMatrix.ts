export interface CapabilityGroup {
  id: string;
  label: string;
  description: string;
  items: string[];
  color: string;
}

// Capability matrix — no percentages, no skill bars.
// Technologies grouped by engineering purpose.
// Only includes technologies verified in data/stack.ts, data/experience.ts, and data/content.ts.

export const CAPABILITY_MATRIX: CapabilityGroup[] = [
  {
    id: "ai-engineering",
    label: "AI Engineering",
    description: "Language models, retrieval systems, and autonomous agent architectures.",
    color: "#8B5CF6",
    items: [
      "LLM Applications",
      "RAG Systems",
      "Prompt Engineering",
      "AI Agents",
      "Tool Calling",
      "Vector Retrieval",
      "Structured Outputs",
      "Context Window Design",
    ],
  },
  {
    id: "frameworks",
    label: "AI Frameworks",
    description: "Orchestration layers and libraries used in production.",
    color: "#0EA5E9",
    items: [
      "LangGraph",
      "LangChain",
      "OpenAI API",
      "Claude API",
      "Vercel AI SDK",
    ],
  },
  {
    id: "application-engineering",
    label: "Application Engineering",
    description: "Full-stack development from reactive UIs to high-throughput backends.",
    color: "#10B981",
    items: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Node.js",
    ],
  },
  {
    id: "data",
    label: "Data & Storage",
    description: "Relational databases, vector indexes, and caching layers.",
    color: "#F59E0B",
    items: [
      "PostgreSQL",
      "pgvector",
      "Pinecone",
      "Redis",
      "Vector Search",
      "Embeddings",
    ],
  },
  {
    id: "automation",
    label: "Automation & Integration",
    description: "Workflow automation, webhooks, and background job processing.",
    color: "#EC4899",
    items: [
      "REST APIs",
      "Webhooks",
      "Background Queues",
      "Docker",
      "CI/CD",
      "Stripe Integration",
    ],
  },
  {
    id: "voice-ai",
    label: "Voice AI",
    description: "Speech-to-text transcription and audio processing pipelines.",
    color: "#6366F1",
    items: [
      "Whisper (Speech-to-Text)",
      "Audio Streaming",
      "Transcription Pipelines",
    ],
  },
];
