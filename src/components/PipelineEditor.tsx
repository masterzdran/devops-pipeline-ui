import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
  addEdge,
  NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
} from "reactflow";
import "../styles/style.css";
import StageNode from "./StageNode";
import JobNode from "./JobNode";
import TaskNode from "./TaskNode";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function getNodeType(nodeId: string, nodes: Node[]) {
  return nodes.find((n) => n.id === nodeId)?.type;
}

function isValidConnection(connection: Connection, nodes: Node[]) {
  const sourceType = getNodeType(connection.source!, nodes);
  const targetType = getNodeType(connection.target!, nodes);

  const sourceNode = nodes.find((n) => n.id === connection.source);
  const targetNode = nodes.find((n) => n.id === connection.target);
  if (!sourceNode || !targetNode) return false;

  // Stage -> Stage (horizontal)
  if (sourceType === "stageNode" && targetType === "stageNode") {
    return Math.abs(sourceNode.position.y - targetNode.position.y) < 50 &&
      Math.abs(sourceNode.position.x - targetNode.position.x) > 50 &&
      sourceNode.id !== targetNode.id;
  }

  // Stage -> Job (vertical)
  if (sourceType === "stageNode" && targetType === "jobNode") {
    return Math.abs(sourceNode.position.x - targetNode.position.x) < 50 &&
      targetNode.position.y > sourceNode.position.y;
  }

  // Job -> Job (horizontal)
  if (sourceType === "jobNode" && targetType === "jobNode") {
    return Math.abs(sourceNode.position.y - targetNode.position.y) < 50 &&
      Math.abs(sourceNode.position.x - targetNode.position.x) > 50 &&
      sourceNode.id !== targetNode.id;
  }

  // Job -> Task (vertical)
  if (sourceType === "jobNode" && targetType === "taskNode") {
    return Math.abs(sourceNode.position.x - targetNode.position.x) < 50 &&
      targetNode.position.y > sourceNode.position.y;
  }

  // Task -> Task (vertical)
  if (sourceType === "taskNode" && targetType === "taskNode") {
    return Math.abs(sourceNode.position.x - targetNode.position.x) < 50 &&
      targetNode.position.y > sourceNode.position.y &&
      sourceNode.id !== targetNode.id;
  }

  return false;
}

let stageId = 1;
let jobId = 1;
let taskId = 1;

const PipelineEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (isValidConnection(params, nodes)) {
        setEdges((eds) => addEdge({ ...params, type: "smoothstep" }, eds));
      }
    },
    [nodes]
  );

  const onEdgesDelete = useCallback(
    (edgesToDelete: Edge[]) => {
      setEdges((eds) => eds.filter((e) => !edgesToDelete.some((del) => del.id === e.id)));
    },
    []
  );

  // Add Stage
  const addStage = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `stage-${stageId++}`,
        type: "stageNode",
        data: { label: `Stage ${stageId - 1}` },
        position: { x: 100 + (stageId - 2) * 180, y: 100 },
      },
    ]);
  };

  // Add Job
  const addJob = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `job-${jobId++}`,
        type: "jobNode",
        data: { label: `Job ${jobId - 1}` },
        position: { x: 100 + (jobId - 2) * 180, y: 250 },
      },
    ]);
  };

  // Add Task
  const addTask = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `task-${taskId++}`,
        type: "taskNode",
        data: { label: `Task ${taskId - 1}` },
        position: { x: 100 + (taskId - 2) * 180, y: 400 },
      },
    ]);
  };

  // Clear all nodes and edges
  const clearFlow = () => {
    setNodes([]);
    setEdges([]);
  };

  // Handler to update node label
  const onLabelChange = useCallback((id: string, newLabel: string) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  }, []);

  // Memoize nodeTypesWithProps to avoid React Flow warning
  const nodeTypesWithProps = useMemo(() => ({
    stageNode: (props: any) => <StageNode {...props} onLabelChange={onLabelChange} />,
    jobNode: (props: any) => <JobNode {...props} onLabelChange={onLabelChange} />,
    taskNode: (props: any) => <TaskNode {...props} onLabelChange={onLabelChange} />,
  }), [onLabelChange]);

  // Helper to build the pipeline structure
  const generatePipelineJson = () => {
    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
    const childrenMap: Record<string, string[]> = {};
    edges.forEach(edge => {
      if (!childrenMap[edge.source]) childrenMap[edge.source] = [];
      childrenMap[edge.source].push(edge.target);
    });

    // Recursively collect all jobs under a stage
    function collectJobs(parentId: string): any[] {
      const jobIds = (childrenMap[parentId] || []).filter(id => nodeMap[id]?.type === "jobNode");
      return jobIds.map(jobId => {
        return {
          id: jobId,
          label: nodeMap[jobId].data.label,
          tasks: collectTasks(jobId),
          // Recursively collect jobs connected horizontally from this job
          ...(collectJobs(jobId).length > 0 ? { nextJobs: collectJobs(jobId) } : {})
        };
      });
    }

    // Recursively collect all tasks under a job
    function collectTasks(parentId: string): any[] {
      const taskIds = (childrenMap[parentId] || []).filter(id => nodeMap[id]?.type === "taskNode");
      return taskIds.map(taskId => {
        return {
          id: taskId,
          label: nodeMap[taskId].data.label,
          // Recursively collect tasks connected vertically from this task
          ...(collectTasks(taskId).length > 0 ? { nextTasks: collectTasks(taskId) } : {})
        };
      });
    }

    const stages = nodes.filter(n => n.type === "stageNode").map(stage => ({
      id: stage.id,
      label: stage.data.label,
      jobs: collectJobs(stage.id)
    }));

    const pipeline = { stages };

    // Download as JSON
    const json = JSON.stringify(pipeline, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pipeline.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: 200,
          background: "#f5f7fa",
          borderRight: "1px solid #e0e0e0",
          boxShadow: "2px 0 8px #e0e0e0",
          padding: 24,
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* MiniMap toggle */}
        <label style={{ marginBottom: 8, fontWeight: 500, color: "#1976d2" }}>
          <input
            type="checkbox"
            checked={showMiniMap}
            onChange={() => setShowMiniMap((v) => !v)}
            style={{ marginRight: 8 }}
          />
          Show MiniMap
        </label>
        <button
          onClick={generatePipelineJson}
          style={{
            marginBottom: 8,
            width: 160,
            padding: "10px 0",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 6px #b3c6e0",
            transition: "background 0.2s",
          }}
        >
          Export Pipeline JSON
        </button>
        <button
          onClick={clearFlow}
          style={{
            marginBottom: 8,
            width: 160,
            padding: "10px 0",
            background: "#fff",
            color: "#d32f2f",
            border: "1px solid #d32f2f",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 6px #f8bbd0",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          Clear Canvas
        </button>
        <button
          onClick={addStage}
          style={{
            marginBottom: 8,
            width: 160,
            padding: "10px 0",
            background: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Stage
        </button>
        <button
          onClick={addJob}
          style={{
            marginBottom: 8,
            width: 160,
            padding: "10px 0",
            background: "#26a69a",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Job
        </button>
        <button
          onClick={addTask}
          style={{
            marginBottom: 8,
            width: 160,
            padding: "10px 0",
            background: "#fbc02d",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </div>
      <div style={{ width: "100%", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypesWithProps}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={(conn) => isValidConnection(conn, nodes)}
          onEdgesDelete={onEdgesDelete}
          elementsSelectable={true}
        >
          {showMiniMap && <MiniMap />}
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default PipelineEditor;