"use client";

interface IconProps {
  color: string;
}

const icons: Record<string, React.FC<IconProps>> = {
  "Next.js": ({ color }) => (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.12)" />
      <path d="M10.6 15.65L5.43 8.12V16.87H4.25V7.12H5.43L10.65 14.71L14.06 9.15V14.71H15.25V8.12H14.06L10.6 15.65Z" fill={color} />
    </svg>
  ),
  "React": () => (
    <svg viewBox="-11.5 -10.23 23 20.46" style={{ width: "100%", height: "100%" }}>
      <circle cx="0" cy="0" r="2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  "TypeScript": () => (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.25 10H6V11.5H7.75V18H9.5V11.5H11.25V10ZM18.5 14C18.5 13 17.5 12.5 16 12C14.75 11.75 14.5 11.5 14.5 11C14.5 10.5 15 10.25 15.5 10.25C16.25 10.25 16.5 10.5 16.75 11L18.25 10C17.75 9 16.75 8.5 15.5 8.5C14 8.5 12.5 9.25 12.5 11C12.5 12 13.5 12.5 15 13C16.5 13.5 16.5 13.75 16.5 14.25C16.5 15 15.75 15.25 15.25 15.25C14.25 15.25 13.75 14.5 13.5 14L12 15C12.5 16 13.75 17 15.25 17C17 17 18.5 16 18.5 14Z" fill="white" />
    </svg>
  ),
  "Angular": () => (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
      <path d="M12 2.5L2 6.5L3.7 18.5L12 22.5L20.3 18.5L22 6.5L12 2.5Z" fill="#DD0031" />
      <path d="M12 2.5V22.5L20.3 18.5L22 6.5L12 2.5Z" fill="#C3002F" />
      <path d="M12 5.5L7 17.5H9L10 14.5H14L15 17.5H17L12 5.5ZM12 9.5L13.4 13H10.6L12 9.5Z" fill="white" />
    </svg>
  ),
  "Node.js": () => (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
      <path d="M12 1.85c-.27 0-.55.07-.78.2L2.78 7.03c-.48.28-.78.8-.78 1.36v9.22c0 .56.3 1.08.78 1.36l8.44 4.98c.23.13.5.2.78.2.27 0 .55-.07.78-.2l8.44-4.98c.48-.28.78-.8.78-1.36V8.4c0-.57-.3-1.08-.78-1.37l-8.44-4.98c-.23-.13-.51-.2-.78-.2z" fill="#339933" />
      <path d="M12 4.5L7 7.5V13L12 16L17 13V7.5L12 4.5ZM12 14L9 12.5V9L12 7.5L15 9V12.5L12 14Z" fill="white" fillOpacity="0.9" />
    </svg>
  ),
  "Generative AI": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="genai-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#genai-grad)" />
      <circle cx="18" cy="6" r="2" fill={color} fillOpacity="0.6" />
      <circle cx="6" cy="18" r="1.5" fill={color} fillOpacity="0.4" />
    </svg>
  ),
  "RAG": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x="2" y="3" width="20" height="4" rx="2" fill={color} fillOpacity="0.7" />
      <rect x="2" y="10" width="14" height="4" rx="2" fill={color} fillOpacity="0.5" />
      <rect x="2" y="17" width="10" height="4" rx="2" fill={color} fillOpacity="0.3" />
      <circle cx="20" cy="19" r="3" fill={color} />
      <path d="M19 19L21 19M20 18L20 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "OpenAI": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 3.99-2.9 6.06 6.06 0 0 0-.74-7.07zM13.26 22.37a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68V11.1l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.47zM3.6 18.24a4.47 4.47 0 0 1-.53-3.01l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.71zm-1.22-9.9A4.48 4.48 0 0 1 4.74 6.4V11.6a.77.77 0 0 0 .39.68l5.81 3.35L8.93 16.8a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.38 8.34zm16.6 3.86L13.1 8.86l2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.4-.67l.04.06zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.41 9.7V7.37a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86l-2.02-1.16a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.39.68l-.01 6.72zm1.1-2.37 2.6-1.5 2.61 1.5v2.99l-2.6 1.5-2.6-1.5V10.49z" fill={color} />
    </svg>
  ),
  "LangChain": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x="2" y="10" width="6" height="4" rx="2" fill={color} fillOpacity="0.8" />
      <rect x="9" y="10" width="6" height="4" rx="2" fill={color} fillOpacity="0.6" />
      <rect x="16" y="10" width="6" height="4" rx="2" fill={color} fillOpacity="0.4" />
      <path d="M8 12H9M15 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "ElevenLabs": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x="3" y="3" width="3" height="18" rx="1.5" fill={color} />
      <rect x="8" y="6" width="3" height="12" rx="1.5" fill={color} fillOpacity="0.7" />
      <rect x="13" y="2" width="3" height="20" rx="1.5" fill={color} fillOpacity="0.9" />
      <rect x="18" y="7" width="3" height="10" rx="1.5" fill={color} fillOpacity="0.6" />
    </svg>
  ),
  "Python": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M12 2C8 2 8 5 8 5H16V7H8C6 7 5 8.5 5 11C5 13.5 6 15 8 15H10V13C10 11.5 11.5 10 13 10H17C18.5 10 20 8.5 20 6C20 3.5 18.5 2 17 2H12Z" fill="#3776AB" />
      <path d="M12 22C16 22 16 19 16 19H8V17H16C18 17 19 15.5 19 13C19 10.5 18 9 16 9H14V11C14 12.5 12.5 14 11 14H7C5.5 14 4 15.5 4 18C4 20.5 5.5 22 7 22H12Z" fill="#FFD43B" />
    </svg>
  ),
  "FastAPI": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <circle cx="12" cy="12" r="12" fill="#009688" />
      <path d="M12.5 3L5 13.5h7.5L11.5 21l7.5-10.5H11.5L12.5 3Z" fill="white" />
    </svg>
  ),
  "Flutter": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M14.314 0L2.3 12L7.1 16.8L19.114 4.8L14.314 0Z" fill="#027DFD" opacity="0.85" />
      <path d="M14.314 11.23L11.028 14.516L14.314 17.802L19.114 13.003L14.314 11.23Z" fill="#027DFD" />
      <path d="M7.1 16.8L14.314 24.014H19.114L9.5 14.4L7.1 16.8Z" fill="#01579B" />
    </svg>
  ),
  "Dart": () => (
    <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }}>
      <path d="M12.9 2L2 12.9V17.5L8.2 23.7C8.6 24.1 9.2 24.1 9.6 23.7L22 11.3V5.5L18.5 2H12.9Z" fill="#0175C2" opacity="0.85" />
      <path d="M18.5 2H12.9L9.6 5.3L18.5 14V2Z" fill="#0175C2" />
    </svg>
  ),
  "RevenueCat": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect width="24" height="24" rx="6" fill={color} />
      <path d="M6 8h8a4 4 0 0 1 0 8H6V8ZM6 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Firebase": () => (
    <svg viewBox="0 0 32 32" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0z" fill="#FFA000" />
      <path d="M13.445 8.543l2.972 5.995-11.97 11.135z" fill="#F57F17" />
      <path d="M23.123 7.003c.572-.55 1.164-.362 1.315.420l3.116 18.544-10.328 6.19c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z" fill="#FFCA28" />
      <path d="M13.445 8.543L4.447 25.673l4.968-14.836z" fill="#FFA000" />
    </svg>
  ),
  "Supabase": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.957.736 14.25 1.9 14.25h9.5V22.964c.015.986 1.26 1.41 1.874.637l9.262-11.652c.653-.906.028-2.2-1.136-2.2H12.5V1.036h-.6Z" fill="#3ECF8E" />
    </svg>
  ),
  "MongoDB": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M12 2C9 2 7 5 7 9C7 12 8.5 14.5 10 16L10.5 21.5C10.5 21.8 10.7 22 11 22H13C13.3 22 13.5 21.8 13.5 21.5L14 16C15.5 14.5 17 12 17 9C17 5 15 2 12 2Z" fill="#47A248" />
    </svg>
  ),
  "PostgreSQL": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="12" cy="6" rx="8" ry="4" fill="#4169E1" />
      <path d="M4 6V15C4 17.2 7.6 19 12 19C16.4 19 20 17.2 20 15V6" stroke="#4169E1" strokeWidth="2" fill="none" />
      <path d="M4 11C4 13.2 7.6 15 12 15C16.4 15 20 13.2 20 11" stroke="#6B8FFF" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  "AWS": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M7 12.5C5.9 12.1 5 11.3 5 10C5 8.3 6.5 7 8.5 7C8.8 5.3 10.2 4 12 4C13.8 4 15.2 5.3 15.5 7C17.5 7 19 8.3 19 10C19 11.3 18.1 12.1 17 12.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M6 17L5 19H7L8 17M10 15L9 19H11L12 15M14 17L13 19H15L16 17" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "Redis": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M12 3L22 8L12 13L2 8L12 3Z" fill="#DC382D" />
      <path d="M22 12L12 17L2 12" stroke="#DC382D" strokeWidth="1.5" fill="none" />
      <path d="M22 16L12 21L2 16" stroke="#DC382D" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  ),
  "Stripe": () => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path d="M11.116 8.584c0-.648.533-.9 1.41-.9 1.26 0 2.853.382 4.113 1.063V4.896A10.93 10.93 0 0 0 12.526 4C9.274 4 7 5.586 7 8.782c0 4.96 6.822 4.168 6.822 6.307 0 .766-.666 1.017-1.594 1.017-1.378 0-3.135-.567-4.524-1.33v3.902C8.845 19.497 10.37 20 12.228 20c3.32 0 5.722-1.542 5.722-4.787-.017-5.352-6.834-4.404-6.834-6.629Z" fill="white" />
    </svg>
  ),

  // ─── 2026 GenAI / RAG stack ───────────────────────────────────────────────
  "LangGraph": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <circle cx="6"  cy="6"  r="2.4" fill={color} />
      <circle cx="18" cy="6"  r="2.4" fill={color} fillOpacity="0.85" />
      <circle cx="12" cy="13" r="2.6" fill={color} />
      <circle cx="6"  cy="19" r="2.4" fill={color} fillOpacity="0.7" />
      <circle cx="18" cy="19" r="2.4" fill={color} fillOpacity="0.85" />
      <path d="M6 6L12 13L18 6M6 19L12 13L18 19" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" strokeLinecap="round" />
    </svg>
  ),
  "LlamaIndex": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x="3" y="4"  width="18" height="3.2" rx="1.6" fill={color} fillOpacity="0.9" />
      <rect x="3" y="10.4" width="14" height="3.2" rx="1.6" fill={color} fillOpacity="0.65" />
      <rect x="3" y="16.8" width="10" height="3.2" rx="1.6" fill={color} fillOpacity="0.4" />
      <circle cx="20" cy="18.4" r="2.6" fill={color} />
    </svg>
  ),
  "Pinecone": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M12 2L8 8H16L12 2Z" fill={color} />
      <path d="M12 8L9 13H15L12 8Z" fill={color} fillOpacity="0.8" />
      <path d="M12 13L10 18H14L12 13Z" fill={color} fillOpacity="0.6" />
      <circle cx="12" cy="21" r="1.4" fill={color} />
    </svg>
  ),
  "pgvector": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" fill={color} fillOpacity="0.9" />
      <path d="M4 6V14C4 16 7.6 17.5 12 17.5C16.4 17.5 20 16 20 14V6" stroke={color} strokeWidth="1.6" fill="none" />
      <path d="M9 19L12 22L15 19" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M12 17.5V22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Claude": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M7.5 4L3 20H6L7 16.5H12L13 20H16L11.5 4H7.5ZM7.8 14L9.5 8L11.2 14H7.8Z" fill={color} />
      <path d="M17 4L21 20H18.2L17.4 16.5H15.5L17 4Z" fill={color} fillOpacity="0.85" />
    </svg>
  ),
  "Gemini": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="gem-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4285F4" />
          <stop offset="50%"  stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gem-grad)" />
      <circle cx="12" cy="12" r="1.3" fill={color} fillOpacity="0.4" />
    </svg>
  ),
  "Vercel AI SDK": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M12 3L22 20H2L12 3Z" fill={color} />
      <rect x="9" y="14" width="6" height="1.4" rx="0.7" fill="rgba(255,255,255,0.85)" />
      <rect x="10" y="16.4" width="4" height="1.4" rx="0.7" fill="rgba(255,255,255,0.55)" />
    </svg>
  ),
  "MCP": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="4"  cy="12" r="2.2" fill={color} fillOpacity="0.7" />
      <circle cx="20" cy="12" r="2.2" fill={color} fillOpacity="0.7" />
      <circle cx="12" cy="4"  r="2.2" fill={color} fillOpacity="0.55" />
      <circle cx="12" cy="20" r="2.2" fill={color} fillOpacity="0.55" />
      <path d="M6 12H9M15 12H18M12 6V9M12 15V18" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
    </svg>
  ),
  "Cursor": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <path d="M4 3L20 12L13 14L11 21L4 3Z" fill={color} />
      <path d="M4 3L11 21L4 3Z" fill="rgba(255,255,255,0.18)" />
    </svg>
  ),
  "n8n": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <circle cx="5"  cy="12" r="2.6" fill={color} />
      <rect   x="9.4" y="9.4" width="5.2" height="5.2" rx="2.6" fill={color} fillOpacity="0.85" />
      <circle cx="19" cy="12" r="2.6" fill={color} fillOpacity="0.7" />
      <path   d="M7.6 12H9.4M14.6 12H16.4" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "Whisper": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect x="10" y="3" width="4" height="11" rx="2" fill={color} />
      <path d="M6 11C6 14.31 8.69 17 12 17C15.31 17 18 14.31 18 11" stroke={color} strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M12 17V21" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 21H15" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  "Stable Diffusion": ({ color }) => (
    <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="sd-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#E6007E" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#sd-grad)" />
      <circle cx="9"  cy="10" r="1.6" fill="white" fillOpacity="0.9" />
      <path d="M3 19L9 13L13 17L17 13L21 17V21H3V19Z" fill="rgba(255,255,255,0.4)" />
      <circle cx="17" cy="7" r="1" fill={color} fillOpacity="0.6" />
    </svg>
  ),
};

export function SkillIcon({ name, color }: { name: string; color: string }) {
  const Icon = icons[name];
  if (!Icon) {
    return (
      <div style={{
        width: "100%", height: "100%",
        borderRadius: "8px",
        background: `${color}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "14px", fontWeight: 800,
        color: color,
        fontFamily: "var(--font-display), sans-serif",
      }}>
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }
  return <Icon color={color} />;
}
