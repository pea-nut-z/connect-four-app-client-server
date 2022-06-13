import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from "react";
import { Button } from "react-bootstrap";
import { Grid } from "./Grid";
import { initialGrid } from "../game/help";
import { SocketContext } from "../../contexts/socket";
import "./game.css";

export default function Game({ userName, game, incrementData, toggleGameModeCb }) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [round, setRound] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [resultMsg, setResultMsg] = useState("");
  const [info, setInfo] = useState("");
  const [replayButton, setReplayButton] = useState(false);
  const [thisPlayerNum, setThisPlayerNum] = useState(1);
  const [thisPlayerName, setThisPlayerName] = useState("");
  const opponentName = useMemo(
    () => (thisPlayerNum === 1 ? player2Name : player1Name),
    [player1Name, player2Name, thisPlayerNum]
  );
  const client = useContext(SocketContext);
  const ref = useRef();

  const handleResultCb = useCallback(
    (result, lastPlayer) => {
      if (result === thisPlayerNum) {
        setResultMsg("🥂 YOU WIN! 🎉");
        incrementData("won");
      } else if (result === "Draw") {
        setResultMsg(result + "! 🤝");
      } else {
        setResultMsg("😱 YOU LOST! 💩");
      }

      if (lastPlayer === thisPlayerNum) client.emit("handle-result", { result, lastPlayer });
      if (lastPlayer === thisPlayerNum || game === "single") setInfo("Click Replay ⬇️");
      if (game === "multi" && lastPlayer !== thisPlayerNum) {
        setInfo(`Waiting for ${thisPlayerName} to restart the game...`);
        setReplayButton(true);
      }
      result === thisPlayerNum ? incrementData("played", "won") : incrementData("played");
      result === 1 && setScore1((score) => score + 1);
      result === 2 && setScore2((score) => score + 1);
      setGameOver(true);
    },
    [client, game, incrementData, thisPlayerName, thisPlayerNum]
  );

  const handleReplayCb = useCallback(
    (playerNum) => {
      const isBlankGrid = JSON.stringify(ref.current.grid) === JSON.stringify(initialGrid);
      if (!gameOver && !isBlankGrid && playerNum === thisPlayerNum) incrementData("played"); //replay in the middle of the game
      if (game === "multi" && playerNum === thisPlayerNum) {
        client.emit("handle-replay", { playerNum });
      }
      ref.current.resetGrid();
      setGameOver(false);
      setRound((PreRound) => PreRound + 1);
      setResultMsg("");
      setInfo("");
      setReplayButton(false);
    },
    [client, incrementData, thisPlayerNum, game, gameOver]
  );

  const handleQuit = () => {
    const isBlankGrid = JSON.stringify(ref.current.grid) === JSON.stringify(initialGrid);
    if (!info && !isBlankGrid) incrementData("played");
    client.emit("player-disconnected", { playerNum: thisPlayerNum });
    toggleGameModeCb("");
  };

  client.on("player-has-joined", ({ player1, player2 }) => {
    player1 && setPlayer1Name(player1);
    player2 && setPlayer2Name(player2);
    if (player1 && player2) {
      setScore1(0);
      setScore2(0);
      setInfo("");
      setRound(1);
      setGameOver(false);
      setReplayButton(false);
    }
  });

  client.on("player-disconnected", ({ playerName, playerNum }) => {
    playerNum === 1 ? setPlayer1Name("") : setPlayer2Name("");
    setInfo(`${playerName} left💨`);
    setResultMsg("");
    setGameOver(true);
    setReplayButton(true);
  });

  useEffect(() => {
    if (game === "single") {
      setGameOver(false);
      setPlayer1Name(userName);
      setPlayer2Name("Peanutbot");
    }

    if (game === "multi") {
      client.emit("player-connecting", { userName }, () => {});

      client.on("full-server", () => {
        toggleGameModeCb("");
        alert("Sorry, server is full.");
      });

      client.on("player-1-connected", () => {
        setThisPlayerName(userName);
      });

      client.on("player-2-connected", () => {
        setThisPlayerNum(2);
        setThisPlayerName(userName);
      });

      return () => {
        client.off("full-server");
        client.off("player-1-connected");
        client.off("player-2-connected");
      };
    }
  }, [client, game, userName, toggleGameModeCb]);

  useEffect(() => {
    if (game === "multi") {
      client.on("handle-result", ({ result, lastPlayer }) => {
        handleResultCb(result, lastPlayer);
      });

      client.on("handle-replay", (playerNum) => {
        handleReplayCb(playerNum);
      });
    }
    return () => {
      client.off("handle-result");
      client.off("handle-replay");
    };
  }, [client, game, handleResultCb, handleReplayCb]);

  return (
    <div className="box">
      <div className="row">
        {/* SCORE DSIPLAY */}
        <div className="col">
          <h6 data-testid="round" className="text-primary">
            Round: {round}
          </h6>
          <h4>
            <span data-testid="score1" style={{ color: "#f012be" }}>
              {score1}
            </span>
            <span className="text-primary"> vs </span>
            <span data-testid="score2" className="text-success">
              {score2}
            </span>
          </h4>
        </div>
        {/* PLAYERS LEGEND */}
        <div className="col align-self-end">
          <h6 data-testid="p1Name" className="player row justify-content-end">
            {player1Name ? player1Name : "Waiting..."}
            <div style={{ background: "#f012be" }} className="indicator rounded ml-2" />
          </h6>
          <h6 data-testid="p2Name" className="player row justify-content-end">
            {player2Name ? player2Name : "Waiting..."}
            <div className="bg-success indicator rounded ml-2" />
          </h6>
        </div>
      </div>

      <Grid
        ref={ref}
        game={game}
        handleResultCb={handleResultCb}
        opponentName={opponentName}
        thisPlayerNum={thisPlayerNum}
        gameOver={gameOver}
      />

      {/* RESULT */}
      <h4 data-testid="resultMsg" className="text-center text-warning mt-4">
        {resultMsg}
      </h4>

      {/* INFO */}
      <h5 data-testid="info" className="text-center text-warning mt-4">
        {info}
      </h5>

      <Button
        disabled={replayButton}
        id="replay"
        data-testid="replay"
        className="btn-warning w-100 mt-4"
        onClick={() => handleReplayCb(thisPlayerNum)}
      >
        Replay
      </Button>
      <Button
        id="quitBtn"
        data-testid="quit"
        className="btn btn-warning w-100 mt-3 "
        onClick={handleQuit}
      >
        Quit
      </Button>
    </div>
  );
}
