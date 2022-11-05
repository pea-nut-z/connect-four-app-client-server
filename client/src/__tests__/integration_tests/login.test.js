import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react/pure";
import "@testing-library/jest-dom/extend-expect";
import Login from "../../auth/Login";
import * as mockAuth from "../../__tests__/mockAuth";
import { act } from "react-dom/test-utils";
import { AuthContext } from "../../contexts/AuthContext";

describe("Single player mode - win and lose", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    component = render(
      <AuthContext.Provider value={mockAuth.login}>
        <Login />
      </AuthContext.Provider>
    );
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("test", () => {
    fireEvent.click(getByTestId("login"));
    console.log(component.debug());
  });
});
