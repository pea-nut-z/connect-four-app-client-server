import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Game from "./game/Game";
import { SocketContext, socket } from "../contexts/socket";
import base from "./../firebase";
import { useLocation, useHistory } from "react-router-dom";

export default function Page() {
  const history = useHistory();
  const location = useLocation();

  // USER INFO
  const { currentUser, logout } = useAuth();
  const ID = currentUser.uid;
  const PROFILE_NAME = currentUser.displayName;
  const USER_NAME = location.state?.USER_NAME || PROFILE_NAME;
  const [data, setData] = useState(JSON.parse(localStorage.getItem(ID)) || {});
  const [game, loadGame] = useState();

  // const INITIAL_GRID = [
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [2, 2, 2, 0, 0, 0, 0],
  //   [1, 1, 1, 0, 0, 0, 0],
  // ];

  // const INITIAL_GRID = [
  //   [2, 2, 1, 1, 2, 0, 1],
  //   [1, 2, 1, 1, 2, 1, 2],
  //   [1, 1, 1, 2, 2, 1, 1],
  //   [2, 2, 2, 1, 1, 2, 1],
  //   [2, 1, 1, 2, 2, 1, 2],
  //   [2, 2, 1, 1, 2, 2, 2],
  // ];

  useEffect(() => {
    const ref = base.syncState(ID, {
      context: {
        setState: ({ data }) => setData({ ...data }),
        state: { data },
      },
      state: "data",
    });

    const existingData = ref["context"]["state"]["data"];
    if (Object.keys(existingData).length === 0) {
      base.post(ID, {
        data: { played: 0, won: 0 },
      });
      setData({ played: 0, won: 0 });
    }

    return () => {
      base.removeBinding(ref);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(ID, JSON.stringify(data));
  }, [data, ID]);

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
    base.post(ID, {
      data: updatedData,
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
