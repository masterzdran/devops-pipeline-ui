import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const StageNode = ({ data, id, selected, onLabelChange }: any) => {
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
        border: "2px solid #0057b8",
        borderRadius: 10,
        background: "#e3f0ff",
        color: "#0057b8",
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
            border: "1px solid #0057b8",
            borderRadius: 4,
            padding: 2,
            color: "#0057b8",
            background: "#e3f0ff",
          }}
        />
      ) : (
        data.label
      )}
      <Handle type="target" position={Position.Left} id="left"/>
      <Handle type="source" position={Position.Right} id="right"/>
      <Handle type="source" position={Position.Bottom} id="bottom"/>
    </div>
  );
};

export default StageNode;
