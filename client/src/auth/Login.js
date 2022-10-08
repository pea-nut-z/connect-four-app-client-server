import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { CustomButton, CustomLink } from "../UI";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const guestLogin = async () => {
    const uid = new ShortUniqueId({ length: 6 })();
    try {
      setError("");
      setLoading(true);
        const userName = "Guest " + uid
        await signup(uid + "@gmail.com", uid).then((cred) => {
          cred.user.updateProfile({
            displayName: userName,
          });
        });
      history.push("/", {userName});
    } catch {
      setLoading(false);
      setError("Failed to log in");
    }
  }

  const handleSubmit = async (e) => {
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
      <Card>
        <Card.Body>
          {error && (
            <Alert data-testid="error" variant="danger">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control data-testid="loginEmailInput" type="email"
                ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                data-testid="loginPasswordInput"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <CustomButton testid="login" text="Log In" disabled={loading} type="submit" />
          </Form>
          <CustomButton testid="guest-login" text="Guest Login" type="button"
        func={guestLogin}
        />
          <CustomLink testid="forgotPassword" text="Forgot Password?" to="/forgot-password" />
        </Card.Body>
      </Card>
      <CustomLink testid="goToSignup" text="Sign Up" moreText="Need an account? " to="/signup" />
    </div>
  );
}
