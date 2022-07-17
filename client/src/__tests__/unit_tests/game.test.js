import React, { useRef } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Game from "../../screen/Game";
import { SocketContext } from "../../contexts/socket";
import { mockio } from "../mockSocketio";

global.alert = jest.fn();
jest.mock("../../screen/Grid");
jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  return {
    ...originReact,
    useRef: jest.fn(() => ({ current: {} })),
  };
});

const grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

useRef.mockReturnValue({ current: { grid, resetGrid: jest.fn() } });

describe("Single player mode", () => {
  const props = {
    userName: "Player",
    game: "single",
    incrementData: jest.fn(),
    toggleGameModeCb: jest.fn(),
  };
  let component, getByTestId;

  beforeAll(() => {
    component = render(<Game {...props} />);
    getByTestId = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("renders initial setup", () => {
    expect(getByTestId("p1Name").textContent).toBe(props.userName);
    expect(getByTestId("p2Name").textContent).toBe("Peanutbot");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).not.toBeDisabled();
  });
});

describe("Multi player mode", () => {
  const props = {
    userName: "Jester",
    game: "multi",
    incrementData: jest.fn(),
    toggleGameModeCb: jest.fn(),
  };

  let component, getByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mockio.connect()}>
        <Game {...props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the setup for when one player joins the game", () => {
    expect(getByTestId("p1Name").textContent).toBe(props.userName);
    expect(getByTestId("p2Name").textContent).toBe("Waiting...");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).toBeDisabled();
  });

  it("renders the setup for when two players join the game", async () => {
    expect(getByTestId("p1Name").textContent).toBe("Tester");
    expect(getByTestId("p2Name").textContent).toBe(props.userName);
    expect(getByTestId("replay")).not.toBeDisabled();
  });

  it("renders an alert for the third player who joins the game", () => {
    expect(global.alert).toBeCalledWith("Sorry, server is full.");
  });

  it("increments the number of rounds on click of replay", () => {
    fireEvent.click(getByTestId("replay"));
    expect(getByTestId("round").textContent).toBe("Round: 2");
  });

  it("renders the layout for when a player leaves the game", () => {
    fireEvent.click(getByTestId("quit"));
    expect(getByTestId("info").textContent).toBe("Tester left💨");
    expect(getByTestId("replay")).toBeDisabled();
  });
});
