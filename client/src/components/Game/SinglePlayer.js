import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SquareGrid from "./SquareGrid";
import { createGrid, checkResult, findAValidMove, findAiMove } from "./help";
import "./game.css";

export default function SinglePlayer() {
  const rows = 6;
  const columns = 7;
  const initialGrid = createGrid(rows, columns);

  const [grid, setGrid] = useState(initialGrid);
  const [huPlayerIsNext, setHuPlayerIsNext] = useState(true);
  const [result, displayResult] = useState("");
  const [turn, switchTurn] = useState(true);
  let huPlayer = "Player-1";
  let aiPlayer = "Player-2";

  useEffect(() => {
    if (!huPlayerIsNext) {
      let newGrid = grid.slice();
      const [aiMoveRowIndex, aiMoveColumnIndex] = findAiMove(
        newGrid,
        columns,
        huPlayer,
        aiPlayer
      );
      newGrid[aiMoveRowIndex][aiMoveColumnIndex] = aiPlayer;
      setGrid(newGrid);
      let result = checkResult(newGrid);
      displayResult(result);
      if (!result) {
        setHuPlayerIsNext(true);
      }
    }
  }, [turn]);

  const handleClick = (columnIndex) => {
    if (!result && huPlayerIsNext) {
      let newGrid = grid.slice();
      const [huMoveRowIndex, huMoveColumnIndex] = findAValidMove(
        newGrid,
        columnIndex
      );
      newGrid[huMoveRowIndex][huMoveColumnIndex] = huPlayer;
      setGrid(newGrid);
      let result = checkResult(newGrid);
      displayResult(result);
      if (!result) {
        setHuPlayerIsNext(!huPlayerIsNext);
        switchTurn(!turn);
      }
    }
  };

  function handleReplay() {
    window.location.reload(false);
  }

  return (
    <>
      <div id="boarder">
        <div id="grid">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((value, columnIndex) => (
                <SquareGrid
                  key={columnIndex}
                  value={value}
                  columnIndex={columnIndex}
                  handleClick={handleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHO's TURN DISPLAY*/}
      <h4 className="text-success text-center mt-4">
        {result ? "" : huPlayerIsNext ? "Your turn" : "Peanutbot's turn"}
      </h4>

      {/* RESULT DSIPLAY*/}
      <h4 className="text-danger text-center mt-4">{result}</h4>
      <Button className="btn-warning w-100 mt-5" onClick={handleReplay}>
        Replay
      </Button>
      <Link to="/" className="btn btn-warning w-100 mt-3">
        Quit
      </Link>
    </>
  );
}
