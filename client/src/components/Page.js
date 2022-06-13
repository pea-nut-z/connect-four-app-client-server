import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Game from "./game/Game";
import { SocketContext, socket } from "../contexts/socket";
import base from "./../firebase";
import { useLocation, useHistory } from "react-router-dom";

export default function Page() {
  const history = useHistory();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const [data, setData] = useState({});
  const [game, loadGame] = useState();
  const [id] = useState(currentUser.uid);
  const [userName] = useState(location.state?.userName || currentUser.displayName);

  useEffect(() => {
    const ref = base.syncState(id, {
      context: {
        setState: (data) => setData(data["data"]),
      },
      state: "data",
      defaultValue: { played: 0, won: 0 },
      then: () => console.log("data synced"),
      onFailure: () => console.log("access denied"),
    });

    return () => {
      base.removeBinding(ref);
    };
  }, [id]);

  const toggleGameModeCb = useCallback((mode) => {
    loadGame(mode);
  }, []);

  function updateProfile() {
    history.push("/update-profile");
  }

  function incrementData(key1, key2) {
    let updatedData = { ...data, [key1]: data[key1] + 1 };
    if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
    base.post(id, {
      data: updatedData,
      then(err) {
        if (err) console.log(err);
      },
    });
  }

  return (
    <>
      {game ? (
        <SocketContext.Provider value={socket}>
          <Game
            userName={userName}
            game={game}
            incrementData={incrementData}
            toggleGameModeCb={toggleGameModeCb}
          />
        </SocketContext.Provider>
      ) : (
        <Dashboard
          toggleGameModeCb={toggleGameModeCb}
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
