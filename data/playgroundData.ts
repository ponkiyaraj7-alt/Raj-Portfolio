// ─── Playground Simulation Data ───────────────────────────────────────────────
// All data here is deterministic simulation used for educational demonstrations.
// No real API calls are made. Outputs are pre-defined based on input selection.

// ─── MODULE 01: LLM ────────────────────────────────────────────────────────────

export interface LLMScenario {
  prompt: string;
  response: string;
  tokenCount: number; // simulated
}

export const LLM_SCENARIOS: LLMScenario[] = [
  {
    prompt: "Summarize the key benefits of RAG over fine-tuning",
    response:
      "RAG (Retrieval-Augmented Generation) provides up-to-date knowledge without model retraining, reduces hallucinations by grounding responses in retrieved facts, and allows domain knowledge to be updated by changing documents rather than weights. Fine-tuning is better for style and format adaptation, but RAG excels at factual recall from large, dynamic knowledge bases.",
    tokenCount: 94,
  },
  {
    prompt: "What is an AI agent?",
    response:
      "An AI agent is an LLM-powered system that can observe its environment, reason about goals, and take actions using external tools — then observe the results and iterate. Unlike a single prompt-response exchange, agents maintain state across multiple steps and can call APIs, query databases, run code, or invoke other agents to complete complex tasks autonomously.",
    tokenCount: 78,
  },
  {
    prompt: "Explain vector embeddings in simple terms",
    response:
      "Vector embeddings are numerical representations of meaning. Text is converted into a list of numbers (a vector) such that similar meanings cluster close together in high-dimensional space. For example, 'king' and 'queen' produce nearby vectors. This allows semantic search — finding documents similar in meaning rather than just matching exact keywords.",
    tokenCount: 67,
  },
  {
    prompt: "How does tool calling work in LLMs?",
    response:
      "When an LLM detects that a user's request requires real-world data or action, it outputs a structured function call rather than plain text. The calling application intercepts this, executes the referenced function (e.g. a weather API), and injects the result back into the conversation. The LLM then uses that real data to generate its final response.",
    tokenCount: 81,
  },
];

export const LLM_PIPELINE_STAGES = [
  { id: "input", label: "INPUT", sublabel: "User Prompt" },
  { id: "tokenize", label: "TOKENIZE", sublabel: "Split into tokens" },
  { id: "encode", label: "ENCODE", sublabel: "Embedding lookup" },
  { id: "llm", label: "LLM ENGINE", sublabel: "Transformer inference" },
  { id: "decode", label: "DECODE", sublabel: "Token sampling" },
  { id: "output", label: "RESPONSE", sublabel: "Generated text" },
];

// ─── MODULE 02: RAG PIPELINE ───────────────────────────────────────────────────

export interface RAGDocument {
  id: string;
  title: string;
  category: string;
  icon: string;
  chunks: RAGChunk[];
}

export interface RAGChunk {
  id: string;
  text: string;
  vector: string; // simulated vector notation
}

export interface RAGQuestion {
  id: string;
  text: string;
  relevantChunkIds: string[];
  answer: string;
}

