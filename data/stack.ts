export interface StackGroup {
  category: string;
  badge: string;
  description: string;
  color: string;
  items: {
    name: string;
    purpose: string;
    level: string;
  }[];
}

export const AI_ENGINEERING_STACK: StackGroup[] = [
  {
    category: "AI & Foundation Models",
    badge: "Intelligence Layer",
    description: "Frontier LLMs and cognitive reasoning engines configured for production reliability.",
    color: "#10b981",
    items: [
      { name: "OpenAI API", purpose: "GPT-4o & reasoning models for structured extraction and task execution", level: "Production" },
      { name: "Claude API", purpose: "Complex logical reasoning, document synthesis, and code analysis", level: "Production" },
      { name: "Generative AI", purpose: "System design around generative text, vision, and semantic models", level: "Core Focus" },
      { name: "Prompt Engineering", purpose: "Grounded system directives, few-shot contexts, and strict JSON output schemas", level: "Advanced" },
      { name: "RAG Architectures", purpose: "Retrieval-Augmented Generation grounding responses with verified citations", level: "Production" },
      { name: "AI Agents", purpose: "Multi-step autonomous execution graphs and self-reflection loops", level: "Active" },
    ],
  },
  {
    category: "AI Frameworks & Orchestration",
    badge: "Agent Architecture",
    description: "State machines and graph orchestration layers that coordinate autonomous execution.",
    color: "#8b5cf6",
    items: [
      { name: "LangGraph", purpose: "Cyclic multi-agent graphs, state machines, and execution checkpoints", level: "Production" },
      { name: "LangChain", purpose: "Model chaining, document loaders, vector store retrievers, and tool routing", level: "Production" },
      { name: "Vercel AI SDK", purpose: "Streaming LLM completions and generative UI endpoints in Next.js", level: "Production" },
      { name: "Tool Calling", purpose: "Function definition schemas for authenticated tool execution and database lookups", level: "Advanced" },
    ],
  },
  {
    category: "Backend & Data Pipelines",
    badge: "Service Layer",
    description: "High-performance server runtimes and asynchronous job processing pipelines.",
    color: "#0ea5e9",
    items: [
      { name: "Python", purpose: "Primary language for data manipulation, agent logic, and AI services", level: "Core" },
      { name: "FastAPI", purpose: "Asynchronous REST endpoints, strict Pydantic models, and high-throughput APIs", level: "Production" },
      { name: "Node.js", purpose: "Event-driven microservices, background scripts, and API gateways", level: "Production" },
      { name: "REST APIs", purpose: "Clean interface contracts with OpenAPI documentation and rate limiting", level: "Core" },
    ],
  },
  {
    category: "Frontend & Reactive Interfaces",
    badge: "User Layer",
    description: "Interactive, fluid web applications that expose intelligent workflows to users.",
    color: "#f59e0b",
    items: [
      { name: "Next.js (App Router)", purpose: "Server Components, streaming routes, and production web architecture", level: "Core" },
      { name: "React", purpose: "Component hierarchy, state orchestration, and responsive user experiences", level: "Core" },
      { name: "TypeScript", purpose: "Strict type safety across API boundaries, payloads, and components", level: "Core" },
      { name: "Tailwind CSS", purpose: "Responsive, clean UI design systems and accessible layouts", level: "Advanced" },
    ],
  },
  {
    category: "Data, Vectors & Infrastructure",
    badge: "Persistence Layer",
    description: "Relational persistence, vector index storage, and containerized deployment.",
    color: "#ec4899",
    items: [
      { name: "pgvector", purpose: "In-database vector similarity search and dense embedding indexing", level: "Production" },
      { name: "Pinecone", purpose: "Cloud-native managed vector database for high-scale semantic retrieval", level: "Production" },
      { name: "PostgreSQL", purpose: "ACID-compliant relational database for structured business data", level: "Core" },
      { name: "Redis", purpose: "High-speed caching, distributed state, and background task queues", level: "Production" },
      { name: "Docker", purpose: "Containerized deployment environments ensuring reproducible builds", level: "Production" },
    ],
  },
  {
    category: "Automation & Integrations",
    badge: "Workflow Layer",
    description: "External tool connections, scheduled tasks, and webhook fulfillment engines.",
    color: "#14b8a6",
    items: [
      { name: "Webhooks", purpose: "Event-driven real-time triggers between external SaaS platforms and services", level: "Production" },
      { name: "Stripe", purpose: "Payment processing, subscription billing, and webhook fulfillment", level: "Production" },
      { name: "Background Queues", purpose: "Bull Queue and Redis workers for resilient asynchronous task execution", level: "Production" },
      { name: "CI / CD Pipelines", purpose: "Automated testing, linting, type-checking, and continuous production deployment", level: "Core" },
    ],
  },
];
