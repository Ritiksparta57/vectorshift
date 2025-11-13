
import React, { useState, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export default function TextNode({ id, data }) {
  const [textValue, setTextValue] = useState(data?.value || "");
  const [variables, setVariables] = useState([]);
  const [size, setSize] = useState({ width: 240, height: 120 });
  const { setNodes } = useReactFlow();
  const textareaRef = useRef(null);

  useEffect(() => {
    const matches = [...textValue.matchAll(VARIABLE_REGEX)];
    const vars = matches.map((m) => m[1]);
    setVariables(vars);
  }, [textValue]);
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
      setSize({
        width: Math.min(300, 160 + textValue.length * 0.8),
        height: Math.max(300, el.scrollHeight + 60),
      });
    }
  }, [textValue]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? { ...n, data: { ...n.data, value: textValue, variables } }
          : n
      )
    );
  }, [textValue, variables, id, setNodes]);

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
        width: size.width,
        height: size.height,
        transition: "all 0.2s ease",
      }}
    >
      <strong>Text Node</strong>
      <p style={{ fontSize: "0.8rem" }}>
        Type text with variables like <code>{"{{name}}"}</code>
      </p>

      <textarea
        ref={textareaRef}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        placeholder="Enter text here..."
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.1)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px",
          resize: "none",
          outline: "none",
          fontSize: "0.85rem",
          fontFamily: "inherit",
        }}
      />

      {variables.length > 0 && (
        <p style={{ fontSize: "0.75rem", opacity: 0.8, marginTop: "6px" }}>
          Detected variables: {variables.join(", ")}
        </p>
      )}

      {variables.map((v, i) => (
        <Handle
          key={i}
          type="source"
          position={Position.Right}
          id={`var-${v}`}
          style={{
            top: `${(i + 1) * 25}px`,
            background: "#9b5eff",
            border: "1px solid white",
          }}
        />
      ))}

      {/* Main output handle */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
