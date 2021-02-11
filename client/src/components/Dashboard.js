import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Control({ toggleGameMode, logout, userName, played, won }) {
  const [error, setError] = useState("");
  const history = useHistory();

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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Hello, {userName}!</h2>
          <div className="row">
            <h4 className="col-6 text-center">🎮 ✖️ {played}</h4>
            <h4 className="col-6 text-center">🏆 ✖️ {won}</h4>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}

          <Button
            onClick={() => {
              toggleGameMode("single");
            }}
            className="btn btn-warning w-100 mt-3"
          >
            Challenge Peanutbot
          </Button>
          <Button
            onClick={() => {
              toggleGameMode("multi");
            }}
            className="btn btn-warning w-100 mt-3"
          >
            Play With A Friend
          </Button>
          <Link to="/update-profile" className="btn btn-warning w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" className="text-decoration-none" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
