import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
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
          <h2 className="text-center mb-4">
            Hello, {currentUser.displayName}!
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Link to="/single-player" className="btn btn-warning w-100 mt-3">
            Challenage Peanutbot
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
