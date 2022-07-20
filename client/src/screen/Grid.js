import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useContext,
  useMemo,
} from "react";
import Square from "../UI/Square";
import { checkResult, findAiMove, initialGrid, initialRowIndex } from "../helper";
import { SocketContext } from "../contexts/socket";

export const Grid = forwardRef(
  ({ game, handleResultCb, opponentName, thisPlayerNum, gameOver }, ref) => {
    // const initialGrid = [
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0],
    //   [2, 2, 2, 0, 0, 0, 0],
    //   [1, 1, 1, 0, 0, 0, 0],
    // ];
    // const initialRowIndex = [3, 3, 3, 5, 5, 5, 5];

    const [grid, setGrid] = useState(initialGrid);
    const [rowChart, setRowChart] = useState(initialRowIndex);
    const [ready, setReady] = useState(game === "single" ? true : false);

    const thisPlayerColor = useMemo(
      () => (thisPlayerNum === 1 ? "#f012be" : "#2ecc40"),
      [thisPlayerNum]
    );

    const opponentPlayerColor = useMemo(
      () => (thisPlayerNum === 1 ? "#2ecc40" : "#f012be"),
      [thisPlayerNum]
    );

    const client = useContext(SocketContext);
    useImperativeHandle(ref, () => ({
      grid,
      resetGrid,
    }));

    const resetGrid = () => {
      setGrid(initialGrid);
      setRowChart(initialRowIndex);
      if (game === "single" && !ready) {
        setTimeout(() => {
          handleAiMove(initialGrid, initialRowIndex);
        }, 100);
      }
    };

    const handleAiMove = (huGrid, huRowChart) => {
      const newGrid = huGrid.map((a) => a.slice());
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
        if (rowChart[colIdx] === 9) return; // 9 means full column
        let newRowsAvailable;
        const newGrid = grid.map((a) => a.slice());
        const rowIdx = rowChart[colIdx];
        newGrid[rowIdx][colIdx] = thisPlayerNum;
        setGrid(newGrid);
        const result = checkResult(newGrid, rowIdx, colIdx);
        if (result) {
          game === "multi" && client.emit("result", { result, playerNum: thisPlayerNum });
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

    useEffect(() => {
      if (game === "multi") {
        client.emit("go-first");

        client.on("go-first", () => {
          setReady(true);
          setGrid(initialGrid);
          setRowChart(initialRowIndex);
        });

        client.on("update-grid", ({ grid, rowChart, result }) => {
          if (!result) setReady(true);
          setGrid(grid);
          setRowChart(rowChart);
        });
      }

      return () => {
        if (game === "multi") {
          client.off("go-first");
          client.off("update-grid");
        }
      };
    }, [client, game]);

    return (
      <div>
        {/* Grid */}
        <div data-testid="grid" className="grid">
          {grid.map((row, rowIndex) => (
            <div className="row grid_row" key={rowIndex}>
              {row.map((value, colIdx) => (
                <Square key={colIdx} value={value} colIdx={colIdx} handleMove={handleMove} />
              ))}
            </div>
          ))}
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
      </div>
    );
  }
);
