import React from "react";
import { render } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Login from "../src/components/auth/Login";
import * as firebase from "@firebase/rules-unit-testing";

const PROJECT_ID = "connect-four-development";

describe("Login", () => {
  it("renders Login.js without crashing", () => {
    firebase.initializeTestApp({ projectId: PROJECT_ID });
    firebase.firestore();

    render(<Login />);
  });
});
