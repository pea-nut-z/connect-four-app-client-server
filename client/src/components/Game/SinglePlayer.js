import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SquareGrid from "./SquareGrid";
import "./game.css";
import { initialGrid, checkResult, findAValidMove, findAiMove } from "./help";

export default function SinglePlayer({ incrementPlayedData, incrementScoreData }) {
  const [grid, setGrid] = useState(initialGrid);
  // const [result, displayResult] = useState("");
  // const [numOfRounds, setNumOfRounds] = useState(1);
  // const [score1, setScore1] = useState(0);
  // const [score2, setScore2] = useState(0);
  const [huPlayerIsNext, setHuPlayerIsNext] = useState(true);
  const [turn, switchTurn] = useState(true);

  let huPlayer = "Player-1";
  let aiPlayer = "Player-2";

  useEffect(() => {
    if (!huPlayerIsNext) {
      let newGrid = grid.slice();
      const [aiMoveRowIdx, aiMoveColIdx] = findAiMove(newGrid);
      newGrid[aiMoveRowIdx][aiMoveColIdx] = aiPlayer;
      setGrid(newGrid);
      let newResult = checkResult(newGrid);
      if (newResult) {
        if (newResult === "Draw") displayResult(newResult + "! 🤝");
        if (newResult !== "Draw") {
          displayResult("😱 YOU LOST! 💩");
          setScore2(score2 + 1);
        }
        incrementPlayedData();
      } else {
        setHuPlayerIsNext(true);
      }
    }
  }, [turn]);

  const handleMove = (huMoveColIdx) => {
    if (!result && huPlayerIsNext) {
      let newGrid = grid.slice();
      const huMoveRowIdx = findAValidMove(newGrid, huMoveColIdx);
      newGrid[huMoveRowIdx][huMoveColIdx] = huPlayer;
      setGrid(newGrid);
      let newResult = checkResult(newGrid);
      if (newResult && newResult !== "Draw") {
        displayResult("🥂 YOU WIN! 🎉");
        setScore1(score1 + 1);
        incrementScoreData();
      }
      if (newResult === "Draw") {
        displayResult(newResult + "! 🤝");
        incrementPlayedData();
      }
      if (!newResult) {
        setHuPlayerIsNext(!huPlayerIsNext);
        switchTurn(!turn);
      }
    }
  };

  function handleReplay() {
    if (!result) incrementPlayedData();
    setNumOfRounds(numOfRounds + 1);
    setGrid(initialGrid);
    displayResult("");
    setHuPlayerIsNext(true);
  }

  const handleQuit = () => {
    if (!result) incrementPlayedData();
    toggleGameMode("");
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
      <h4 className="text-center mt-4" style={{ color: huPlayerIsNext ? "#f012be" : "#2ecc40" }}>
        {result ? "" : huPlayerIsNext ? "Your turn" : "Peanutbot's turn"}
      </h4>

      {/* RESULT */}
      <h4 className="text-warning text-center mt-4">{result}</h4>

      <Button className="btn-warning w-100 mt-5" onClick={handleReplay}>
        Replay
      </Button>
      <Button className="btn btn-warning w-100 mt-3" onClick={handleQuit}>
        Quit
      </Button>
      <div>{JSON.stringify(grid)}</div>
    </>
  );
}
