import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const JobNode = ({ data, id, onLabelChange }: any) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => {
    setEditing(false);
    if (value !== data.label && onLabelChange) {
      onLabelChange(id, value);
    }
  };

  return (
    <div
      style={{
        padding: 14,
        border: "2px solid #00796b",
        borderRadius: 10,
        background: "#e0f2f1",
        color: "#00796b",
        fontWeight: "bold",
        minWidth: 100,
        textAlign: "center",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleBlur();
          }}
          style={{
            width: "90%",
            fontWeight: "bold",
            fontSize: "1em",
            border: "1px solid #00796b",
            borderRadius: 4,
            padding: 2,
            color: "#00796b",
            background: "#e0f2f1",
          }}
        />
      ) : (
        data.label
      )}
      {/* Target handles for incoming edges */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Left} id="left" />
      {/* Source handles for outgoing edges */}
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};

export default JobNode;
