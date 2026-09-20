export interface PlaygroundDemo {
  id: string;
  title: string;
  concept: string;
  status: "active-preview" | "in-development" | "upcoming";
  tagline: string;
  description: string;
  architecture: {
    input: string;
    processing: string;
    output: string;
  };
  metrics: string;
  technologies: string[];
  color: string;
}

export const PLAYGROUND_DEMOS: PlaygroundDemo[] = [
  {
    id: "rag-visualizer",
    title: "RAG Retrieval & Chunk Inspector",
    concept: "Vector Embeddings & Semantic Retrieval",
    status: "active-preview",
    tagline: "Explore how unstructured documents turn into high-dimensional vectors and cited answers.",
    description: "Inspect live tokenization, chunk overlap boundaries, cosine similarity scores, and verified source citations against target vector indexes.",
    architecture: {
      input: "Raw document query / text fragment",
      processing: "Chunking → Dense vector embedding → pgvector cosine similarity ranking",
      output: "Top-k semantic matches with distance scores and citation metadata",
    },
    metrics: "Sub-50ms vector query latency",
    technologies: ["pgvector", "LangChain", "OpenAI Embeddings", "FastAPI"],
    color: "#0ea5e9",
  },
  {
    id: "agent-tool-calling",
    title: "Autonomous Agent Tool Calling",
    concept: "Multi-Step Decision Graphs & Function Calling",
    status: "active-preview",
    tagline: "Watch an agent reason, plan, invoke external tools, and verify intermediate states.",
    description: "Step through agent execution graphs showing prompt evaluation, tool schema resolution, external API execution, error recovery, and loop termination.",
    architecture: {
      input: "High-level goal statement",
      processing: "LangGraph state machine → tool selection → authenticated API dispatch → self-reflection",
      output: "Multi-turn execution trail with verified deliverables",
    },
    metrics: "100% schema-enforced tool parameters",
    technologies: ["LangGraph", "Python", "Tool Calling", "State Checkpoints"],
    color: "#10b981",
  },
  {
    id: "prompt-eval-inspector",
    title: "Prompt & Reasoning Inspector",
    concept: "Context Windows, Few-Shot Prompts & Deterministic Output",
    status: "in-development",
    tagline: "Understand the mechanics of prompt design, system directives, and token telemetry.",
    description: "Compare zero-shot vs few-shot system directives, inspect JSON schema validators, and analyze token usage and latency breakdowns across model families.",
    architecture: {
      input: "System prompt + runtime variable payload",
      processing: "Template hydration → token counter → strict Pydantic JSON schema evaluation",
      output: "Validated structured data payload with token telemetry",
    },
    metrics: "Zero JSON parsing failures",
    technologies: ["Pydantic", "OpenAI", "Claude", "Next.js"],
    color: "#8b5cf6",
  },
  {
    id: "voice-ai-pipeline",
    title: "Speech AI & Action Extractor",
    concept: "Phonetic Processing to Structured Action Items",
    status: "upcoming",
    tagline: "Convert spoken speech into transcribed text and prioritized action items.",
    description: "Simulate speech audio stream ingestion through Whisper transcription models directly into task extraction agents and calendar schedule dispatches.",
    architecture: {
      input: "Raw audio stream / voice memo",
      processing: "Phonetic transcription → diarization → LLM intent and action extraction",
      output: "Timestamped transcript with prioritized action tickets",
    },
    metrics: "Automated speaker diarization",
    technologies: ["Whisper", "WebSockets", "FastAPI", "Python"],
    color: "#f59e0b",
  },
];
