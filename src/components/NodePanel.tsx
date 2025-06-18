import React from "react";
import { Edge, Node } from "reactflow";
import { Box, Button } from "@mui/material";

interface NodePanelProps {
  setElements: React.Dispatch<React.SetStateAction<(Node | Edge)[]>>;
}

const NodePanel: React.FC<NodePanelProps> = ({ setElements }) => {
  const addNode = (type: string, label: string) => {
    const newNode: Node = {
      id: `${Math.random()}`,
      type,
      data: { label },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setElements(prev => [...prev, newNode]);
  };

  return (
    <Box sx={{ width: "250px", padding: 2, backgroundColor: "#f4f4f4", borderRadius: 1 }}>
      <h3>Add Pipeline Components</h3>
      <Button onClick={() => addNode("default", "Stage")} variant="contained" sx={{ mb: 1 }}>
        Add Stage
      </Button>
      <Button onClick={() => addNode("default", "Job")} variant="contained" color="error" sx={{ mb: 1 }}>
        Add Job
      </Button>
      <Button onClick={() => addNode("default", "Task")} variant="contained" color="success">
        Add Task
      </Button>
    </Box>
  );
};

export default NodePanel;
