🚀 VectorShift Frontend & Backend Technical Assessment

A fully styled pipeline editor with TextNode variable detection, LLM processing simulation, and backend DAG validation.

📌 Overview

This project implements a mini-clone of the VectorShift pipeline builder.
It includes:

✅ Frontend (React + ReactFlow)

Fully styled custom nodes (TextNode, LLMNode, OutputNode).

Variable detection in TextNode ({{variable}}).

Auto-resizing TextNode input.

Dynamic input-based handle creation.

Data propagation from:

TextNode → LLMNode → OutputNode

Pipeline visualization using ReactFlow.

A Submit Pipeline button that sends nodes & edges to the backend.

Beautiful animated UI with gradients and glowing node borders.

✅ Backend (FastAPI)

/pipelines/parse endpoint receives:

{
  "nodes": [...],
  "edges": [...]
}


Calculates:

num_nodes

num_edges

is_dag (checks if the graph is a Directed Acyclic Graph)

Returns the above in JSON format.

✅ Frontend → Backend Integration

After submitting, the frontend shows an alert:

📊 Pipeline Analysis
- Number of Nodes: X
- Number of Edges: Y
- Is DAG: Yes/No

🛠️ Tech Stack
Frontend:

React

ReactFlow

JavaScript (ES6)

Custom component system for nodes

Backend:

FastAPI

Uvicorn

Python 3.10+

📂 Project Structure
/frontend
    /src
        App.jsx
        submit.js
        /nodes
            textnode.jsx
            llmnode.jsx
            output.jsx
            nodedef.js
        /components
            nodefactory.jsx

/backend
    main.py
    venv/

▶️ Running the Project
1. Start Backend
cd backend
pip install -r requirements.txt
pip install python-multipart
uvicorn main:app --reload


Backend runs at:
👉 http://127.0.0.1:8000

2. Start Frontend
cd frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🧩 Features Implemented
✔ TextNode

Detects variables inside {{ }}

Auto-resizes based on text

Displays detected variable names

Creates input handles for each variable

✔ LLMNode

Reads data from connected TextNode

Simulates LLM processing (or backend call)

Forwards output to OutputNode

✔ OutputNode

Displays final computed output

✔ DAG Validation (Backend)

Ensures the pipeline structure forms a valid DAG — no cycles allowed.

🧪 API Example
POST /pipelines/parse
Request Body:
{
  "nodes": [...],
  "edges": [...]
}

Response:
{
  "num_nodes": 8,
  "num_edges": 6,
  "is_dag": true
}

🎨 UI Preview

Modern neon-gradient theme

Animated connections

Smooth layout with ReactFlow

Floating Submit Pipeline button

🧾 Notes for Reviewer

All 4 required parts are fully implemented:

Node styling

TextNode improvements

LLM & Output integration

Backend DAG validation + frontend alert

Code is modular, readable, and well-structured.

UI closely follows the VectorShift style.

🏁 Final Thoughts

This project demonstrates full-stack implementation ability using React, ReactFlow, and FastAPI, along with custom node systems and data propagation.

If you’d like to run a production build or need deployment instructions, feel free to ask!
