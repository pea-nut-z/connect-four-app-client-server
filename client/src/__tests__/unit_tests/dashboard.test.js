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

jest.mock("../../screen/Game", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="game">Game Component</div>;
    },
  };
});
const history = createMemoryHistory();

describe("Dashboard - success", () => {
  const props = {
    currentUser: {
      displayName: "Tester",
    },
    data: {
      played: 2,
      won: 1,
    },
    logout: jest.fn(() => ({ auth: { logout: jest.fn() } })),
  };

  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <Router history={history}>
        <Dashboard {...props} />
      </Router>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
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

  it("renders game component on click", async () => {
    await act(async () => {
      await fireEvent.click(getByTestId("single"));
    });
    expect(getByTestId("game").textContent).toBe("Game Component");
  });

  it("navigates to Update Profile on click", () => {
    fireEvent.click(getByTestId("update"));
    expect(history.location.pathname).toBe("/update-profile");
  });

  it("navigates to Log In on successful log out", () => {
    history.goBack();
    fireEvent.click(getByTestId("logout"));
    expect(history.location.pathname).toBe("/");
  });
});

describe("Dashboard - failture", () => {
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

  it("shows loading when there is no player data", () => {
    expect(getByTestId("played").textContent).toBe("🎮 ✖️ Loading...");
    expect(getByTestId("won").textContent).toBe("🏆 ✖️ Loading...");
  });

  it("shows error messsage on log out failure", async () => {
    await act(async () => {
      await fireEvent.click(getByTestId("logout"));
    });
    expect(getByTestId("error").textContent).toBe("Failed to log out");
  });
});
