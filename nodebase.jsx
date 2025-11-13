
import React from "react";
import { Handle, Position } from "reactflow";

export default function NodeBase({ title, description, color = "#8c4eff" }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #3a0072, #290045)",
        borderRadius: "12px",
        padding: "14px 18px",
        border: `1px solid ${color}`,
        boxShadow: `0 0 15px ${color}80`,
        color: "white",
        fontFamily: "Inter, sans-serif",
        width: 180,
      }}
    >
      <strong>{title}</strong>
      <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{description}</p>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
