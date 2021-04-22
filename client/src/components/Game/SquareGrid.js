import React from "react";

export default function SquareGrid({ value, colIdx, handleMove }) {
  return (
    <div className="square bg-primary" onClick={() => handleMove(colIdx)}>
      <div data-testid="square" className={`circle ${value ? value : ""}`}></div>
    </div>
  );
}
