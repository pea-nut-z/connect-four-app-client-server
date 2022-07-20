import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { SubHeader, CustomButton, CustomLink } from "../UI";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then((cred) => {
        cred.user.updateProfile({
          displayName: usernameRef.current.value,
        });
      });
      history.push("/", { userName: usernameRef.current.value });
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <SubHeader text="Sign Up" />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control data-testid="nameInput" type="text" ref={usernameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control data-testid="emailInput" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                data-testid="passwordInput"
                type="password"
                placeholder="Minimum 6 characters"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                data-testid="confirmPasswordInput"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <CustomButton testid="signup" text="Sign Up" disabled={loading} type="submit" />
          </Form>
        </Card.Body>
      </Card>
      <CustomLink text="Log In" moreText="Already have an account? " to="/login" />
    </div>
  );
}
