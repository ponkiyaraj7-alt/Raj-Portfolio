"use client";
// Layer 2A — The "Before" mock. Deliberately, lovingly cringe-worthy 2014-era portfolio.
// Every choice here is on purpose: the bevel button, the emojis, the visitor counter,
// the comic-sans-adjacent header, the broken image. Devs will recognize it instantly.

export default function DeadMock() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: "#f3efe6", // aged paper
        fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
        color: "#3a3a3a",
        overflow: "hidden",
        padding: "20px 26px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {/* Browser-y top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <Dot c="#ff5f57" />
          <Dot c="#febc2e" />
          <Dot c="#28c840" />
        </div>
        <div style={{
          flex: 1, height: 22, marginLeft: 10, padding: "0 10px",
          background: "#fff", border: "1px solid #d8d2c4", borderRadius: 4,
          fontFamily: "Tahoma, Verdana, sans-serif", fontSize: 11, color: "#7c7565",
          display: "flex", alignItems: "center",
        }}>
          http://www.webstudio2014.com/index.html
        </div>
      </div>

      {/* "Logo" */}
      <div style={{
        fontSize: 26, fontWeight: 800,
        background: "linear-gradient(180deg, #6f2ad8 0%, #ff4dbd 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textShadow: "1px 1px 0 rgba(0,0,0,0.08)",
        letterSpacing: "-0.5px",
      }}>
        WebStudio™
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.05, color: "#2a2a2a" }}>
        Welcome to my Website! <span aria-hidden>🚀✨</span>
      </div>

      {/* Body */}
      <div style={{
        fontSize: 12, color: "#666", lineHeight: 1.45,
        fontFamily: "'Times New Roman', serif", maxWidth: 420,
      }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>

      {/* Broken image placeholder */}
      <div style={{
        width: 110, height: 70, border: "1px solid #c9c1ad", background: "#fffefb",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        fontFamily: "Tahoma, sans-serif", fontSize: 10, color: "#9a8e72",
      }}>
        <BrokenImg /> image not found
      </div>

      {/* Bevel "Click Here" button */}
      <div style={{ marginTop: 4 }}>
        <button style={{
          fontFamily: "'Comic Sans MS', cursive",
          fontSize: 16, fontWeight: 700,
          padding: "10px 26px",
          color: "#3a1a00",
          background: "linear-gradient(180deg, #ffe680 0%, #ffb347 100%)",
          border: "2px outset #c98a14",
          borderRadius: 6,
          cursor: "default",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 0 #8a5d09",
        }}>
          Click Here!!!
        </button>
      </div>

      {/* Bottom row: visitor counter + best-viewed-in */}
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{
          background: "#000", color: "#0f0",
          padding: "3px 8px", fontFamily: "'Courier New', monospace",
          fontSize: 11, letterSpacing: "1px", border: "1px solid #444",
        }}>
          VISITORS: 00012
        </div>
        <div style={{ fontSize: 9, color: "#9a8e72", fontFamily: "Tahoma, sans-serif" }}>
          Best viewed in Internet Explorer 6 · 800×600
        </div>
      </div>

      {/* WCAG warning sticker (meta-joke for devs) */}
      <div style={{
        position: "absolute", top: 56, right: 14,
        background: "#ffd6d6", border: "1px dashed #c44",
        color: "#a33", fontSize: 9, padding: "3px 6px",
        fontFamily: "Tahoma, sans-serif", transform: "rotate(4deg)",
      }}>
        ⚠ Contrast: 2.1:1 (FAIL)
      </div>
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />;
}

function BrokenImg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8e72" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 16l5-5 5 5 3-3 5 5" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </svg>
  );
}
