import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Game from "./game/Game";
import { SocketContext, socket } from "../contexts/socket";
import base from "./../firebase";

export default function Page() {
  // USER INFO
  const { currentUser, logout } = useAuth();
  const userName = currentUser.displayName;
  const id = currentUser.uid;
  const [game, loadGame] = useState();
  const [data, setData] = useState(JSON.parse(localStorage.getItem(id)) || {});

  function toggleGameMode(mode) {
    loadGame(mode);
  }

  function incrementData(key) {
    const updatedData = { ...data, [key]: data[key] + 1 };
    setData(updatedData);
    base.post(id, {
      data: updatedData,
    });
  }

  useEffect(() => {
    const ref = base.syncState(id, {
      context: {
        setState: ({ data }) => setData({ ...data }),
        state: { data },
      },
      state: "data",
    });

    const existingData = ref["context"]["state"]["data"];
    if (Object.keys(existingData).length === 0) {
      base.post(id, {
        data: { played: 0, won: 0 },
      });
    }

    return () => {
      base.removeBinding(ref);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(data));
  }, [data]);

  return (
    <>
      {game ? (
        <SocketContext.Provider value={socket}>
          <Game
            userName={userName}
            game={game}
            incrementData={incrementData}
            toggleGameMode={toggleGameMode}
          />
        </SocketContext.Provider>
      ) : (
        <Dashboard
          toggleGameMode={toggleGameMode}
          logout={logout}
          userName={userName}
          played={data.played}
          won={data.won}
        />
      )}
    </>
  );
}
