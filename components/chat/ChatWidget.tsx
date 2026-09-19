"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! I'm Raj's portfolio AI assistant. Raj is an Associate AI Developer specializing in AI automation, LLM solutions, autonomous agents, and workflow systems. How can I help you today?",
  timestamp: new Date(),
};

const QUICK_CHIPS = [
  { label: "What services do you offer?", action: "services" },
  { label: "Show me your work", action: "work" },
  { label: "I want to get a quote", action: "quote" },
] as const;

const FONT = "var(--font-inter), Inter, -apple-system, sans-serif";
const EMAIL = "ponkiyaraj7@gmail.com";

const HIRE_NUDGE_COPY = [
  {
    question: "Have a project idea in mind?",
    yes: "Yes, copy email",
    noA: "Not yet",
    noB: "Show me proof",
  },
  {
    question: "Fair. Is the idea not ready, or is my timing dramatic?",
    yes: "Copy it anyway",
    noA: "Idea not ready",
    noB: "Too early",
  },
  {
    question: "Reasonable. But if the idea wakes up tonight, should the email be ready?",
    yes: "Leave it ready",
    noA: "Still resisting",
    noB: "Make me smile",
  },
  {
    question: "Strong resistance. I respect it. One final tiny nudge?",
    yes: "Fine, copy it",
    noA: "Loop again",
    noB: "Hide this",
  },
];