export const RAG_DOCUMENTS: RAGDocument[] = [
  {
    id: "doc-refund",
    title: "Refund & Returns Policy",
    category: "Policy",
    icon: "📋",
    chunks: [
      {
        id: "refund-1",
        text: "Customers may return any product within 30 days of purchase for a full refund, provided the item is unused and in original packaging.",
        vector: "[0.82, 0.14, 0.67, 0.31, 0.09, ...]",
      },
      {
        id: "refund-2",
        text: "Digital products and software licenses are non-refundable once the activation key has been used.",
        vector: "[0.71, 0.22, 0.58, 0.44, 0.13, ...]",
      },
      {
        id: "refund-3",
        text: "Refunds are processed within 5–7 business days back to the original payment method.",
        vector: "[0.88, 0.19, 0.61, 0.28, 0.07, ...]",
      },
    ],
  },
  {
    id: "doc-shipping",
    title: "Shipping & Delivery Guide",
    category: "Logistics",
    icon: "📦",
    chunks: [
      {
        id: "ship-1",
        text: "Standard shipping takes 3–5 business days. Express shipping is available for next-day delivery at an additional cost.",
        vector: "[0.34, 0.77, 0.21, 0.88, 0.42, ...]",
      },
      {
        id: "ship-2",
        text: "Free shipping is available on all orders over $50. International orders may incur customs duties not included in the shipping fee.",
        vector: "[0.29, 0.81, 0.17, 0.76, 0.55, ...]",
      },
      {
        id: "ship-3",
        text: "Tracking information is sent via email within 24 hours of shipment. Orders can be tracked through our portal.",
        vector: "[0.38, 0.69, 0.25, 0.82, 0.47, ...]",
      },
    ],
  },
  {
    id: "doc-api",
    title: "API Technical Documentation",
    category: "Technical",
    icon: "⚙️",
    chunks: [
      {
        id: "api-1",
        text: "Authentication uses Bearer tokens. Include Authorization: Bearer <token> in all API request headers. Tokens expire after 24 hours.",
        vector: "[0.11, 0.43, 0.92, 0.08, 0.77, ...]",
      },
      {
        id: "api-2",
        text: "Rate limits are enforced at 1000 requests per minute per API key. Exceeding limits returns HTTP 429 with a Retry-After header.",
        vector: "[0.09, 0.51, 0.88, 0.14, 0.69, ...]",
      },
      {
        id: "api-3",
        text: "All API responses follow JSON:API specification. Errors include a code, message, and optional details array.",
        vector: "[0.13, 0.47, 0.84, 0.11, 0.73, ...]",
      },
    ],
  },
  {
    id: "doc-faq",
    title: "Customer FAQ",
    category: "Support",
    icon: "❓",
    chunks: [
      {
        id: "faq-1",
        text: "To reset your password, click 'Forgot Password' on the login page. A reset link will be sent to your registered email address.",
        vector: "[0.55, 0.33, 0.44, 0.61, 0.88, ...]",
      },
      {
        id: "faq-2",
        text: "Account cancellation can be done from Settings > Account > Cancel Subscription. Data is retained for 30 days before permanent deletion.",
        vector: "[0.61, 0.28, 0.39, 0.74, 0.82, ...]",
      },
      {
        id: "faq-3",
        text: "Two-factor authentication (2FA) can be enabled from Security Settings. We support authenticator apps and SMS codes.",
        vector: "[0.58, 0.31, 0.41, 0.66, 0.79, ...]",
      },
    ],
  },
];

export const RAG_QUESTIONS: RAGQuestion[] = [
  {
    id: "q-refund",
    text: "What is the refund period?",
    relevantChunkIds: ["refund-1", "refund-3"],
    answer:
      "Products can be returned within 30 days of purchase for a full refund, as long as they are unused and in original packaging. Refunds are processed within 5–7 business days back to the original payment method.",
  },
  {
    id: "q-shipping",
    text: "How long does shipping take?",
    relevantChunkIds: ["ship-1", "ship-2"],
    answer:
      "Standard shipping takes 3–5 business days. Express next-day delivery is available at extra cost. Orders over $50 qualify for free standard shipping.",
  },
  {
    id: "q-api-auth",
    text: "How does API authentication work?",
    relevantChunkIds: ["api-1", "api-2"],
    answer:
      "Use Bearer token authentication by including Authorization: Bearer <token> in all headers. Tokens expire after 24 hours. The API enforces a rate limit of 1,000 requests per minute per key; exceeding it returns HTTP 429.",
  },
  {
    id: "q-cancel",
    text: "How do I cancel my account?",
    relevantChunkIds: ["faq-2", "faq-1"],
    answer:
      "Go to Settings > Account > Cancel Subscription to cancel. Your data is retained for 30 days before permanent deletion. You can also reset your password from the login page if you need account access.",
  },
];

export const RAG_PIPELINE_STAGES = [
  { id: "docs", label: "DOCUMENTS", sublabel: "Knowledge base" },
  { id: "chunking", label: "CHUNKING", sublabel: "Split into passages" },
  { id: "embedding", label: "EMBEDDINGS", sublabel: "Simulated vectors" },
  { id: "search", label: "VECTOR SEARCH", sublabel: "Semantic similarity" },
  { id: "context", label: "CONTEXT", sublabel: "Retrieved passages" },
  { id: "llm", label: "LLM", sublabel: "Generation" },
  { id: "answer", label: "ANSWER", sublabel: "Grounded response" },
];

