import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SquareGrid from "./SquareGrid";
import { initialGrid, checkResult, findAValidMove } from "./help";
import "./game.css";
import io from "socket.io-client";

export default function MultiPlayer({ userName, incrementPlayedData, incrementScoreData }) {
  const history = useHistory();

  const [grid, setGrid] = useState(initialGrid);
  // const [player1, assignPlayer1] = useState("");
  // const [player2, assignPlayer2] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(true);
  // const [numOfRounds, setNumOfRounds] = useState(1);
  // const [score1, setScore1] = useState(0);
  // const [score2, setScore2] = useState(0);
  const [result, displayResult] = useState("");
  // const [info, displayInfo] = useState("");
  const [ready, toggleReady] = useState(false);
  const [turn, switchTurn] = useState(true);
  const [thisTurn, endThisTurn] = useState();
  // const [replayButton, disableReplayButton] = useState(false);

  useEffect(() => {
    const client = io("/");

    // ignore the 3rd player
    client.on("full-server", () => {
      alert("Sorry, server is full!");
      history.push("/");
    });

    client.on("player-1-connecting", (player2name) => {
      // console.log(currentUser.uid);
      // console.log("player1");
      assignPlayer1(userName);
      // console.log("1");
      player2name && assignPlayer2(player2name);
      switchTurn(false);
      client.emit("player-connected", userName);
    });

    client.on("player-2-connecting", (player1name) => {
      // console.log(currentUser.uid);
      // console.log("2");
      assignPlayer1(player1name);
      assignPlayer2(userName);
      setCurrentPlayer(false);
      switchTurn(true);
      client.emit("player-connected", userName);
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
    client.emit("update-game", { grid, result, info, turn });
    client.on("update-game", ({ grid, result, info, turn }) => {
      // replay was clicked
      if (info === "Replay request is sent!") {
        setNumOfRounds(numOfRounds + 1);
        displayInfo("Ready, Go!");
      } else {
        displayInfo("");
      }

      // There is a win/draw
      if (result) {
        result !== "Draw" ? (result = "😱 YOU LOST! 💩") : (result = "Draw! 🤝");
        displayResult(result);
        displayInfo("Click Replay ⬇️");
        turn ? setScore1(score1 + 1) : setScore2(score2 + 1);
        incrementPlayedData();
      }

      // no result yet
      if (!result) {
        toggleReady(!ready);
        displayResult("");
        disableReplayButton(false);
      }
      setGrid(grid);
      switchTurn(turn);
    });

    // handle disconnect
    client.on("player-disconnected", ({ name, num }) => {
      num === 0 ? assignPlayer1("") : assignPlayer2("");
      displayInfo(`${name} left💨`);
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
      let newInfo = "";
      if (newResult) {
        if (newResult !== "Draw") {
          currentPlayer ? setScore1(score1 + 1) : setScore2(score2 + 1);
          newResult = "🥂 YOU WIN! 🎉";
          // newInfo = `Waiting for ${currentPlayer ? player2 : player1} to restart the game...`;
          incrementScoreData();
        }
        // disableReplayButton(true);
        incrementPlayedData();
      }
      setGrid(newGrid);
      displayResult(newResult);
      displayInfo(newInfo);
      toggleReady(false);
      endThisTurn(!thisTurn);
    }
  };

  const handleReplay = () => {
    if (!result) incrementPlayedData();
    displayResult("");
    displayInfo("Replay request is sent!");
    setNumOfRounds(numOfRounds + 1);
    setGrid(initialGrid);
    toggleReady(false);
    endThisTurn(!thisTurn);
  };

  const handleQuit = () => {
    if (!info && !result && turn !== "Waiting for a player to join...") incrementPlayedData();
    toggleGameMode("");
  };

  return (
    <>
      <div id="container" className="container">
        <div className="row">
          {/* SCORE DSIPLAY */}
          <div id="scores" className="col">
            <h6 className="text-primary">Round: {numOfRounds}</h6>
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
              <div style={{ background: "#f012be" }} className="indicator rounded ml-2" />
            </h6>
            <h6 className="player float-right">
              {player2 ? player2 : "Waiting..."}
              <div className="bg-success indicator rounded ml-2" />
            </h6>
          </div>
        </div>
      </div>

      {/* WHO's TURN */}
      <h4 className="text-center mt-4" style={{ color: turn ? "#f012be" : "#2ecc40" }}>
        {result
          ? ""
          : ready && player1 && player2
          ? "Your turn"
          : player1 && player2
          ? `Waiting for ${turn ? player1 : player2}...`
          : "Waiting for a player to join..."}
      </h4>

      <Button disabled={replayButton} className="btn-warning w-100 mt-4" onClick={handleReplay}>
        Replay
      </Button>
      <Button className="btn btn-warning w-100 mt-3 " onClick={handleQuit}>
        Quit
      </Button>
      <div>{JSON.stringify(grid)}</div>
    </>
  );
}
