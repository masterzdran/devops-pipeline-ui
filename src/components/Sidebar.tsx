import React from "react";
import { Node } from "reactflow";

type SidebarProps = {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
};

let stageId = 3;
let jobId = 3;
let taskId = 2;

const Sidebar: React.FC<SidebarProps> = ({ setNodes }) => {
  const addStage = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `stage-${stageId++}`,
        type: "stageNode",
        data: { label: `Stage ${stageId - 1}` },
        position: { x: 100, y: 100 + 60 * (stageId - 3) },
      },
    ]);
  };

  const addJob = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `job-${jobId++}`,
        type: "jobNode",
        data: { label: `Job ${jobId - 1}` },
        position: { x: 100, y: 250 + 60 * (jobId - 3) },
      },
    ]);
  };

  const addTask = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `task-${taskId++}`,
        type: "taskNode",
        data: { label: `Task ${taskId - 1}` },
        position: { x: 350, y: 400 + 60 * (taskId - 2) },
      },
    ]);
  };

  return (
    <div style={{ padding: 16, borderRight: "1px solid #eee", minWidth: 120 }}>
      <button onClick={addStage} style={{ display: "block", marginBottom: 8, width: "100%" }}>
        Add Stage
      </button>
      <button onClick={addJob} style={{ display: "block", marginBottom: 8, width: "100%" }}>
        Add Job
      </button>
      <button onClick={addTask} style={{ display: "block", width: "100%" }}>
        Add Task
      </button>
    </div>
  );
};

export default Sidebar;
