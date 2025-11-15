
export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch("https://vectorshift-j6r9.onrender.com/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Status ${response.status}: ${text}`);
    }

    const data = await response.json();

    if (data.error) {
      alert(`❌ Error from backend: ${data.error}`);
      return;
    }
    alert(
      `📊 Pipeline Analysis:\n\n` +
      `🟢 Number of Nodes: ${data.num_nodes}\n` +
      `🟣 Number of Edges: ${data.num_edges}\n` +
      `🔶 Is DAG: ${data.is_dag ? "✅ Yes" : "❌ No"}`
    );
  } catch (err) {
    alert(`❌ Failed to submit pipeline: ${err.message}`);
    console.error("submitPipeline error:", err);
  }
}

