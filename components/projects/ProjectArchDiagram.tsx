"use client";

import { useState } from "react";
import { ArchNode } from "./projectData";

interface ArchDiagramProps {
  nodes: ArchNode[];
  accent: string;
}

interface TooltipState {
  nodeId: string;
  x: number;
  y: number;
}

export default function ProjectArchDiagram({ nodes, accent }: ArchDiagramProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const handleMouseEnter = (nodeId: string, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement)
      .closest("[data-node-id]")
      ?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ nodeId, x: rect.left + rect.width / 2, y: rect.top });
  };

  const hoveredNode = tooltip ? nodes.find((n) => n.id === tooltip.nodeId) : null;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Node column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          maxWidth: "360px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {nodes.map((node, idx) => {
          const isLast = idx === nodes.length - 1;
          const nodeAccent = node.isAccent ? accent : undefined;

          return (
            <div key={node.id} style={{ position: "relative" }}>
              {/* Node card */}
              <div
                data-node-id={node.id}
                onMouseEnter={(e) => handleMouseEnter(node.id, e)}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  background: "#FFFFFF",
                  border: `1.5px solid ${nodeAccent ? nodeAccent + "45" : "#E2E5E9"}`,
                  borderLeft: `3px solid ${nodeAccent ?? "#E2E5E9"}`,
                  borderRadius: "10px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "default",
                  transition: "all 0.2s ease",
                  boxShadow: nodeAccent
                    ? `0 2px 12px -2px ${nodeAccent}20`
                    : "0 1px 3px rgba(17,19,24,0.03)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: nodeAccent ? `${nodeAccent}15` : "#F1F3F5",
                    border: `1px solid ${nodeAccent ? nodeAccent + "30" : "#E2E5E9"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {node.isAI ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={nodeAccent ?? "#8A919C"} strokeWidth="2.2">
                      <path d="M12 2v20M17 5v14M22 10v4M7 5v14M2 10v4" />
                    </svg>
                  ) : (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        fontFamily: "ui-monospace, monospace",
                        color: nodeAccent ?? "#8A919C",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Labels */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#111318",
                      fontFamily: "var(--font-display), sans-serif",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.25,
                    }}
                  >
                    {node.label}
                  </div>
                  {node.sublabel && (
                    <div
                      style={{
                        fontSize: "10.5px",
                        color: "#8A919C",
                        fontFamily: "ui-monospace, monospace",
                        marginTop: "2px",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {node.sublabel}
                    </div>
                  )}
                </div>

                {/* AI badge */}
                {node.isAI && (
                  <div
                    style={{
                      fontSize: "9px",
                      fontWeight: 800,
                      fontFamily: "ui-monospace, monospace",
                      color: accent,
                      background: `${accent}12`,
                      border: `1px solid ${accent}30`,
                      borderRadius: "4px",
                      padding: "2px 6px",
                      letterSpacing: "0.06em",
                      flexShrink: 0,
                    }}
                  >
                    AI
                  </div>
                )}
              </div>

              {/* Connector line between nodes */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    width: "1.5px",
                    height: "16px",
                    background: `linear-gradient(to bottom, ${nodeAccent ?? "#CBD2D9"}, #E2E5E9)`,
                    zIndex: 1,
                    marginTop: 0,
                  }}
                />
              )}

              {/* Spacer for connector */}
              {!isLast && <div style={{ height: "16px" }} />}
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {tooltip && hoveredNode && (
        <div
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 8}px`,
            transform: "translate(-50%, -100%)",
            background: "#111318",
            color: "#FFFFFF",
            borderRadius: "10px",
            padding: "12px 14px",
            fontSize: "12.5px",
            lineHeight: 1.55,
            maxWidth: "220px",
            zIndex: 9999,
            boxShadow: "0 8px 24px rgba(17,19,24,0.2)",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "4px", color: "#FFFFFF" }}>
            {hoveredNode.label}
          </div>
          <div style={{ color: "#A0A6B0", fontSize: "11.5px" }}>{hoveredNode.role}</div>
          {hoveredNode.tech && (
            <div
              style={{
                marginTop: "6px",
                paddingTop: "6px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                color: "#6B9FFF",
                fontSize: "11px",
                fontFamily: "ui-monospace, monospace",
                fontWeight: 600,
              }}
            >
              {hoveredNode.tech}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
