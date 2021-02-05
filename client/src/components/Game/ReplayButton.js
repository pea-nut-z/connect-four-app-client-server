import React from "react";
import { Button } from "react-bootstrap";

export default function ReplayButton({ setNumOfGames }) {
  function handleReplay() {
    // if (!result) storeScore(currentUser.uid, played + 1, won);
    setNumOfGames(numOfGames + 1);
    // setGrid(initialGrid);
    // displayResult("");
    // setHuPlayerIsNext(true);
  }
  return (
    <Button className="btn-warning w-100 mt-5" onClick={handleReplay}>
      Replay
    </Button>
  );
}
