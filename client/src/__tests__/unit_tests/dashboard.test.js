import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react/pure";
import Dashboard from "../../screen/Dashboard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Dashboard", () => {
  const mockUser = {
    displayName: "Tester",
  };

  const mockLogout = jest.fn();

  const mockData = {
    played: 2,
    won: 1,
  };

  const mockUseLocationValue = {
    pathname: "/testroute",
    search: "",
    hash: "",
    state: null,
  };

  let component, getByTestId;

  beforeAll(() => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useLocation: () => mockUseLocationValue,
    }));

    const history = createMemoryHistory();
    component = render(
      <Router history={history}>
        <Dashboard currentUser={mockUser} data={mockData} logout={mockLogout} />
      </Router>
    );
    getByTestId = component.getByTestId;
  });

  it("shows username", () => {
    expect(getByTestId("userName")).toHaveTextContent(`Hello, ${mockUser.displayName}!`);
  });

  it("shows number of games played", () => {
    expect(getByTestId("played")).toHaveTextContent(`🎮 ✖️ ${mockData.played}`);
  });

  it("shows number of times won", () => {
    expect(getByTestId("won")).toHaveTextContent(`🏆 ✖️ ${mockData.won}`);
  });
});
