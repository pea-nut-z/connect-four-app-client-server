import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Game from "./game/Game";
import { SocketContext, socket } from "../contexts/socket";

export default function Page() {
  // USER INFO
  const { currentUser, logout } = useAuth();
  const userName = currentUser.displayName;
  const id = currentUser.uid;
  const [game, loadGame] = useState();
  const [playedData, setPlayedData] = useState(0);
  const [scoreData, setScoreData] = useState(0);

  function toggleGameMode(mode) {
    loadGame(mode);
  }

  function incrementPlayedData() {
    setPlayedData(playedData + 1);
  }

  function incrementScoreData() {
    setScoreData(scoreData + 1);
  }

  return (
    <>
      {game ? (
        <SocketContext.Provider value={socket}>
          <Game
            userName={userName}
            game={game}
            incrementPlayedData={incrementPlayedData}
            incrementScoreData={incrementScoreData}
            toggleGameMode={toggleGameMode}
          />
        </SocketContext.Provider>
      ) : (
        <Dashboard
          toggleGameMode={toggleGameMode}
          logout={logout}
          userName={userName}
          played={playedData}
          won={scoreData}
        />
      )}
    </>
  );
}
