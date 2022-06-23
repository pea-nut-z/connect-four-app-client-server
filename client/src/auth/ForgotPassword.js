import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { SubHeader, CustomButton, CustomLink } from "../UI";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <Card>
        <Card.Body>
          <SubHeader text="Password Reset" />
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <CustomButton text="Reset Password" disabled={loading} type="submit" />
          </Form>
          <CustomLink text="Login" to="/login" />
        </Card.Body>
      </Card>
      <CustomLink text="Sign Up" moreText="Need an account? " to="/signup" />
    </div>
  );
}
