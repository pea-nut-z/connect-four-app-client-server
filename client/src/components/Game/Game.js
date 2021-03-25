import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "react-bootstrap";
import { Grid } from "./Grid";
import { SocketContext } from "../../contexts/socket";
import { initialGrid } from "./help";
import "./game.css";

export default function Game({ userName, game, incrementData, toggleGameMode }) {
  const [player1Name, assignPlayer1Name] = useState("");
  const [player2Name, assignPlayer2Name] = useState("");
  const [currentPlayerNum, setCurrentPlayerNum] = useState("p1");
  const [currentPlayerName, setCurrentPlayerName] = useState("");
  const [numOfRounds, setNumOfRounds] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [result, saveResult] = useState("");
  const [resultMsg, displayResultMsg] = useState("");
  const [info, displayInfo] = useState("");
  const [replayButton, disableReplayButton] = useState(false);

  const opponent = currentPlayerNum === "p1" ? player2Name : player1Name;
  const client = useContext(SocketContext);
  const ref = useRef();

  useEffect(() => {
    if (game === "single") {
      assignPlayer1Name(userName);
      assignPlayer2Name("Peanutbot");
    }

    if (game === "multi") {
      client.on("full-server", () => {
        toggleGameMode("");
        alert("Sorry, server is full.");
      });

      client.emit("player-connecting", { userName });

      client.on("player-1-connected", (player2) => {
        assignPlayer1Name(userName);
        setCurrentPlayerName(userName);
        player2 && assignPlayer2Name(player2);
      });

      client.on("player-2-connected", (player1) => {
        assignPlayer2Name(userName);
        setCurrentPlayerName(userName);
        setCurrentPlayerNum("p2");
        assignPlayer1Name(player1);
      });

      client.on("player-has-joined", ({ userName, playerIndex }) => {
        playerIndex === 0 ? assignPlayer1Name(userName) : assignPlayer2Name(userName);
        setScore1(0);
        setScore2(0);
      });

      //   handle disconnect
      client.on("player-disconnected", ({ name, num }) => {
        num === 0 ? assignPlayer1Name("") : assignPlayer2Name("");
        displayInfo(`${name} left💨`);
      });
      return () => client.disconnect(currentPlayerName);
    }
  }, []);

  useEffect(() => {
    if (game === "multi") {
      // to all clients except sender
      client.emit("update-result-display-and-rounds", {
        result,
        currentPlayerName,
        numOfRounds,
      });
      client.on("update-result-display-and-rounds", ({ result, currentPlayerName, numOfRounds }) => {
        setNumOfRounds(numOfRounds);
        if (result) {
          result === "Draw"
            ? displayResultMsg(result + "! 🤝")
            : displayResultMsg("😱 YOU LOST! 💩");
          displayInfo(`Waiting for ${currentPlayerName} to restart the game...`);
          disableReplayButton(true);
        } else {
          displayResultMsg("");
          displayInfo("");
          disableReplayButton(false);
        }
      });

      // to all clients
      client.emit("update-score", { result });
      client.on("update-score", ({ result }) => {
        result && incrementData("played");
        result === "p1" && setScore1(score1 + 1);
        result === "p2" && setScore2(score2 + 1);
      });
    }
  }, [result, numOfRounds]);

  function handleResult(result) {
    result === "Draw"
      ? displayResultMsg(result + "! 🤝")
      : result === "p1"
      ? displayResultMsg("🥂 YOU WIN! 🎉")
      : displayResultMsg("😱 YOU LOST! 💩");
    displayInfo("Click Replay ⬇️");
    incrementData("won");
    saveResult(result);
  }

  function handleReplay() {
    !resultMsg && incrementData("played");
    ref.current.resetGrid();
    setNumOfRounds(numOfRounds + 1);
    displayResultMsg("");
    displayInfo("");
    saveResult("");
  }

  const handleQuit = () => {
    const emptyGrid = JSON.stringify(ref.current.grid) === JSON.stringify(initialGrid());
    if (!info && !result && !emptyGrid) incrementData("played");
    toggleGameMode("");
    window.location.reload(false);
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
              {player1Name ? player1Name : "Waiting..."}
              <div style={{ background: "#f012be" }} className="indicator rounded ml-2" />
            </h6>
            <h6 className="player float-right">
              {player2Name ? player2Name : "Waiting..."}
              <div className="bg-success indicator rounded ml-2" />
            </h6>
          </div>
        </div>
      </div>

      <Grid
        ref={ref}
        game={game}
        handleResult={handleResult}
        opponent={opponent}
        currentPlayerNum={currentPlayerNum}
      />

      {/* RESULT */}
      <h4 className="text-center text-warning mt-4">{resultMsg}</h4>

      {/* INFO */}
      <h5 className="text-center text-warning mt-4">{info}</h5>

      <Button disabled={replayButton} className="btn-warning w-100 mt-4" onClick={handleReplay}>
        Replay
      </Button>
      <Button className="btn btn-warning w-100 mt-3 " onClick={handleQuit}>
        Quit
      </Button>
    </>
  );
}