// ─── MODULE 03: AI AGENT ───────────────────────────────────────────────────────

export interface AgentTask {
  id: string;
  label: string;
  userRequest: string;
  steps: AgentStep[];
  finalResponse: string;
}

export interface AgentStep {
  id: string;
  phase: "observe" | "reason" | "act" | "result" | "respond";
  label: string;
  content: string;
  toolCall?: string;
  toolResult?: string;
}

export const AGENT_TASKS: AgentTask[] = [
  {
    id: "order-status",
    label: "Check Order Status",
    userRequest: "What's the status of my recent order?",
    steps: [
      {
        id: "s1",
        phase: "observe",
        label: "OBSERVE",
        content: "User requested order status. Need to identify order ID and query order system.",
      },
      {
        id: "s2",
        phase: "reason",
        label: "REASON",
        content: "I need to look up the user's most recent order. I'll call the order lookup tool with their account ID.",
      },
      {
        id: "s3",
        phase: "act",
        label: "TOOL CALL",
        content: "Calling order lookup tool",
        toolCall: "get_order_status(account_id='usr_8821', limit=1)",
      },
      {
        id: "s4",
        phase: "result",
        label: "TOOL RESULT",
        content: "Order retrieved",
        toolResult: '{ "order_id": "ORD-4492", "status": "In Transit", "eta": "Sep 23", "carrier": "FedEx", "tracking": "782941029384" }',
      },
      {
        id: "s5",
        phase: "respond",
        label: "FINAL RESPONSE",
        content:
          "Your most recent order (ORD-4492) is currently in transit with FedEx. Expected delivery is September 23. Tracking number: 782941029384.",
      },
    ],
    finalResponse: "Your most recent order (ORD-4492) is in transit with FedEx — estimated delivery September 23.",
  },
  {
    id: "product-info",
    label: "Find Product Info",
    userRequest: "Tell me about the Pro Plan features",
    steps: [
      {
        id: "s1",
        phase: "observe",
        label: "OBSERVE",
        content: "User asking about Pro Plan features. Need to retrieve product catalog information.",
      },
      {
        id: "s2",
        phase: "reason",
        label: "REASON",
        content: "I should query the product knowledge base for Pro Plan details rather than relying on possibly outdated training data.",
      },
      {
        id: "s3",
        phase: "act",
        label: "TOOL CALL",
        content: "Searching product catalog",
        toolCall: "search_products(query='Pro Plan features', category='pricing')",
      },
      {
        id: "s4",
        phase: "result",
        label: "TOOL RESULT",
        content: "Product info retrieved",
        toolResult: '{ "plan": "Pro", "price": "$49/mo", "features": ["Unlimited projects", "API access", "Priority support", "Advanced analytics", "Custom integrations"] }',
      },
      {
        id: "s5",
        phase: "respond",
        label: "FINAL RESPONSE",
        content:
          "The Pro Plan at $49/month includes: unlimited projects, full API access, priority support, advanced analytics dashboards, and custom third-party integrations.",
      },
    ],
    finalResponse: "Pro Plan ($49/mo): unlimited projects, API access, priority support, analytics, and custom integrations.",
  },
  {
    id: "schedule-meeting",
    label: "Schedule a Meeting",
    userRequest: "Book a 30-minute call with the sales team for next Tuesday",
    steps: [
      {
        id: "s1",
        phase: "observe",
        label: "OBSERVE",
        content: "User wants to schedule a meeting. I need to check calendar availability then create a booking.",
      },
      {
        id: "s2",
        phase: "reason",
        label: "REASON",
        content: "Two-step task: first check availability for next Tuesday, then create the calendar event if a slot is open.",
      },
      {
        id: "s3",
        phase: "act",
        label: "TOOL CALL",
        content: "Checking calendar availability",
        toolCall: "check_availability(date='2026-09-29', duration=30, team='sales')",
      },
      {
        id: "s4",
        phase: "result",
        label: "TOOL RESULT",
        content: "Available slots found",
        toolResult: '{ "slots": ["10:00 AM", "2:00 PM", "4:30 PM"], "timezone": "UTC" }',
      },
      {
        id: "s5",
        phase: "act",
        label: "TOOL CALL",
        content: "Creating calendar event",
        toolCall: "create_event(date='2026-09-29', time='10:00', duration=30, attendees=['sales@company.com'])",
      },
      {
        id: "s6",
        phase: "respond",
        label: "FINAL RESPONSE",
        content:
          "Done! A 30-minute call with the sales team is booked for Tuesday, September 29 at 10:00 AM UTC. A calendar invite has been sent.",
      },
    ],
    finalResponse: "Meeting booked: Tuesday Sep 29, 10:00 AM UTC with the sales team. Invite sent.",
  },
];

