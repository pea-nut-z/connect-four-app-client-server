import React, { useState, useEffect, useCallback } from "react";
import { Card, Alert } from "react-bootstrap";
import CustomButton from "../UI/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { SocketContext, socket } from "../contexts/socket";
import { useLocation, useHistory } from "react-router-dom";
import Game from "./Game";
import { app } from "../firebase";

export default function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const [data, setData] = useState();
  const [game, setGame] = useState();
  const [id] = useState(currentUser.uid);
  const [userName] = useState(location.state?.userName || currentUser.displayName);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = app.database().ref(id);
    const newData = ref.on("value", (snapshot) => {
      snapshot.val() ? setData(snapshot.val()) : setData({ played: 0, won: 0 });
    });
    return () => {
      ref.off("value", newData);
    };
  }, [id]);

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  const toggleGameModeCb = useCallback((mode) => {
    setGame(mode);
  }, []);

  function updateProfile() {
    history.push("/update-profile");
  }

  const incrementData = useCallback(
    (key1, key2) => {
      let updatedData = { ...data, [key1]: data[key1] + 1 };
      if (key2) updatedData = { ...updatedData, [key2]: data[key2] + 1 };
      const ref = app.database().ref(id);
      ref.update({ ...updatedData });
    },
    [data, id]
  );

  return (
    <main>
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
        <div>
          <Card className="box">
            <Card.Body>
              <h2 id="userName" className="text-center mb-4">
                Hello, {userName}!
              </h2>
              <div className="row">
                <h4 id="played" className="col-6 text-center">
                  🎮 ✖️ {data?.played !== undefined ? data.played : "Loading..."}
                </h4>
                <h4 id="won" className="col-6 text-center">
                  🏆 ✖️ {data?.won !== undefined ? data.won : "Loading..."}
                </h4>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <CustomButton
                id="single"
                text="Challenge Peanutbot"
                type="button"
                func={toggleGameModeCb}
                funcArgu="single"
              />
              <CustomButton
                id="multi"
                text="Play With A Friend"
                type="button"
                func={toggleGameModeCb}
                funcArgu="multi"
              />
              <CustomButton
                id="updateProfile"
                text="Update Profile"
                type="button"
                func={updateProfile}
              />
            </Card.Body>
          </Card>
          <CustomButton
            id="logoutBtn"
            link={true}
            text="Log Out"
            type="button"
            func={handleLogout}
          />
        </div>
      )}
    </main>
  );
}
