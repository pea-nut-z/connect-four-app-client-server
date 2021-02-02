import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SquareGrid from "./SquareGrid";
import {
  createGrid,
  checkResult,
  findAValidMove,
  storeScore,
  fetchScore,
} from "./help";
import "./game.css";
import io from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

export default function MultiPlayer() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [played, won] = fetchScore(currentUser.uid);

  const numOfRows = 6;
  const numOfCols = 7;

  const initialGrid = createGrid(numOfRows, numOfCols);
  const [grid, setGrid] = useState(initialGrid);
  const [player1, assignPlayer1] = useState("");
  const [player2, assignPlayer2] = useState("");
  const [ID, setID] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [numOfGames, setNumOfGames] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [result, displayResult] = useState("");
  const [warning, displayWarning] = useState("");
  const [ready, toggleReady] = useState(false);
  const [turn, switchTurn] = useState(true);
  const [thisTurn, endThisTurn] = useState();
  const [replayButton, disableReplayButton] = useState(false);

  useEffect(() => {
    const client = io("http://localhost:3001/");

    // ignore the 3rd player
    client.on("full-server", () => {
      alert("Sorry, server is full!");
      history.push("/");
    });

    client.on("player-1-connecting", (player2name) => {
      // console.log(currentUser.uid);
      // console.log("player1");
      assignPlayer1(currentUser.displayName);
      setID(currentUser.uid);
      // console.log("1");
      player2name && assignPlayer2(player2name);
      switchTurn(false);
      client.emit("player-connected", currentUser.displayName);
    });

    client.on("player-2-connecting", (player1name) => {
      // console.log(currentUser.uid);
      // console.log("2");
      assignPlayer1(player1name);
      assignPlayer2(currentUser.displayName);
      setID(currentUser.uid);
      setCurrentPlayer(false);
      switchTurn(true);
      client.emit("player-connected", currentUser.displayName);
    });

    client.on("player-has-joined", ({ playerIndex, name }) => {
      if (playerIndex === 0) {
        // console.log("3");
        assignPlayer1(name);
        switchTurn(false);
      } else {
        // console.log("4");
        assignPlayer2(name);
        switchTurn(true);
      }
    });

    // update clients' grid , status and score
    client.emit("update-game", { grid, result, warning, turn });
    client.on("update-game", ({ grid, result, warning, turn }) => {
      // console.log("updated");

      // replay was clicked
      if (warning) {
        setNumOfGames(numOfGames + 1);
        displayWarning("Play again? Go!");
      } else {
        displayWarning("");
      }

      // There is a win/draw
      if (result) {
        if (result !== "Draw!") result = "😱 YOU LOST! 💩";
        displayResult(result + "🤝");
        turn ? setScore1(score1 + 1) : setScore2(score2 + 1);
        storeScore(currentUser.uid, played + 1, won);
      }

      // no result yet
      if (!result) {
        displayResult("");
        toggleReady(!ready);
        disableReplayButton(false);
      }

      setGrid(grid);
      switchTurn(turn);
    });

    // handle disconnect
    client.on("player-disconnected", ({ name, num }) => {
      // console.log("disconnected");
      num === 0 ? assignPlayer1("") : assignPlayer2("");
      displayWarning(`${name} left💨`);
    });
    return () => {
      client.disconnect();
    };
  }, [thisTurn]);

  const handleMove = (colIdx) => {
    if (ready && !result && player1 && player2) {
      let newGrid = grid.slice();
      const rowIdx = findAValidMove(newGrid, colIdx);
      newGrid[rowIdx][colIdx] = currentPlayer ? "Player-1" : "Player-2";
      let newResult = checkResult(newGrid);
      if (newResult && newResult !== "Draw!") {
        disableReplayButton(true);
        currentPlayer ? setScore1(score1 + 1) : setScore2(score2 + 1);
        newResult = "🥂 YOU WIN! 🎉";
        storeScore(currentUser.uid, played + 1, won + 1);
      }
      if (newResult === "Draw!") {
        disableReplayButton(true);
        storeScore(currentUser.uid, played + 1, won);
      }
      displayWarning("");
      setGrid(newGrid);
      displayResult(newResult);
      toggleReady(false);
      endThisTurn(!thisTurn);
    }
  };

  const handleReplay = () => {
    if (!result) storeScore(currentUser.uid, played + 1, won);
    displayWarning("Replay request is sent! ");
    setNumOfGames(numOfGames + 1);
    toggleReady(false);
    setGrid(initialGrid);
    displayResult("");
    endThisTurn(!thisTurn);
  };

  const handleQuit = () => {
    if (!warning && !result) storeScore(currentUser.uid, played + 1, won);
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
              {player1 ? player1 : "Waiting..."}
              <div
                style={{ background: "#f012be" }}
                className="indicator rounded ml-2"
              />
            </h6>
            <h6 className="player float-right">
              {player2 ? player2 : "Waiting..."}
              <div className="bg-success indicator rounded ml-2" />
            </h6>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div id="boarder">
        <div id="grid">
          {grid.map((row, rowIdx) => (
            <div className="row" key={rowIdx}>
              {row.map((value, colIdx) => (
                <SquareGrid
                  key={colIdx}
                  value={value}
                  colIdx={colIdx}
                  handleMove={handleMove}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHO's TURN DISPLAY*/}
      <h4
        className="text-center mt-4"
        style={{ color: turn ? "#f012be" : "#2ecc40" }}
      >
        {result
          ? ""
          : ready && player1 && player2
          ? "Your turn"
          : player1 && player2
          ? `Waiting for ${turn ? player1 : player2}...`
          : "Waiting for a player to join..."}
      </h4>

      {/* RESULT DSIPLAY*/}
      <h4 className="text-center text-warning mt-4">{result}</h4>

      {/* WARNING DISPLAY */}
      <h5 className="text-center text-warning mt-4">{warning}</h5>

      {/* BUTTONS*/}
      <Button
        disabled={replayButton}
        className="btn-warning w-100 mt-4"
        onClick={handleReplay}
      >
        Replay
      </Button>
      <Link to="/" className="btn btn-warning w-100 mt-3 " onClick={handleQuit}>
        Quit
      </Link>
      <div>{JSON.stringify(grid)}</div>
    </>
  );
}
