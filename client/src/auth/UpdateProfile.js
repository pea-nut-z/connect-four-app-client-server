import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { SubHeader, CustomButton, CustomLink } from "../UI";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (usernameRef.current.value !== currentUser.displayName) {
      promises.push(currentUser.updateProfile({ displayName: usernameRef.current.value }));
    }
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <SubHeader text="Update Profile" />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                id="usernameInput"
                type="text"
                ref={usernameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <CustomButton id="updateBtn" text="Update" disabled={loading} type="submit" />
          </Form>
        </Card.Body>
      </Card>
      <CustomLink text="Cancel" id="cancelLink" to="/" />
    </>
  );
}
