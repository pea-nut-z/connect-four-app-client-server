import React from "react";

export default function SquareGrid({ value, columnIndex, handleClick }) {
  return (
    <div className="square bg-primary" onClick={() => handleClick(columnIndex)}>
      <div className={`circle ${value ? value : ""}`}></div>
    </div>
  );
}
