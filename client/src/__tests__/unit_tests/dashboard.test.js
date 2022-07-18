import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react/pure";
import Dashboard from "../../screen/Dashboard";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/testroute",
    search: "",
    hash: "",
    state: null,
  }),
}));

const history = createMemoryHistory();

describe("Dashboard", () => {
  // jest.mock("../../UI/CustomButton", () => {
  //   return {
  //     __esModule: true,
  //     default: () => {
  //       return <div data-testid="customButton" />;
  //     },
  //   };
  // });

  const props = {
    currentUser: {
      displayName: "Tester",
    },
    data: {
      played: 2,
      won: 1,
    },
  };

  let component, getByTestId;

  beforeAll(() => {
    component = render(
      <Router history={history}>
        <Dashboard {...props} />
      </Router>
    );
    getByTestId = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
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

  // it("renders four buttons", () => {
  //   expect(getAllByTestId("customButton").length).toEqual(4);
  // });
});

describe("Dashboard", () => {
  const props = {
    currentUser: {
      displayName: "Tester",
    },
    data: {},
    logout: jest.fn(() => {
      return Promise.reject();
    }),
  };

  let component, getByTestId;

  beforeAll(() => {
    component = render(
      <Router history={history}>
        <Dashboard {...props} />
      </Router>
    );
    getByTestId = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("shows loading", () => {
    expect(getByTestId("played").textContent).toBe("🎮 ✖️ Loading...");
    expect(getByTestId("won").textContent).toBe("🏆 ✖️ Loading...");
  });

  it("shows error messsage on log out failure", async () => {
    await act(async () => {
      await fireEvent.click(getByTestId("logoutBtn"));
    });
    expect(getByTestId("error").textContent).toBe("Failed to log out");
  });
});
