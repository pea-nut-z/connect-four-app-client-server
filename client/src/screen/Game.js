import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from "react";
import CustomButton from "../UI/CustomButton";
import { Grid } from "./Grid";
import { initialGrid } from "../helper";
import { SocketContext } from "../contexts/socket";

export default function Game({ userName, game, incrementData, toggleGameModeCb }) {
  const [player1Name, setPlayer1Name] = useState(game === "single" ? userName : null);
  const [player2Name, setPlayer2Name] = useState(game === "single" ? "Peanutbot" : null);
  const [round, setRound] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameOver, setGameOver] = useState(game === "single" ? false : true);
  const [resultMsg, setResultMsg] = useState("");
  const [info, setInfo] = useState("");
  const [disableReplayBtn, setDisableReplayBtn] = useState(game === "single" ? false : true);
  const [thisPlayerNum, setThisPlayerNum] = useState(1);
  const [thisPlayerName, setThisPlayerName] = useState("");

  const [result, setResult] = useState(0);
  const [triggeredBy, setTriggeredBy] = useState(0);
  const [replay, setReplay] = useState(false);

  const opponentName = useMemo(
    () => (thisPlayerNum === 1 ? player2Name : player1Name),
    [player1Name, player2Name, thisPlayerNum]
  );
  const client = useContext(SocketContext);
  const ref = useRef();

  const handleResultCb = useCallback((result, playerNum) => {
    setResult(result);
    setTriggeredBy(playerNum);
  }, []);

  const replayCb = useCallback((playerNum) => {
    setReplay(true);
    setTriggeredBy(playerNum);
  }, []);

  const quit = () => {
    const isBlankGrid = JSON.stringify(ref.current.grid) === JSON.stringify(initialGrid);
    if (!info && !isBlankGrid) incrementData("played");
    if (game === "multi") {
      client.emit("player-disconnected", { playerNum: thisPlayerNum });
    }
    // if (game === "multi" && !opponentName) {
    //   client.disconnect();
    // }
    toggleGameModeCb("");
  };

  useEffect(() => {
    if (game === "multi") {
      client.emit("player-connecting", { userName });
      client.on("player-has-joined", ({ player1, player2 }) => {
        player1 && setPlayer1Name(player1);
        player2 && setPlayer2Name(player2);
        if (player1 && player2) {
          setScore1(0);
          setScore2(0);
          setInfo("");
          setRound(1);
          setGameOver(false);
          setDisableReplayBtn(false);
        }
      });

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

      client.on("player-disconnected", ({ playerName, playerNum }) => {
        playerNum === 1 ? setPlayer1Name("") : setPlayer2Name("");
        setInfo(`${playerName} left💨`);
        setResultMsg("");
        setGameOver(true);
        setDisableReplayBtn(true);
      });

      return () => {
        if (game === "multi") {
          client.off("player-has-joined");
          client.off("full-server", toggleGameModeCb);
          client.off("player-1-connected");
          client.off("player-2-connected");
          client.off("player-disconnected");
        }
      };
    }
  }, [client, game, userName, toggleGameModeCb]);

  // NEXT MOCK HERE
  useEffect(() => {
    if (game === "multi") {
      client.on("result", ({ result, playerNum }) => {
        handleResultCb(result, playerNum);
      });

      client.on("replay", ({ playerNum }) => {
        replayCb(playerNum);
      });
    }

    return () => {
      if (game === "multi") {
        client.off("result", handleResultCb);
        client.off("replay", replayCb);
      }
    };
  }, [client, game, handleResultCb, replayCb]);

  useEffect(() => {
    if (result) {
      if (result === thisPlayerNum) {
        setResultMsg("🥂 YOU WIN! 🎉");
        incrementData("won");
      } else if (result === "Draw") {
        setResultMsg(result + "! 🤝");
      } else {
        setResultMsg("😱 YOU LOSE! 💩");
      }

      if (triggeredBy === thisPlayerNum || game === "single") {
        setInfo("Click Replay ⬇️");
      }
      if (game === "multi" && triggeredBy !== thisPlayerNum) {
        setInfo(`Waiting for ${thisPlayerName} to restart the game...`);
        setDisableReplayBtn(true);
      }
      result === thisPlayerNum ? incrementData("played", "won") : incrementData("played");
      result === 1 && setScore1((score) => score + 1);
      result === 2 && setScore2((score) => score + 1);
      setGameOver(true);
      setResult(0);
      setTriggeredBy(0);
    }
  }, [result, game, incrementData, triggeredBy, thisPlayerName, thisPlayerNum]);

  useEffect(() => {
    if (replay) {
      const isBlankGrid = JSON.stringify(ref.current.grid) === JSON.stringify(initialGrid);
      if (!gameOver && !isBlankGrid && triggeredBy === thisPlayerNum) incrementData("played"); //replay in the middle of the game
      ref.current.resetGrid();
      setGameOver(false);
      setRound((PreRound) => PreRound + 1);
      setResultMsg("");
      setInfo("");
      setDisableReplayBtn(false);
      setReplay(false);
      setTriggeredBy(0);
    }
  }, [gameOver, incrementData, triggeredBy, replay, thisPlayerNum]);

  return (
    <div className="container">
      <div className="row">
        {/* SCORE DSIPLAY */}
        <div className="col">
          <h5 data-testid="round" className="text-primary">
            Round: {round}
          </h5>
          <h5>
            <span data-testid="score1" className="pink_font">
              {score1}
            </span>
            <span className="text-primary"> vs </span>
            <span data-testid="score2" className="text-success">
              {score2}
            </span>
          </h5>
        </div>
        {/* PLAYERS LEGEND */}
        <div className="col align-self-end">
          <h5 data-testid="p1Name" className="player row justify-content-end">
            {player1Name ? player1Name : "Waiting..."}
            <div className="pink_background indicator rounded ml-2" />
          </h5>
          <h5 data-testid="p2Name" className="player row justify-content-end">
            {player2Name ? player2Name : "Waiting..."}
            <div className="bg-success indicator rounded ml-2" />
          </h5>
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
      <h4 data-testid="resultMsg" className="text-center text-warning mt-2">
        {resultMsg}
      </h4>

      {/* INFO */}
      <h4 data-testid="info" className="text-center text-warning mt-2">
        {info}
      </h4>

      {/* BUTTONS */}
      <div
        onClick={() => {
          client.emit("replay", { playerNum: thisPlayerNum });
        }}
      >
        <CustomButton
          id="replay"
          testid="replay"
          text="Replay"
          type="button"
          func={replayCb}
          funcArgu={thisPlayerNum}
          disabled={disableReplayBtn}
        />
      </div>
      <CustomButton id="quitBtn" testid="quit" text="Quit" type="button" func={quit} />
    </div>
  );
}
