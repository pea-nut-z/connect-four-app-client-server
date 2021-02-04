import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SquareGrid from "./SquareGrid";
import "./game.css";
import { createGrid, checkResult, findAValidMove, findAiMove, storeScore, fetchScore } from "./help";
import { useAuth } from "../../contexts/AuthContext";

export default function SinglePlayer() {
  const numOfRows = 6;
  const numOfCols = 7;
  const initialGrid = createGrid(numOfRows, numOfCols);

  const [grid, setGrid] = useState(initialGrid);
  const [result, displayResult] = useState("");
  const [numOfGames, setNumOfGames] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [huPlayerIsNext, setHuPlayerIsNext] = useState(true);
  const [turn, switchTurn] = useState(true);
  const { currentUser } = useAuth();
  const [played, won] = fetchScore(currentUser.uid);

  let huPlayer = "Player-1";
  let aiPlayer = "Player-2";

  useEffect(() => {
    if (!huPlayerIsNext) {
      let newGrid = grid.slice();
      const [aiMoveRowIdx, aiMoveColIdx] = findAiMove(newGrid, numOfCols);
      newGrid[aiMoveRowIdx][aiMoveColIdx] = aiPlayer;
      setGrid(newGrid);
      let newResult = checkResult(newGrid);
      if (newResult) {
        if (newResult === "Draw") displayResult(newResult + "! 🤝");
        if (newResult !== "Draw") {
          displayResult("😱 YOU LOST! 💩");
          setScore2(score2 + 1);
        }
        storeScore(currentUser.uid, played + 1, won);
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
        storeScore(currentUser.uid, played + 1, won + 1);
      }
      if (newResult === "Draw") {
        displayResult(newResult + "! 🤝");
        storeScore(currentUser.uid, played + 1, won);
      }
      if (!newResult) {
        setHuPlayerIsNext(!huPlayerIsNext);
        switchTurn(!turn);
      }
    }
  };

  function handleReplay() {
    if (!result) storeScore(currentUser.uid, played + 1, won);
    setNumOfGames(numOfGames + 1);
    setGrid(initialGrid);
    displayResult("");
    setHuPlayerIsNext(true);
  }

  const handleQuit = () => {
    if (!result) storeScore(currentUser.uid, played + 1, won);
  };

  return (
    <>
      <div id="container" className="container">
        <div className="row">
          {/* SCORE DSIPLAY */}
          <div id="scores" className="col">
            <h6 className="text-primary">Round: {numOfGames}</h6>
            <h4>
              <span id="score-1" style={{ color: "#f012be" }}>
                {score1}
              </span>
              <span className="text-primary"> vs </span>
              <span id="score-2" className="text-success">
                {score2}
              </span>
            </h4>
          </div>
          {/* PLAYERS LEGEND */}
          <div id="players" className="col">
            <h6 className="player float-right">
              {currentUser.displayName}
              <div style={{ background: "#f012be" }} className="indicator rounded ml-2" />
            </h6>
            <h6 className="player float-right">
              Peanutbot
              <div className="bg-success indicator rounded ml-2" />
            </h6>
          </div>
        </div>
      </div>

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

      {/* WHO's TURN DISPLAY*/}
      <h4 className="text-center mt-4" style={{ color: huPlayerIsNext ? "#f012be" : "#2ecc40" }}>
        {result ? "" : huPlayerIsNext ? "Your turn" : "Peanutbot's turn"}
      </h4>

      {/* RESULT DSIPLAY*/}
      <h4 className="text-warning text-center mt-4">{result}</h4>
      <Button className="btn-warning w-100 mt-5" onClick={handleReplay}>
        Replay
      </Button>
      <Link to="/" className="btn btn-warning w-100 mt-3" onClick={handleQuit}>
        Quit
      </Link>
      <div>{JSON.stringify(grid)}</div>
    </>
  );
}