export const AGENT_PHASE_COLORS: Record<string, string> = {
  observe: "#0ea5e9",
  reason: "#8b5cf6",
  act: "#f59e0b",
  result: "#10b981",
  respond: "#2563EB",
};

// ─── MODULE 04: TOOL CALLING ───────────────────────────────────────────────────

export interface ToolScenario {
  id: string;
  label: string;
  userInput: string;
  detectedIntent: string;
  selectedTool: ToolDefinition;
  toolParams: Record<string, string>;
  toolResult: string;
  finalResponse: string;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: ToolParam[];
}

export interface ToolParam {
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export const TOOL_SCENARIOS: ToolScenario[] = [
  {
    id: "weather",
    label: "Weather Lookup",
    userInput: "What's the weather like in London right now?",
    detectedIntent: "WEATHER_QUERY",
    selectedTool: {
      name: "get_weather",
      description: "Returns current weather conditions for a given location",
      parameters: [
        { name: "location", type: "string", description: "City name or coordinates", required: true },
        { name: "units", type: "string", description: "'celsius' or 'fahrenheit'", required: false },
      ],
    },
    toolParams: { location: "London, UK", units: "celsius" },
    toolResult: '{ "temperature": 14, "condition": "Partly cloudy", "humidity": 72, "wind_kph": 18 }',
    finalResponse: "It's currently 14°C and partly cloudy in London, with 72% humidity and 18 km/h winds.",
  },
  {
    id: "customer",
    label: "Customer Lookup",
    userInput: "Find information about customer john.doe@email.com",
    detectedIntent: "CUSTOMER_LOOKUP",
    selectedTool: {
      name: "lookup_customer",
      description: "Retrieves customer account data by email or ID",
      parameters: [
        { name: "email", type: "string", description: "Customer email address", required: false },
        { name: "customer_id", type: "string", description: "Customer account ID", required: false },
        { name: "fields", type: "array", description: "Specific fields to return", required: false },
      ],
    },
    toolParams: { email: "john.doe@email.com" },
    toolResult: '{ "id": "cust_1829", "name": "John Doe", "plan": "Pro", "joined": "2024-03", "orders": 14, "lifetime_value": "$2,340" }',
    finalResponse: "Customer John Doe (cust_1829) is on the Pro plan, joined in March 2024, with 14 orders and $2,340 lifetime value.",
  },
  {
    id: "calculator",
    label: "Math Calculation",
    userInput: "Calculate compound interest on $10,000 at 5% for 3 years",
    detectedIntent: "MATH_COMPUTATION",
    selectedTool: {
      name: "calculate",
      description: "Performs mathematical calculations with precision",
      parameters: [
        { name: "expression", type: "string", description: "Mathematical expression to evaluate", required: true },
        { name: "precision", type: "integer", description: "Decimal places in result", required: false },
      ],
    },
    toolParams: {
      expression: "10000 * (1 + 0.05)^3",
      precision: "2",
    },
    toolResult: '{ "result": 11576.25, "expression": "10000 * (1.05)^3", "steps": ["1.05^3 = 1.157625", "10000 × 1.157625 = 11576.25"] }',
    finalResponse: "$10,000 at 5% compound interest for 3 years grows to $11,576.25 — a gain of $1,576.25.",
  },
];
