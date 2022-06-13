import React, { useState, useEffect, useMemo } from "react";
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

  const ID = useMemo(() => currentUser.uid, [currentUser.uid]);
  const USER_NAME = useMemo(
    () => location.state?.USER_NAME || currentUser.displayName,
    [currentUser.displayName, location.state?.USER_NAME]
  );

  useEffect(() => {
    const ref = base.syncState(ID, {
      context: {
        setState: (data) => setData(data["data"]),
      },
      state: "data",
      defaultValue: { played: 0, won: 0 },
      then: () => console.log("established"),
      onFailure: () => console.log("access denied"),
    });

    return () => {
      base.removeBinding(ref);
    };
  }, [ID]);

  function updateProfile() {
    history.push("/update-profile");
  }

  function toggleGameMode(mode) {
    loadGame(mode);
  }

  function incrementData(key1, key2) {
    let updatedData = { ...data, [key1]: data[key1] + 1 };
    if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
    base.post(ID, {
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
            USER_NAME={USER_NAME}
            game={game}
            incrementData={incrementData}
            toggleGameMode={toggleGameMode}
          />
        </SocketContext.Provider>
      ) : (
        <Dashboard
          toggleGameMode={toggleGameMode}
          logout={logout}
          updateProfile={updateProfile}
          USER_NAME={USER_NAME}
          played={data.played}
          won={data.won}
        />
      )}
    </>
  );
}
