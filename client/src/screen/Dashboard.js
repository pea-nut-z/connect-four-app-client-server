import React, { useState, useCallback } from "react";
import { Card, Alert } from "react-bootstrap";
import CustomButton from "../UI/CustomButton";
import { SocketContext, socket } from "../contexts/socket";
import { useLocation, useHistory } from "react-router-dom";
import Game from "./Game";

export default function Dashboard({ currentUser, data, incrementData, logout }) {
  const history = useHistory();
  const location = useLocation();
  const [game, setGame] = useState();
  const [userName] = useState(location.state?.userName || currentUser.displayName);
  const [error, setError] = useState("");

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

  const updateProfile = () => {
    history.push("/update-profile");
  };

  return (
    <main className="container">
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
              <h2 data-testid="userName" className="text-center mb-4">
                Hello, {userName}!
              </h2>
              <div className="row">
                <h2 data-testid="played" className="col-6 text-center">
                  🎮 ✖️ {data?.played !== undefined ? data.played : "Loading..."}
                </h2>
                <h2 data-testid="won" className="col-6 text-center">
                  🏆 ✖️ {data?.won !== undefined ? data.won : "Loading..."}
                </h2>
              </div>
              {error && (
                <Alert data-testid="error" variant="danger">
                  {error}
                </Alert>
              )}
              <CustomButton
                testid="single"
                text="Challenge Peanutbot"
                type="button"
                func={toggleGameModeCb}
                funcArgu="single"
              />
              <CustomButton
                testid="multi"
                text="Play With A Friend"
                type="button"
                func={toggleGameModeCb}
                funcArgu="multi"
              />
              <CustomButton
                testid="goToUpdate"
                text="Update Profile"
                type="button"
                func={updateProfile}
              />
            </Card.Body>
          </Card>
          <CustomButton
            testid="logout"
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
