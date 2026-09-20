import React from "react";

interface WorkflowConnectionProps {
  isVertical?: boolean;
  isActive?: boolean;
}

export default function WorkflowConnection({ isVertical = false, isActive = false }: WorkflowConnectionProps) {
  if (isVertical) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px 0",
          position: "relative",
        }}
        aria-hidden="true"
      >
        <div style={{ width: "1px", height: "12px", background: isActive ? "#2563EB" : "#E2E5E9" }} />
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: isActive ? "#2563EB" : "#CBD2D9",
            margin: "2px 0",
            boxShadow: isActive ? "0 0 6px rgba(37, 99, 235, 0.6)" : "none",
          }}
        />
        <div style={{ width: "1px", height: "12px", background: isActive ? "#2563EB" : "#E2E5E9" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 4px",
        position: "relative",
      }}
      aria-hidden="true"
    >
      <div style={{ height: "1px", width: "16px", background: isActive ? "#2563EB" : "#E2E5E9" }} />
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: isActive ? "#2563EB" : "#CBD2D9",
          margin: "0 2px",
          boxShadow: isActive ? "0 0 6px rgba(37, 99, 235, 0.6)" : "none",
        }}
      />
      <div style={{ height: "1px", width: "16px", background: isActive ? "#2563EB" : "#E2E5E9" }} />
    </div>
  );
}
