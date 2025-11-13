import React, { useEffect, useState, useRef } from "react";
import { Handle, Position } from "reactflow";

export default function LLMNode({ id, data }) {
  const [response, setResponse] = useState(data?.value || "Waiting for input...");
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef(null);
  useEffect(() => {
    if (!data?.value || data.value.trim() === "") {
      setResponse("Waiting for input...");
      return;
    }
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        setResponse("Processing input...");
const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    pipeline: data.value || "",
  }),
});

const result = await res.json();
setResponse(result.status || "Error: No response from backend.");

      } catch (err) {
        setResponse("Error processing input ❌");
        console.error("LLM backend error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 700);

    return () => clearTimeout(debounceTimeout.current);
  }, [data?.value]);

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
        width: 220,
        transition: "all 0.3s ease",
      }}
    >
      <strong>LLM Node</strong>
      <p style={{ fontSize: "0.85rem", opacity: 0.9, marginTop: "5px" }}>
        {isLoading ? "Processing..." : response}
      </p>

      <Handle type="target" position={Position.Left} style={{ background: "#ffc107" }} />
      <Handle type="source" position={Position.Right} style={{ background: "#00e5ff" }} />
    </div>
  );
}
