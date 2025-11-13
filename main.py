# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import networkx as nx

app = FastAPI(title="VectorShift Backend - Part 4")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"ping": "pong"}

class PipelineData(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    """
    Expects JSON:
      { nodes: [...], edges: [...] }
    Returns:
      { num_nodes: int, num_edges: int, is_dag: bool }
    """
    try:
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)
        G = nx.DiGraph()
        for node in data.nodes:
            nid = node.get("id")
            if nid is not None:
                G.add_node(nid)

        for edge in data.edges:
            src = edge.get("source")
            tgt = edge.get("target")
            if src is not None and tgt is not None:
                G.add_edge(src, tgt)

        is_dag = nx.is_directed_acyclic_graph(G)

        return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
    except Exception as e:
        return {"error": str(e)}
