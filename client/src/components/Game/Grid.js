import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext } from "react";
import SquareGrid from "./SquareGrid";
import { initialGrid, checkResult, findAValidMove, findAiMove } from "./help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

const grid2 = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ["p2", null, null, "p1", null, null, null],
  ["p2", "p2", "p2", "p1", null, null, null],
  ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
];

export const Grid = forwardRef(({ game, handleResult, currentPlayerNum }, ref) => {
  const [grid, setGrid] = useState(grid2);
  const [gameOver, setGameOver] = useState(false);
  const [ready, toggleReady] = useState(true);
  //   const [turn, switchTurn] = useState(true);
  const [thisTurn, endThisTurn] = useState();
  const client = useContext(SocketContext);

  useImperativeHandle(ref, () => ({
    resetGrid,
  }));

  const resetGrid = () => {
    setGrid(grid2);
    setGameOver(false);
    endThisTurn(!thisTurn);
    // toggleReady(false);
  };

  useEffect(() => {
    if (game === "multi") {
      toggleReady(false);
    }
  }, [game]);

  useEffect(() => {
    if (game === "single" && !ready) {
      let newGrid = grid.slice();
      const [aiMoveRowIdx, aiMoveColIdx] = findAiMove(newGrid);
      newGrid[aiMoveRowIdx][aiMoveColIdx] = "p2";
      setGrid(newGrid);
      let result = checkResult(newGrid);
      if (result) {
        setGameOver(true);
        handleResult(result);
      } else {
        toggleReady(!ready);
      }
    }

    if (game === "multi") {
      client.emit("update-grid", { grid, gameOver });
      client.on("update-grid", ({ grid, gameOver }) => {
        setGameOver(gameOver);
        setGrid(grid);
        toggleReady(true);
      });
    }
  }, [thisTurn]);

  const handleMove = (colIdx) => {
    if (!gameOver && ready) {
      let newGrid = grid.slice();
      const rowIdx = findAValidMove(newGrid, colIdx);
      newGrid[rowIdx][colIdx] = currentPlayerNum;
      setGrid(newGrid);
      toggleReady(false);
      let result = checkResult(newGrid);
      result && setGameOver(true);
      result && handleResult(result);
      endThisTurn(!thisTurn);
    }
  };

  return (
    <>
      {/* Grid */}
      <div id="boarder">
        <div id="grid">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((value, colIdx) => (
                <SquareGrid key={colIdx} value={value} colIdx={colIdx} handleMove={handleMove} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHO's TURN */}
      <h4 className="text-center mt-4" style={{ color: ready ? "#f012be" : "#2ecc40" }}>
        {gameOver ? "" : ready ? "Your turn" : "Waiting"}
      </h4>
    </>
  );
});
