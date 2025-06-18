import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const TaskNode = ({ data, id, onLabelChange }: any) => {
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
        border: "2px solid #f9a825",
        borderRadius: 10,
        background: "#fffde7",
        color: "#f9a825",
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
            border: "1px solid #f9a825",
            borderRadius: 4,
            padding: 2,
            color: "#f9a825",
            background: "#fffde7",
          }}
        />
      ) : (
        data.label
      )}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};

export default TaskNode;
