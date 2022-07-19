import React from "react";

export default function Square({ value, colIdx, handleMove }) {
  return (
    <div className="square bg-primary" onClick={() => handleMove(colIdx)}>
      <div
        // id={colIdx === 0 ? "testCol0" : colIdx === 2 ? "testCol2" : ""}
        data-testid={colIdx}
        className={`circle ${value ? "p" + value : ""}`}
      ></div>
    </div>
  );
}
