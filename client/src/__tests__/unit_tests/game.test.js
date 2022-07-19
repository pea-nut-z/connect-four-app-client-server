import React, { useRef } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import Game from "../../screen/Game";
import { SocketContext } from "../../contexts/socket";
import { initialGrid } from "../../helper";
import * as mock from "../mockSocketio";

global.alert = jest.fn();
jest.mock("../../screen/Grid");
jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  return {
    ...originReact,
    useRef: jest.fn(() => ({ current: {} })),
  };
});
useRef.mockReturnValue({ current: { grid: initialGrid, resetGrid: jest.fn() } });

const singlePlayerProps = {
  userName: "Player",
  game: "single",
  incrementData: jest.fn(),
  toggleGameModeCb: jest.fn(),
};

const multiPlayerProps = {
  userName: "Jester",
  game: "multi",
  incrementData: jest.fn(),
  toggleGameModeCb: jest.fn(),
};

describe("Single player mode", () => {
  let component, getByTestId;

  beforeAll(() => {
    component = render(<Game {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("renders initial setup", () => {
    expect(getByTestId("p1Name").textContent).toBe(singlePlayerProps.userName);
    expect(getByTestId("p2Name").textContent).toBe("Peanutbot");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).not.toBeDisabled();
  });
});

describe("Multi player mode - player one connecting", () => {
  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mock.connect1}>
        <Game {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the setup for when one player joins the game", () => {
    expect(getByTestId("p1Name").textContent).toBe(multiPlayerProps.userName);
    expect(getByTestId("p2Name").textContent).toBe("Waiting...");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).toBeDisabled();
  });
});

describe("Multi player mode - player two connecting", () => {
  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mock.connect2}>
        <Game {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the setup for when two players join the game", async () => {
    expect(getByTestId("p1Name").textContent).toBe("Tester");
    expect(getByTestId("p2Name").textContent).toBe(multiPlayerProps.userName);
    expect(getByTestId("replay")).not.toBeDisabled();
  });

  it("increments the number of rounds on click of replay", () => {
    fireEvent.click(getByTestId("replay"));
    expect(getByTestId("round").textContent).toBe("Round: 2");
  });
});

describe("Multi player mode - player three connecting", () => {
  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mock.connect3}>
        <Game {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders an alert for the third player who joins the game", () => {
    expect(global.alert).toBeCalledWith("Sorry, server is full.");
  });
});

describe("Multi player mode - player one disconnecting", () => {
  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mock.disconnect1}>
        <Game {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the layout for when a player leaves the game", () => {
    fireEvent.click(getByTestId("quit"));
    expect(getByTestId("p1Name").textContent).toBe("Waiting...");
    expect(getByTestId("info").textContent).toBe("Tester left💨");
    expect(getByTestId("replay")).toBeDisabled();
  });
});

describe("Multi player mode - player two disconnecting", () => {
  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mock.disconnect2}>
        <Game {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the layout for when a player leaves the game", () => {
    fireEvent.click(getByTestId("quit"));
    expect(getByTestId("p2Name").textContent).toBe("Waiting...");
    expect(getByTestId("info").textContent).toBe("Jester left💨");
    expect(getByTestId("replay")).toBeDisabled();
  });
});
