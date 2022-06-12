import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Dashboard({
  toggleGameMode,
  logout,
  updateProfile,
  USER_NAME,
  played,
  won,
}) {
  const history = useHistory();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card className="box">
        <Card.Body>
          <h2 id="userName" className="text-center mb-4">
            Hello, {USER_NAME}!
          </h2>
          <div className="row">
            <h4 id="played" className="col-6 text-center">
              🎮 ✖️ {played}
            </h4>
            <h4 id="won" className="col-6 text-center">
              🏆 ✖️ {won}
            </h4>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            id="single"
            onClick={() => {
              toggleGameMode("single");
            }}
            className="btn btn-warning w-100 mt-3"
          >
            Challenge Peanutbot
          </Button>
          <Button
            id="multi"
            onClick={() => {
              toggleGameMode("multi");
            }}
            className="btn btn-warning w-100 mt-3"
          >
            Play With A Friend
          </Button>
          <Button id="updateProfile" className="btn btn-warning w-100 mt-3" onClick={updateProfile}>
            Update Profile
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
          id="logoutBtn"
          variant="link"
          className="text-decoration-none"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
