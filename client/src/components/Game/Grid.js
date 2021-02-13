import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext } from "react";
import SquareGrid from "./SquareGrid";
import { initialGrid, checkResult, findAValidMove, findAiMove } from "./help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

export const Grid = forwardRef(({ game, handleResult, opponent, currentPlayerNum }, ref) => {
  const [grid, setGrid] = useState(initialGrid);
  const [gameOver, setGameOver] = useState(false);
  const [ready, toggleReady] = useState(true);
  const [thisTurn, endThisTurn] = useState();
  const client = useContext(SocketContext);
  const currentPlayerColor = currentPlayerNum === "p1" ? "#f012be" : "#2ecc40";
  const opponentPlayerColor = currentPlayerNum === "p1" ? "#2ecc40" : "#f012be";

  useImperativeHandle(ref, () => ({
    grid,
    resetGrid,
  }));

  const resetGrid = () => {
    setGrid(initialGrid);
    setGameOver(false);
    endThisTurn(!thisTurn);
  };

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

    // to all clients except sender
    if (game === "multi") {
      toggleReady(!ready);
      client.emit("update-grid", { grid, gameOver, ready });
      client.on("update-grid", ({ grid, gameOver, ready }) => {
        setGameOver(gameOver);
        setGrid(grid);
        toggleReady(ready);
      });
    }
  }, [thisTurn]);

  const handleMove = (colIdx) => {
    if (!gameOver && ready) {
      let newGrid = grid.slice();
      const rowIdx = findAValidMove(newGrid, colIdx);
      newGrid[rowIdx][colIdx] = currentPlayerNum;
      setGrid(newGrid);
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
      <h4
        className="text-center mt-4"
        style={{ color: ready ? currentPlayerColor : opponentPlayerColor }}
      >
        {gameOver || !opponent
          ? ""
          : ready
          ? "Your turn"
          : opponent
          ? `Waiting for ${opponent}...`
          : "Waiting for a player to join..."}
      </h4>
    </>
  );
});
