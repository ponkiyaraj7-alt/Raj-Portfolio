"use client";
// Layer 2B — The "After" mock. A premium 2026 SaaS dashboard with live-feeling UI.
// Animated chart, count-up KPIs, progress ring, AI assistant typing, online dot.

import { useEffect, useRef, useState } from "react";

export default function AliveMock() {
  // Animated KPI values that softly oscillate so the dashboard feels alive
  const [revenue, setRevenue] = useState(48230);
  const [users, setUsers] = useState(1284);
  const [mrr, setMrr] = useState(8.7);

  useEffect(() => {
    const id = setInterval(() => {
      setRevenue((r) => r + Math.round((Math.random() - 0.3) * 40));
      setUsers((u) => u + (Math.random() > 0.4 ? 1 : 0));
      setMrr((m) => +(m + (Math.random() - 0.5) * 0.05).toFixed(2));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #0c1220 0%, #0a0f1c 100%)",
        fontFamily: "var(--font-inter), Inter, sans-serif",
        color: "#e6edf3",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "linear-gradient(135deg, #52b788 0%, #38bdf8 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#0a0f1c", fontSize: 12, fontWeight: 800,
          }}>N</div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }}>Nimbus</div>
          <div style={{
            display: "flex", gap: 14, marginLeft: 18, fontSize: 11,
            color: "rgba(230,237,243,0.55)", fontWeight: 500,
          }}>
            <span style={{ color: "#fff" }}>Overview</span>
            <span>Revenue</span>
            <span>Users</span>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 8px", borderRadius: 100,
          background: "rgba(82,183,136,0.12)",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%", background: "#52b788",
            boxShadow: "0 0 0 0 rgba(82,183,136,0.6)",
            animation: "alivePulse 1.6s ease-in-out infinite",
          }} />
          <div style={{ fontSize: 10, color: "#52b788", fontWeight: 600 }}>Live</div>
        </div>
      </div>

      {/* KPI tiles */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
        padding: 14,
      }}>
        <KPI label="Revenue" value={`$${revenue.toLocaleString()}`} delta="+12.4%" />
        <KPI label="Active users" value={users.toLocaleString()} delta="+3.1%" />
        <KPI label="MRR" value={`$${mrr}k`} delta="+0.8%" />
      </div>

      {/* Chart */}
      <div style={{ flex: 1, padding: "0 14px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 11, color: "rgba(230,237,243,0.55)", fontWeight: 500 }}>
            Revenue · last 30 days
          </div>
          <div style={{ fontSize: 10, color: "rgba(230,237,243,0.4)" }}>30d</div>
        </div>
        <LiveChart />
      </div>

      {/* AI Assistant card */}
      <div style={{
        margin: 14, marginTop: 0,
        padding: "10px 12px", borderRadius: 10,
        background: "rgba(82,183,136,0.07)",
        border: "1px solid rgba(82,183,136,0.18)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "linear-gradient(135deg, #52b788, #38bdf8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12,
        }}>✦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#fff" }}>AI Assistant</div>
          <div style={{ fontSize: 10, color: "rgba(230,237,243,0.55)" }}>Drafting weekly report…</div>
        </div>
        <TypingDots />
      </div>
    </div>
  );
}

function KPI({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div style={{
      padding: "10px 12px",
      borderRadius: 8,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ fontSize: 9, color: "rgba(230,237,243,0.5)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginTop: 4, fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 9, color: "#52b788", marginTop: 2, fontWeight: 600 }}>{delta}</div>
    </div>
  );
}

function LiveChart() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current; if (!svg) return;
    const path = svg.querySelector("path.line") as SVGPathElement | null;
    const area = svg.querySelector("path.area") as SVGPathElement | null;
    if (!path || !area) return;

    const W = 100, H = 30;
    let t = 0;
    let raf = 0;
    const tick = () => {
      t += 0.012;
      const pts: string[] = [];
      const N = 40;
      for (let i = 0; i < N; i++) {
        const x = (i / (N - 1)) * W;
        const y = H * 0.5
          + Math.sin(i * 0.45 + t) * H * 0.18
          + Math.sin(i * 0.18 + t * 0.7) * H * 0.10
          + (Math.sin(t + i * 0.05) * 0.4);
        pts.push(`${x.toFixed(2)},${(H - y).toFixed(2)}`);
      }
      const d = "M " + pts.join(" L ");
      path.setAttribute("d", d);
      area.setAttribute("d", `${d} L ${W} ${H} L 0 ${H} Z`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: "100%", height: 78 }}>
      <defs>
        <linearGradient id="aliveAreaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#52b788" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#52b788" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="area" fill="url(#aliveAreaG)" />
      <path className="line" fill="none" stroke="#52b788" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 4, height: 4, borderRadius: "50%", background: "#52b788",
          animation: `aliveType 1.2s ease-in-out ${i * 0.18}s infinite`,
        }} />
      ))}
    </div>
  );
}
