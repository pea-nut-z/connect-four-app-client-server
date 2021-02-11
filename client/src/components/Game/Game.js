import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "react-bootstrap";
// import { client } from "./socketConfig";
// import io from "socket.io-client";
// import useSocket from "use-socket.io-client";
import { Grid } from "./Grid";
import "./game.css";
import { SocketContext } from "../../contexts/socket";

export default function Game({
  userName,
  game,
  incrementPlayedData,
  incrementScoreData,
  toggleGameMode,
}) {
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
  const [replayButtonFlag1, disableReplayButton] = useState(false);
  const [replayButtonFlag2, clickReplayButton] = useState("");

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
      client.emit("player-connected", userName);
      client.on("player-has-joined", ({ connectionStatus }) => {
        connectionStatus[0] && assignPlayer1Name(connectionStatus[0]);
        connectionStatus[1] && assignPlayer2Name(connectionStatus[1]);
        setCurrentPlayerName(connectionStatus[0]);
        console.log("ran");
      });

      client.on("this-is-player2", ({ userName }) => {
        setCurrentPlayerNum("p2");
        setCurrentPlayerName(userName);
      });

      // handle disconnect
      client.on("player-disconnected", () => {
        // num === 0 ? assignPlayer1Name("") : assignPlayer2Name("");
        // displayInfo(`${name} left💨`);
        toggleGameMode(null);
      });
      return () => {
        client.disconnect();
      };
    }
  }, [game]);

  console.log({ currentPlayerName });

  useEffect(() => {
    if (game === "multi") {
      // to all clients except sender
      let lastPlayer = currentPlayerNum ? player1Name : player2Name;
      client.emit("update-result-display", { result, lastPlayer, numOfRounds });
      client.on("update-result-display", ({ result, lastPlayer, numOfRounds }) => {
        if (result) {
          result === "Draw"
            ? displayResultMsg(result + "! 🤝")
            : displayResultMsg("😱 YOU LOST! 💩");
          displayInfo(`Waiting for ${lastPlayer} to restart the game...`);
          disableReplayButton(true);
        } else {
          setNumOfRounds(numOfRounds);
          displayResultMsg("");
          displayInfo("");
          disableReplayButton(false);
        }
      });

      // to all clients
      client.emit("update-score", { result });
      client.on("update-score", ({ result }) => {
        result && incrementPlayedData();
        result === "p1" && setScore1(score1 + 1);
        result === "p2" && setScore2(score2 + 1);
      });
    }
  }, [result]);

  function handleResult(result) {
    saveResult(result);
    result === "Draw" ? displayResultMsg(result + "! 🤝") : displayResultMsg("🥂 YOU WIN! 🎉");
    displayInfo("Click Replay ⬇️");
    incrementScoreData();
  }

  function handleReplay() {
    !resultMsg && incrementPlayedData();
    ref.current.resetGrid();
    setNumOfRounds(numOfRounds + 1);
    displayResultMsg("");
    displayInfo("");
    saveResult("");
  }

  const handleQuit = () => {
    //turn !== "Waiting for a player to join..."
    if (!info && !result) incrementPlayedData();
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
              {player1Name}
              <div style={{ background: "#f012be" }} className="indicator rounded ml-2" />
            </h6>
            <h6 className="player float-right">
              {player2Name}
              <div className="bg-success indicator rounded ml-2" />
            </h6>
          </div>
        </div>
      </div>

      {/* {gameReady && ( */}
      <Grid ref={ref} game={game} handleResult={handleResult} currentPlayerNum={currentPlayerNum} />
      {/* )} */}

      {/* RESULT */}
      <h4 className="text-center text-warning mt-4">{resultMsg}</h4>

      {/* INFO */}
      <h5 className="text-center text-warning mt-4">{info}</h5>

      <Button disabled={replayButtonFlag1} className="btn-warning w-100 mt-4" onClick={handleReplay}>
        Replay
      </Button>
      <Button className="btn btn-warning w-100 mt-3 " onClick={handleQuit}>
        Quit
      </Button>
    </>
  );
}
