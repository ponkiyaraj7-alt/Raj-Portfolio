export interface ProjectSystem {
  id: string;
  name: string;
  tagline: string;
  category: "AI & Automation" | "Voice AI" | "AI SaaS" | "Full-Stack AI" | "Business Automation";
  badge: string;
  problem: string;
  system: string;
  aiComponent: string;
  automation: string;
  technologies: string[];
  result: string;
  metrics: string;
  color: string;
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
}

export const PROJECT_SYSTEMS: ProjectSystem[] = [
  {
    id: "ai-knowledge-platform",
    name: "AI Knowledge Platform",
    tagline: "Automated Document Analysis & Contextual Retrieval",
    category: "AI & Automation",
    badge: "Featured System",
    problem:
      "Knowledge workers spent hours manually reviewing lengthy operational manuals, contracts, and invoices to extract key data points, leading to workflow delays and lookup fatigue.",
    system:
      "An automated document intelligence platform featuring an ingestion engine, dense vector indexing, and a full-stack Next.js interface for natural language inquiry.",
    aiComponent:
      "OpenAI embeddings paired with structured LLM reasoning for multi-document synthesis and verified source citing.",
    automation:
      "Automated document parsing on upload, background text chunking, embedding generation, and automated vector store re-indexing without human intervention.",
    technologies: ["Python", "FastAPI", "LangChain", "pgvector", "PostgreSQL", "Next.js", "TypeScript"],
    result:
      "Reduced manual document lookup time from hours to seconds, replacing manual search with verifiable, cited AI extraction.",
    metrics: "Sub-second retrieval with verified source citations",
    color: "#0ea5e9",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "content-studio-workflow",
    name: "ContentStudio Workflow",
    tagline: "Automated Digital Asset Processing Pipeline",
    category: "AI SaaS",
    badge: "Production SaaS",
    problem:
      "Digital operations faced high error rates and severe backlogs when manually formatting, labeling, and tagging hundreds of media assets every week.",
    system:
      "An asset processing platform with automated background queue workers, real-time WebSocket state synchronization, and a collaborative dashboard.",
    aiComponent:
      "Vision and text LLM integration to automatically generate relevant tags, clean metadata summaries, and categorize media.",
    automation:
      "File upload triggers background queue jobs via Redis, performs automated validation, indexes metadata, and broadcasts progress via WebSockets.",
    technologies: ["Next.js", "TypeScript", "Node.js", "Redis", "Bull Queue", "Tailwind CSS", "PostgreSQL"],
    result:
      "Replaced manual file tagging with automated background processing pipelines, processing assets in parallel without operator delay.",
    metrics: "100% automated asset categorization & tagging",
    color: "#ec4899",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "commerce-hub-automation",
    name: "Commerce Hub Automation",
    tagline: "Headless Commerce with Automated Order Pipelines",
    category: "Full-Stack AI",
    badge: "E-Commerce System",
    problem:
      "Traditional storefronts suffered from sluggish page transitions, manual inventory adjustments, and dropped customer checkouts due to brittle third-party plugins.",
    system:
      "A headless storefront leveraging Next.js App Router server components, instant search queries, and programmatic webhook handlers.",
    aiComponent:
      "Smart search indexing and semantic product recommendations to match customer intent with product catalog entries.",
    automation:
      "Automated inventory status sync, webhook-driven payment confirmations via Stripe, and dynamic order tracking dispatches.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Vercel"],
    result:
      "Streamlined the purchase pipeline from discovery to payment fulfillment with zero manual order intervention.",
    metrics: "Real-time webhook order routing & inventory sync",
    color: "#c4a265",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "cloud-pulse-monitor",
    name: "CloudPulse Monitor",
    tagline: "Real-Time Systems Telemetry & Alerting Utility",
    category: "Business Automation",
    badge: "Telemetry Engine",
    problem:
      "Engineering operations lacked an immediate, consolidated view of microservice uptime, requiring manual dashboard inspections and delayed incident response.",
    system:
      "A multi-service monitoring application with real-time data streaming, offline caching, and rule-based incident alerts.",
    aiComponent:
      "Automated anomaly detection heuristic on inbound latency metrics to flag abnormal spikes before service disruption occurs.",
    automation:
      "Background event listeners trigger automated push alerts when thresholds are breached, routing incidents automatically.",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "TypeScript"],
    result:
      "Automated infrastructure health tracking with zero manual polling and instant threshold incident dispatches.",
    metrics: "Instant anomaly detection & push alerts",
    color: "#8b5cf6",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
  {
    id: "order-automation-system",
    name: "Order Automation System",
    tagline: "Scheduled Inventory & Automated Routing",
    category: "Business Automation",
    badge: "Operational System",
    problem:
      "Local food businesses relied on manual phone calls and chat messages, leading to order mix-ups, double bookings, and stock miscalculations.",
    system:
      "An interactive web app with structured menu slots, dynamic validation, and instant confirmation routing.",
    aiComponent:
      "Automated natural language query handling for order inquiries, dietary preferences, and intake routing.",
    automation:
      "Automated availability tracking, dynamic order slot locks, and instant notification dispatches upon order submission.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    result:
      "Transitioned manual phone-based ordering into a structured, automated self-service system with zero double bookings.",
    metrics: "100% automated reservation & slot locks",
    color: "#d97706",
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/Dashboard.webp",
  },
];