async function copyEmailToClipboard() {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = EMAIL;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

export default function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [hireNudgeVisible, setHireNudgeVisible] = useState(false);
  const [hireNudgeStep, setHireNudgeStep] = useState(0);
  const [hireNudgeCopied, setHireNudgeCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setHireNudgeVisible(true), 30000);
    return () => window.clearTimeout(timeout);
  }, []);

  // Listen for external openChat event (from ContactSection CTA)
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener("openChat", handleOpenChat);
    return () => window.removeEventListener("openChat", handleOpenChat);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isStreaming) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setShowChips(false);
      setIsStreaming(true);

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      try {
        abortControllerRef.current = new AbortController();

        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok || !response.body) throw new Error("Bad response");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          const snap = accumulated;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: snap } : m))
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: "Sorry, I'm having trouble connecting right now. Please try again!" }
                : m
            )
          );
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const showQuoteLink =
    messages.length > 1 &&
    messages.some(
      (m) =>
        m.role === "assistant" &&
        (m.content.toLowerCase().includes("quote") ||
          m.content.toLowerCase().includes("/quote"))
    );

  const hireNudge = HIRE_NUDGE_COPY[hireNudgeStep];
  const showHireNudge = hireNudgeVisible && !isOpen;

  const appendLocalReply = (userContent: string, assistantContent: string) => {
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: `${now}`, role: "user", content: userContent, timestamp: new Date() },
      { id: `${now + 1}`, role: "assistant", content: assistantContent, timestamp: new Date() },
    ]);
    setShowChips(false);
  };

  const scrollToWork = () => {
    setHireNudgeVisible(false);
    const target = document.getElementById("work");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#work");
      return;
    }
    window.location.href = "/#work";
  };

  const handleQuickChip = (chip: (typeof QUICK_CHIPS)[number]) => {
    if (chip.action === "services") {
      appendLocalReply(
        chip.label,
        "Raj specializes in AI development, LLM solutions, autonomous AI agents, and business workflow automation. To discuss your project, head over to the quote page."
      );
      return;
    }

    if (chip.action === "work") {
      appendLocalReply(chip.label, "Taking you to the proof of work section.");
      window.setTimeout(() => {
        setIsOpen(false);
        scrollToWork();
      }, 180);
      return;
    }

    appendLocalReply(chip.label, "Opening the quote page now.");
    window.setTimeout(() => router.push("/quote"), 180);
  };

  const handleHireYes = async () => {
    await copyEmailToClipboard();
    setHireNudgeCopied(true);
    window.setTimeout(() => setHireNudgeVisible(false), 4200);
  };

  const handleHireNo = (hide = false) => {
    if (hide) {
      setHireNudgeVisible(false);
      return;
    }
    setHireNudgeStep((step) => (step + 1) % HIRE_NUDGE_COPY.length);
  };

  return (
    <>
      {/* Hire nudge */}
      {showHireNudge && (
      <div
        className="hire-nudge"
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "92px",
          width: "286px",
          maxWidth: "calc(100vw - 48px)",
          borderRadius: "8px",
          border: "1px solid rgba(45,106,79,0.16)",
          background: "rgba(255,255,255,0.82)",
          boxShadow: "0 18px 46px rgba(16,35,28,0.12)",
          backdropFilter: "blur(22px) saturate(160%)",
          WebkitBackdropFilter: "blur(22px) saturate(160%)",
          padding: "12px",
          zIndex: 9997,
          fontFamily: FONT,
        }}
      >
        <button
          type="button"
          aria-label="Dismiss hire prompt"
          onClick={() => setHireNudgeVisible(false)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "0",
            background: "rgba(16,35,28,0.06)",
            color: "#52645c",
            cursor: "pointer",
            fontSize: "15px",
            lineHeight: 1,
          }}
        >
          x
        </button>

        <div style={{ paddingRight: "26px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "#1f7a5c",
              fontSize: "11px",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#1f7a5c",
                boxShadow: "0 0 0 5px rgba(31,122,92,0.1)",
              }}
            />
            After 30 seconds
          </span>

          <p
            style={{
              margin: "9px 0 0",
              color: "#10231c",
              fontSize: "14px",
              lineHeight: 1.45,
              fontWeight: 750,
            }}
          >
            {hireNudgeCopied ? "Copied. Email is on your clipboard." : hireNudge.question}
          </p>
        </div>

        {!hireNudgeCopied && (
          <div style={{ display: "grid", gap: "7px", marginTop: "12px" }}>
            <button
              type="button"
              onClick={handleHireYes}
              style={{
                minHeight: "38px",
                border: "0",
                borderRadius: "999px",
                background: "#2d6a4f",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              {hireNudge.yes}
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
              <button
                type="button"
                onClick={() => handleHireNo(false)}
                style={{
                  minHeight: "34px",
                  border: "1px solid rgba(16,35,28,0.1)",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.72)",
                  color: "#52645c",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {hireNudge.noA}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (hireNudge.noB === "Show me proof") {
                    scrollToWork();
                    return;
                  }
                  handleHireNo(hireNudge.noB === "Hide this");
                }}
                style={{
                  minHeight: "34px",
                  border: "1px solid rgba(16,35,28,0.1)",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.72)",
                  color: "#52645c",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {hireNudge.noB}
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* ── FLOATING BUBBLE ── */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Chat with Raj's AI Assistant"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#2d6a4f",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(45,106,79,0.3)",
          zIndex: 9999,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(45,106,79,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(45,106,79,0.3)";
        }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      <div
        className="chat-window"
        style={{
          position: "fixed",
          bottom: "92px",
          right: "24px",
          width: "360px",
          height: "480px",
          maxHeight: "calc(100vh - 48px)",
          maxWidth: "calc(100vw - 48px)",
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 20px 60px rgba(0,0,0,0.08)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transformOrigin: "bottom right",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
          transform: isOpen ? "scale(1)" : "scale(0.88)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          fontFamily: FONT,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            height: "56px",
            background: "#2d6a4f",
            borderRadius: "20px 20px 0 0",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.9)" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="rgba(255,255,255,0.9)" />
              <circle cx="18" cy="5" r="1.5" fill="#b7e4c7" />
              <circle cx="20" cy="8" r="1" fill="#b7e4c7" />
            </svg>
          </div>

          {/* Name + status */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#ffffff", fontFamily: FONT }}>
                Raj AI
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#52b788",
                  display: "inline-block",
                  animation: "onlinePulse 2s ease-in-out infinite",
                }}
              />
            </div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "1px", fontFamily: FONT }}>
              Portfolio Assistant
            </div>
          </div>

          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* MESSAGES AREA */}
        <div
          className="chat-messages"
          data-lenis-prevent="true"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {messages.map((msg, i) => {
            const nextMsg = messages[i + 1];
            const isLastInGroup = !nextMsg || nextMsg.role !== msg.role;
            return (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: isLastInGroup ? "10px" : "2px",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "#2d6a4f" : "#f5f5f5",
                    color: msg.role === "user" ? "#ffffff" : "#1d1d1f",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                    fontFamily: FONT,
                  }}
                >
                  {msg.content || (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", height: "16px" }}>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#86868b",
                            display: "inline-block",
                            animation: `typingDot 1.2s ease-in-out ${i * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </span>
                  )}
                </div>
                {isLastInGroup && (
                  <span
                    suppressHydrationWarning
                    style={{ fontSize: "10px", color: "#86868b", marginTop: "3px", padding: "0 4px", fontFamily: FONT }}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                )}
              </div>
            );
          })}

          {/* Quick chips — only under welcome message */}
          {showChips && messages.length === 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "4px" }}>
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => handleQuickChip(chip)}
                  style={{
                    padding: "7px 13px",
                    border: "1px solid rgba(45,106,79,0.25)",
                    borderRadius: "100px",
                    background: "rgba(45,106,79,0.04)",
                    color: "#2d6a4f",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.16s ease",
                    fontFamily: FONT,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(45,106,79,0.1)";
                    e.currentTarget.style.borderColor = "rgba(45,106,79,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(45,106,79,0.04)";
                    e.currentTarget.style.borderColor = "rgba(45,106,79,0.25)";
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Contextual quote link */}
          {showQuoteLink && (
            <Link
              href="/quote"
              style={{
                alignSelf: "flex-start",
                padding: "7px 14px",
                borderRadius: "100px",
                background: "#2d6a4f",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                marginTop: "4px",
                transition: "opacity 0.2s",
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Get a Free Quote →
            </Link>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            background: "#ffffff",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isStreaming}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "20px",
              fontSize: "14px",
              color: "#1d1d1f",
              background: "#ffffff",
              outline: "none",
              fontFamily: FONT,
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#2d6a4f")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)")}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={isStreaming || !inputValue.trim()}
            aria-label="Send"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: isStreaming || !inputValue.trim() ? "rgba(0,0,0,0.08)" : "#2d6a4f",
              border: "none",
              cursor: isStreaming || !inputValue.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: isStreaming ? 0.5 : 1,
              transition: "background 0.2s ease, transform 0.1s ease, opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isStreaming && inputValue.trim()) {
                e.currentTarget.style.background = "#3a8a64";
              }
            }}
            onMouseLeave={(e) => {
              if (!isStreaming && inputValue.trim()) {
                e.currentTarget.style.background = "#2d6a4f";
              }
            }}
            onMouseDown={(e) => {
              if (!isStreaming && inputValue.trim()) {
                e.currentTarget.style.transform = "scale(0.92)";
              }
            }}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isStreaming || !inputValue.trim() ? "rgba(0,0,0,0.3)" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── KEYFRAME STYLES ── */}
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.12);
          border-radius: 4px;
        }
        .chat-messages {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.12) transparent;
        }
        @media (max-width: 640px) {
          .hire-nudge {
            right: 16px !important;
            bottom: 88px !important;
            width: min(286px, calc(100vw - 32px)) !important;
          }
          .chat-window {
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            max-width: 100vw !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
