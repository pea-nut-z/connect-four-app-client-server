import React from "react";

export default function SquareGrid({ value, colIdx, handleMove }) {
  return (
    <div className="square bg-primary" onClick={() => handleMove(colIdx)}>
      <div className={`circle ${value ? value : ""}`}></div>
    </div>
  );
}
