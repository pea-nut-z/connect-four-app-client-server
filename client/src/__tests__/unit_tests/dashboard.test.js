import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react/pure";
import Dashboard from "../../screen/Dashboard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/testroute",
    search: "",
    hash: "",
    state: null,
  }),
}));

jest.mock("../../UI/CustomButton", () => {
  return {
    __esModule: true,
    default: () => {
      return <div />;
    },
  };
});

const history = createMemoryHistory();

const props = {
  currentUser: {
    displayName: "Tester",
  },
  data: {
    played: 2,
    won: 1,
  },
  logout: jest.fn(),
};

describe("Dashboard", () => {
  let component, getByTestId;

  beforeAll(() => {
    component = render(
      <Router history={history}>
        <Dashboard {...props} />
      </Router>
    );
    getByTestId = component.getByTestId;
  });

  it("shows username", () => {
    expect(getByTestId("userName")).toHaveTextContent(`Hello, ${props.currentUser.displayName}!`);
  });

  it("shows number of games played", () => {
    expect(getByTestId("played")).toHaveTextContent(`🎮 ✖️ ${props.data.played}`);
  });

  it("shows number of times won", () => {
    expect(getByTestId("won")).toHaveTextContent(`🏆 ✖️ ${props.data.won}`);
  });
});
