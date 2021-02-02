import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { fetchScore, storeScore } from "./Game/help";

export default function Dashboard() {
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const [error, setError] = useState("");
  const [playedTotal, setPlayedTotal] = useState(0);
  const [wonTotal, setWonTotal] = useState(0);

  useEffect(() => {
    const [played, won] = fetchScore(currentUser.uid);
    if (played) {
      setPlayedTotal(played);
      setWonTotal(won);
    } else {
      storeScore(currentUser.uid, 0, 0);
    }
  });

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
          <h2 className="text-center mb-4">
            Hello, {currentUser.displayName}!
          </h2>
          <div className="row">
            <h4 className="col-6 text-center">🎮 ✖️ {playedTotal}</h4>
            <h4 className="col-6 text-center">🏆 ✖️ {wonTotal}</h4>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Link to="/single-player" className="btn btn-warning w-100 mt-3">
            Challenge Peanutbot
          </Link>
          <Link to="/multi-player" className="btn btn-warning w-100 mt-3">
            Play With A Friend
          </Link>
          <Link to="/update-profile" className="btn btn-warning w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button
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
