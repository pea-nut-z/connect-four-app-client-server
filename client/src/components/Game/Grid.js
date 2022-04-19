import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext } from "react";
import SquareGrid from "./SquareGrid";
import { checkResult, findAValidMove, findAiMove } from "./help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

export const Grid = forwardRef(
  ({ game, initialGrid, handleResult, opponent, currentPlayerNum }, ref) => {
    const blankGrid = JSON.parse(JSON.stringify(initialGrid));
    const [grid, setGrid] = useState(blankGrid);
    const [gameOver, setGameOver] = useState(true);
    const [ready, toggleReady] = useState(true);
    const [thisTurn, endThisTurn] = useState();
    const client = useContext(SocketContext);
    const currentPlayerColor = currentPlayerNum === "p1" ? "#f012be" : "#2ecc40";
    const opponentPlayerColor = currentPlayerNum === "p1" ? "#2ecc40" : "#f012be";

    useImperativeHandle(ref, () => ({
      grid,
      resetGrid,
      toggleGameOver,
    }));

    const resetGrid = (result) => {
      if (game === "single" && result === "p1") {
        toggleReady(true);
      }
      setGrid(initialGrid);
      setGameOver(false);
      endThisTurn(!thisTurn);
    };

    const toggleGameOver = (boolean) => {
      setGameOver(boolean);
    };

    useEffect(() => {
      if (!gameOver && game === "single" && !ready) {
        let newGrid = grid.slice();
        setTimeout(() => {
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
        }, 500);
      }

      // to all clients except sender
      if (game === "multi") {
        toggleReady(!ready);
        client.emit("update-grid", { grid, ready });
        client.on("update-grid", ({ grid, ready }) => {
          setGrid(grid);
          toggleReady(ready);
        });
      }
    }, [client, game, gameOver, grid, handleResult, ready]);

    const handleMove = (colIdx) => {
      if (!gameOver && ready) {
        let newGrid = grid.slice();
        const rowIdx = findAValidMove(newGrid, colIdx);
        newGrid[rowIdx][colIdx] = currentPlayerNum;
        setGrid(newGrid);
        let result = checkResult(newGrid);
        result && setGameOver(true);
        result && handleResult(result);
        game === "single" && toggleReady(false);
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
          data-testid="turn"
          className="text-center mt-4"
          style={{ color: ready ? currentPlayerColor : opponentPlayerColor }}
        >
          {!opponent && "Waiting for a player to join..."}
          {gameOver ? "" : ready ? "Your turn" : `Waiting for ${opponent}...`}
        </h4>
      </>
    );
  }
);
