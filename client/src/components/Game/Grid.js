import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import SquareGrid from "./SquareGrid";
import { getRowChart, checkResult, findAiMove, getGrid } from "./help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

export const Grid = forwardRef(
  ({ game, handleResultCb, opponentName, thisPlayerNum, gameOver }, ref) => {
    // const INITIAL_GRID = JSON.parse(JSON.stringify(INITIAL_GRID));
    const INITIAL_GRID = getGrid();
    const INITIAL_ROW_CHART = getRowChart(INITIAL_GRID);
    const [grid, setGrid] = useState(INITIAL_GRID);

    // const testRow = [3, 3, 3, 5, 5, 5, 5];
    // DRAW
    // const testRow = [9, 9, 9, 9, 9, 0, 9];
    // const [rowChart, setRowChart] = useState(testRow);

    const [rowChart, setRowChart] = useState(INITIAL_ROW_CHART);
    const [ready, setReady] = useState(game === "single" ? true : false);
    const thisPlayerColor = thisPlayerNum === 1 ? "#f012be" : "#2ecc40";
    const opponentPlayerColor = thisPlayerNum === 1 ? "#2ecc40" : "#f012be";
    const client = useContext(SocketContext);

    useImperativeHandle(ref, () => ({
      grid,
      resetGrid,
    }));

    const resetGrid = () => {
      setGrid(INITIAL_GRID);
      setRowChart(INITIAL_ROW_CHART);
      if (game === "single" && !ready) {
        setTimeout(() => {
          handleAiMove(INITIAL_GRID, INITIAL_ROW_CHART);
        }, 100);
      }
    };

    const handleAiMove = (huGrid, huRowChart) => {
      const newGrid = huGrid.slice();
      const newRowChart = huRowChart.slice();
      const [aiMoveRowIdx, aiMoveColIdx] = findAiMove(newGrid, newRowChart);
      newGrid[aiMoveRowIdx][aiMoveColIdx] = 2;
      setGrid(newGrid);
      const result = checkResult(newGrid, aiMoveRowIdx, aiMoveColIdx);
      if (result) {
        handleResultCb(result);
      } else {
        const rowValue = aiMoveRowIdx === 0 ? 9 : aiMoveRowIdx - 1;
        newRowChart[aiMoveColIdx] = rowValue;
        setRowChart(newRowChart);
        setReady(true);
      }
    };

    const handleMove = (colIdx) => {
      if (!gameOver && ready) {
        console.log({ gameOver });
        if (rowChart[colIdx] === 9) return; // 9 means full column
        let newRowsAvailable;
        const newGrid = grid.slice();
        const rowIdx = rowChart[colIdx];
        newGrid[rowIdx][colIdx] = thisPlayerNum;
        setGrid(newGrid);
        const result = checkResult(newGrid, rowIdx, colIdx);
        if (result) {
          handleResultCb(result, thisPlayerNum);
        } else {
          setReady(false);
          newRowsAvailable = rowChart.slice();
          const rowValue = rowIdx === 0 ? 9 : rowIdx - 1;
          newRowsAvailable[colIdx] = rowValue;
          setRowChart(newRowsAvailable);
          if (game === "single") {
            setTimeout(() => {
              handleAiMove(newGrid, newRowsAvailable);
            }, 100);
          }
        }
        game === "multi" &&
          client.emit("update-grid", { grid: newGrid, rowChart: newRowsAvailable, result });
      }
    };

    client.on("go-first", () => {
      setReady(true);
      setGrid(INITIAL_GRID);
      setRowChart(INITIAL_ROW_CHART);
    });

    client.on("update-grid", ({ grid, rowChart, result }) => {
      console.log("RECEIEVE UPDATE-GRID");
      if (!result) setReady(true);
      setGrid(grid);
      setRowChart(rowChart);
    });

    useEffect(() => {
      if (game === "multi") {
        client.emit("go-first");
      }
      return () => {
        client.off("go-first");
      };
    }, [client, game]);

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
          style={{ color: ready ? thisPlayerColor : opponentPlayerColor }}
        >
          {!opponentName && "Waiting for a player to join..."}
          {gameOver ? "" : ready ? "Your turn" : `Waiting for ${opponentName}...`}
        </h4>
      </>
    );
  }
);
