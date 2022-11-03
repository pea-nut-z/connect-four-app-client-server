import React, { useState, useRef, useCallback } from "react";
import { Card, Alert } from "react-bootstrap";
import CustomButton from "../UI/CustomButton";
import { SocketContext, socket } from "../contexts/socket";
import { useHistory } from "react-router-dom";
import Game from "./Game";

export default function Dashboard({ currentUser, incrementData, logout }) {
  const history = useHistory();
  const [game, setGame] = useState();
  const [error, setError] = useState("");
  const userName = useRef(currentUser.userName).current;

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
            currentUser={currentUser}
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
                  🎮 ✖️ {currentUser?.played !== undefined ? currentUser.played : "Loading..."}
                </h2>
                <h2 data-testid="won" className="col-6 text-center">
                  🏆 ✖️ {currentUser?.won !== undefined ? currentUser.won : "Loading..."}
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
