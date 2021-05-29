import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setLoading(false);
      setError("Failed to log in");
    }
  }

  return (
    <>
      <h1 data-testid="title" className="title text-center text-primary">
        Connect Four
      </h1>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && (
            <Alert id="error" variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control id="emailInput" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control id="passwordInput" type="password" ref={passwordRef} required />
            </Form.Group>
            <Button id="loginBtn" disabled={loading} className="btn-warning w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="text-decoration-none" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <Link id="signupLink" className="text-decoration-none" to="/signup">
          Sign Up
        </Link>
      </div>
    </>
  );
}
