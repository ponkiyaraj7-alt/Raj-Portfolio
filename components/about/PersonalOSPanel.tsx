"use client";
// The personal command center.
// 4 stacked panes inside a glass dark panel with a faux-OS top bar.

import PaneNow from "./PaneNow";
import PaneActivity from "./PaneActivity";
import PaneShipping from "./PaneShipping";
import PaneFooter from "./PaneFooter";

const TABS = ["now", "activity", "shipping", "contact"];

export default function PersonalOSPanel() {
  return (
    <aside
      aria-label="Personal status panel"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #0f1626 0%, #0a0f1c 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow:
          "0 40px 100px rgba(8,12,22,0.20), 0 8px 28px rgba(8,12,22,0.10), 0 0 0 1px rgba(15,23,42,0.04)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top chrome bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{ display: "flex", gap: 6 }} aria-hidden>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{
          flex: 1, display: "flex", justifyContent: "center",
        }}>
          <div style={{
            display: "inline-flex", gap: 4,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 100,
            padding: 3,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.04em",
          }}>
            {TABS.map((t, i) => (
              <span
                key={t}
                aria-hidden
                style={{
                  padding: "4px 10px", borderRadius: 100,
                  background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
                  color: i === 0 ? "#ffffff" : "rgba(255,255,255,0.45)",
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, color: "rgba(255,255,255,0.30)",
        }}>
          v3
        </div>
      </div>

      {/* Panes */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PaneNow />
        <Divider />
        <PaneActivity />
        <Divider />
        <PaneShipping />
      </div>

      <PaneFooter />

      {/* Visually-hidden DL for screen readers — semantic mirror */}
      <dl style={{
        position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
        overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
      }}>
        <dt>Status</dt><dd>Available for new projects</dd>
        <dt>Focus</dt><dd>AI development & workflow automation</dd>
        <dt>Location</dt><dd>Ahmedabad, Gujarat, India</dd>
        <dt>Reply time</dt><dd>Prompt</dd>
      </dl>
    </aside>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      style={{
        height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
      }}
    />
  );
}
