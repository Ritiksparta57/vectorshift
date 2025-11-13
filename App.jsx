
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { submitPipeline } from "./submit";
import NodeFactory from "./components/nodefactory";
import { NODE_DEFINITIONS } from "./nodes/nodedef";

import TextNode from "./nodes/textnode";
import LLMNode from "./nodes/llmnode";
import OutputNode from "./nodes/output";

const initialNodes = [
  { id: "input1", type: "input", position: { x: 100, y: 100 }, data: { label: "Provide data" } },
  { id: "summarizer1", type: "summarizer", position: { x: 400, y: 100 }, data: { label: "Summarize long text" } },
  { id: "sentiment1", type: "sentiment", position: { x: 700, y: 100 }, data: { label: "Detect sentiment" } },
  { id: "delay1", type: "delay", position: { x: 1000, y: 100 }, data: { label: "Wait for a few seconds" } },
  { id: "validator1", type: "validator", position: { x: 1300, y: 100 }, data: { label: "Check input validity" } },
  { id: "text1", type: "textNode", position: { x: 200, y: 400 }, data: { value: "", variables: [] } },
  { id: "llm1", type: "llmNode", position: { x: 600, y: 400 }, data: { value: "Waiting for input..." } },
  { id: "output1", type: "outputNode", position: { x: 1000, y: 400 }, data: { value: "Final Output: Waiting for input..." } },
];

const initialEdges = [
  { id: "input-sum", source: "input1", target: "summarizer1", animated: true, style: { stroke: "#9a6bff" } },
  { id: "sum-sent", source: "summarizer1", target: "sentiment1", animated: true, style: { stroke: "#9a6bff" } },
  { id: "sent-delay", source: "sentiment1", target: "delay1", animated: true, style: { stroke: "#9a6bff" } },
  { id: "delay-val", source: "delay1", target: "validator1", animated: true, style: { stroke: "#9a6bff" } },
  { id: "text-llm", source: "text1", target: "llm1", animated: true, style: { stroke: "#8c4eff" } },
  { id: "llm-output", source: "llm1", target: "output1", animated: true, style: { stroke: "#00e5ff" } },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);

  const nodeTypes = useMemo(
    () => ({
      textNode: TextNode,
      llmNode: LLMNode,
      outputNode: OutputNode,
      ...Object.keys(NODE_DEFINITIONS).reduce((acc, key) => {
        acc[key] = (props) => <NodeFactory type={key} data={props.data} />;
        return acc;
      }, {}),
    }),
    []
  );

  // Data propagation: copy values across connected nodes (text → llm → output)
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "llmNode") {
          const incoming = edges.find((e) => e.target === node.id);
          if (incoming) {
            const sourceNode = nds.find((n) => n.id === incoming.source);
            if (sourceNode && sourceNode.data?.value) {
              return { ...node, data: { ...node.data, value: sourceNode.data.value } };
            }
          }
        }
        if (node.type === "outputNode") {
          const incoming = edges.find((e) => e.target === node.id);
          if (incoming) {
            const sourceNode = nds.find((n) => n.id === incoming.source);
            if (sourceNode && sourceNode.data?.value) {
              return { ...node, data: { ...node.data, value: sourceNode.data.value } };
            }
          }
        }

        return node;
      })
    );
  }, [edges, setNodes, nodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative", background: "radial-gradient(circle at center, #1a0040 0%, #0a001c 100%)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={(instance) => setRfInstance(instance)} // store the instance
        style={{ color: "white", fontFamily: "Inter, sans-serif" }}
      >
        <Background color="#5e2ea5" gap={20} />
        <Controls />
      </ReactFlow>


      <button
        onClick={() => {
          if (!rfInstance) {
            alert("ReactFlow instance not ready yet — try again in a moment.");
            return;
          }
          const currentNodes = rfInstance.getNodes();
          const currentEdges = rfInstance.getEdges();
          submitPipeline(currentNodes, currentEdges);
        }}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(90deg, #8c4eff, #00e5ff)",
          color: "white",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 0 12px rgba(140,78,255,0.6)",
          zIndex: 9999,
        }}
      >
        Submit Pipeline
      </button>
    </div>
  );
}
