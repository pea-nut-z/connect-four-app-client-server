import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Login from "../src/components/auth/Login";
import * as firebase from "@firebase/testing";

const PROJECT_ID = "connect-four-development";
const DATABASE_NAME = "connect-four-development-default-rtdb";
const UID = "3T98g8EysVPYn1c5XYsUKOgyFLz1";
describe("Login", () => {
  it("renders Login.js without crashing", () => {
    // firebase.initializeTestApp({ projectId: PROJECT_ID });

    firebase.initializeTestApp({
      databaseName: DATABASE_NAME,
      auth: { uid: UID },
    });
    firebase.firestore();

    render(<Login />);
  });
});
