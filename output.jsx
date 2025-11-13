
import React from "react";
import { Handle, Position } from "reactflow";

export default function OutputNode({ data }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #3a0072, #290045)",
        borderRadius: "12px",
        padding: "14px 18px",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 0 15px rgba(140,78,255,0.4)",
        color: "white",
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        width: 200,
      }}
    >
      <strong>Output</strong>
      <p style={{ fontSize: "0.9rem", marginTop: "4px" }}>
        {data?.value || "Result here"}
      </p>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
