import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { CustomButton, CustomLink } from "../UI";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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
    <div className="container">
      <header data-testid="title" className="title text-primary">
        Connect Four
      </header>
      <Card className="box">
        <Card.Body>
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
            <CustomButton id="loginBtn" text="Log In" disabled={loading} type="submit" />
          </Form>
          <CustomLink text="Forgot Password?" to="/forgot-password" />
        </Card.Body>
      </Card>
      <CustomLink id="signupLink" text="Sign Up" moreText="Need an account? " to="/signup" />
    </div>
  );
}
