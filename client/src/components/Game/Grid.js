import React, { useState, useImperativeHandle, forwardRef, useEffect, useContext } from "react";
import SquareGrid from "./SquareGrid";
import { getRowsAvailable, checkResult, findAiMove } from "./help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

export const Grid = forwardRef(
  ({ game, initialGrid, handleResult, opponent, currentPlayerNum }, ref) => {
    const blankGrid = JSON.parse(JSON.stringify(initialGrid));
    const [grid, setGrid] = useState(blankGrid);
    const [rowsAvailable, setRowsAvailable] = useState(getRowsAvailable(initialGrid));
    const [gameOver, setGameOver] = useState(true);
    const [ready, toggleReady] = useState(true);
    const [thisTurn, endThisTurn] = useState();
    const currentPlayerColor = currentPlayerNum === 1 ? "#f012be" : "#2ecc40";
    const opponentPlayerColor = currentPlayerNum === 1 ? "#2ecc40" : "#f012be";

    const client = useContext(SocketContext);
    useImperativeHandle(ref, () => ({
      grid,
      resetGrid,
      toggleGameOver,
    }));

    const resetGrid = (result) => {
      if (game === "single" && result === 1) {
        toggleReady(true);
      }
      setGrid(blankGrid);
      setRowsAvailable(getRowsAvailable(initialGrid));
      setGameOver(false);
      endThisTurn(!thisTurn);
    };

    const toggleGameOver = (boolean) => {
      setGameOver(boolean);
    };

    useEffect(() => {
      if (!gameOver && game === "single" && !ready) {
        const newGrid = grid.slice();
        const newRowChart = rowsAvailable.slice();
        setTimeout(() => {
          const [aiMoveRowIdx, aiMoveColIdx] = findAiMove(newGrid, newRowChart);
          newGrid[aiMoveRowIdx][aiMoveColIdx] = 2;
          setGrid(newGrid);
          const result = checkResult(newGrid, aiMoveRowIdx, aiMoveColIdx);
          if (result) {
            setGameOver(true);
            handleResult(result);
          } else {
            const rowValue = aiMoveRowIdx === 0 ? 9 : aiMoveRowIdx - 1;
            newRowChart[aiMoveColIdx] = rowValue;
            setRowsAvailable(newRowChart);
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
    }, [thisTurn]);

    const handleMove = (colIdx) => {
      if (!gameOver && ready) {
        if (rowsAvailable[colIdx] === 9) return; // 9 means full column; Max standard num of rows is 8
        const newGrid = grid.slice();
        const rowIdx = rowsAvailable[colIdx];
        newGrid[rowIdx][colIdx] = currentPlayerNum;
        setGrid(newGrid);
        const result = checkResult(newGrid, rowIdx, colIdx);
        if (result) {
          setGameOver(true);
          handleResult(result);
        } else {
          const newRowChart = rowsAvailable.slice();
          const rowValue = rowIdx === 0 ? 9 : rowIdx - 1;
          newRowChart[colIdx] = rowValue;
          setRowsAvailable(newRowChart);
        }

        game === "single" && toggleReady(false);
        endThisTurn(!thisTurn);
      }
    };

    return (
      <>
        {/* Grid */}
        <div id="boarder">
          <div id="grid" className="grid">
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
