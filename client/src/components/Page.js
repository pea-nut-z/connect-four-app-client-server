import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Game from "./game/Game";
import { getGrid } from "./game/help";
import { SocketContext, socket } from "../contexts/socket";
import base from "./../firebase";
import { useLocation, useHistory } from "react-router-dom";

export default function Page() {
  const history = useHistory();
  const location = useLocation();

  // USER INFO
  const { currentUser, logout } = useAuth();
  const id = currentUser.uid;
  const profileName = currentUser.displayName;
  const userName = location.state?.userName || profileName;

  const initialGrid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    ["p1", null, null, null, null, null, null],
    ["p1", null, null, null, null, null, null],
    ["p1", "p2", "p2", null, "p2", null, null],
    ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
  ];

  // const initialGrid = getGrid();
  const [data, setData] = useState(JSON.parse(localStorage.getItem(id)) || {});
  const [game, loadGame] = useState();

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
      setData({ played: 0, won: 0 });
    }

    return () => {
      base.removeBinding(ref);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(data));
  }, [data]);

  function updateProfile() {
    history.push("/update-profile");
  }

  function toggleGameMode(mode) {
    loadGame(mode);
  }

  function incrementData(key1, key2) {
    let updatedData = { ...data, [key1]: data[key1] + 1 };
    if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
    setData(updatedData);
    base.post(id, {
      data: updatedData,
    });
  }

  return (
    <>
      {game ? (
        <SocketContext.Provider value={socket}>
          <Game
            userName={userName}
            game={game}
            initialGrid={initialGrid}
            incrementData={incrementData}
            toggleGameMode={toggleGameMode}
          />
        </SocketContext.Provider>
      ) : (
        <Dashboard
          toggleGameMode={toggleGameMode}
          logout={logout}
          updateProfile={updateProfile}
          userName={userName}
          played={data.played}
          won={data.won}
        />
      )}
    </>
  );
}
