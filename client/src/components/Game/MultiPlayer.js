import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SquareGrid from "./SquareGrid";
import { createGrid, checkResult, findAValidMove } from "./help";
import "./game.css";
import io from "socket.io-client";

export default function MultiPlayer() {
  const history = useHistory();
  const blankGrid = createGrid(6, 7);
  const [grid, setGrid] = useState(blankGrid);
  const [connected1, toggleConnection1] = useState(false);
  const [connected2, toggleConnection2] = useState(false);
  const [result, displayResult] = useState("");

  const [endThisTurn, triggerEndThisTurn] = useState();
  const [ready, toggleReady] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("Player-1");

  useEffect(() => {
    const client = io("/");

    // ignore the 3rd player
    client.on("full-server", () => {
      alert("Sorry, server is full!");
      history.push("/");
    });

    client.on("assign-player-as-player2", () => {
      setCurrentPlayer("Player-2");
    });

    // set connection status indicators
    client.on("player-connection-status", (status) => {
      if (status[0]) toggleConnection1(true);
      if (status[1]) toggleConnection2(true);
    });

    // switch turns
    client.emit("switch-turn", grid);
    client.on("take-the-turn", (grid) => {
      setGrid(grid);
      let result = checkResult(grid);
      displayResult(result);
      toggleReady(true);
    });

    // handle disconnect
    client.on("player-disconnected", (num) => {
      if (num === 0) toggleConnection1(false);
      if (num === 1) toggleConnection2(false);
    });

    return () => {
      client.disconnect();
    };
  }, [endThisTurn]);

  const handleClick = (columnIndex) => {
    if (ready && !result) {
      let newGrid = grid.slice();
      const [row, col] = findAValidMove(newGrid, columnIndex);
      newGrid[row][col] = currentPlayer;
      setGrid(newGrid);
      let result = checkResult(newGrid);
      displayResult(result);
      toggleReady(false);
      triggerEndThisTurn(!endThisTurn);
    }
  };

  function handleReplay() {
    window.location.reload(false);
  }

  return (
    <>
      <div id="boarder">
        <div id="grid">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((value, columnIndex) => (
                <SquareGrid
                  key={columnIndex}
                  value={value}
                  columnIndex={columnIndex}
                  handleClick={handleClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WHO's TURN DISPLAY*/}
      <h4 className="text-success text-center mt-4">
        {result ? "" : ready ? "Your turn!" : "Waiting for the other player..."}
      </h4>

      {/* RESULT DSIPLAY*/}
      <h4 className="text-danger text-center mt-4">{result}</h4>

      {/* CONNECTION INDICATOR */}
      <div>
        <div
          className="rounded"
          className={`connection ${connected1 ? "bg-success" : "bg-danger"}`}
        />
        Player 1<span>{connected1 ? " Connected" : " Disconnected"}</span>
      </div>
      <div>
        <div
          className={`connection ${connected2 ? "bg-success" : "bg-danger"}`}
        />
        Player 2<span>{connected2 ? " Connected" : " Disconnected"}</span>
      </div>
      <Button className="btn-warning w-100 mt-5" onClick={handleReplay}>
        Replay
      </Button>
      <Link to="/" className="btn btn-warning w-100 mt-3 ">
        Quit
      </Link>
    </>
  );
}
