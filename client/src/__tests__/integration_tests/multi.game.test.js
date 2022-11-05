import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import Game from "../../screen/Game";
import { SocketContext } from "../../contexts/socket";
import * as mockSocket from "../mockSocketio";

jest.mock("../../helper", () => ({
  ...jest.requireActual("../../helper"),
  initialGrid: [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 0, 0, 2, 1],
    [0, 0, 0, 0, 0, 1, 2],
    [0, 0, 0, 0, 0, 1, 2],
  ],
  initialRowIndex: [5, 5, 5, 5, 5, 0, 0],
}));

const player2Props = {
  currentUser: { played: 0, won: 0 },
  userName: "Jester",
  game: "multi",
  updateUser: jest.fn(),
  toggleGameModeCb: jest.fn(),
};

describe("Multi player mode - win", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mockSocket.connect2}>
        <Game {...player2Props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders messages and increments player 2's score when player 2 wins", () => {
    const player2Move = getAllByTestId("5")[0];
    fireEvent.click(player2Move);
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("1");
    expect(getByTestId("resultMsg").textContent).toBe("🥂 YOU WIN! 🎉");
    expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
    expect(getByTestId("replay")).not.toBeDisabled();
  });
});

describe("Multi player mode - lose", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mockSocket.onResult}>
        <Game {...player2Props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("updates player 2's grid, message display and scores when player 1 wins", () => {
    expect(getAllByTestId("6")[0].className).toBe("circle p1");
    expect(getByTestId("score1").textContent).toBe("1");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("😱 YOU LOSE! 💩");
    expect(getByTestId("replay")).toBeDisabled();
    expect(getByTestId("info").textContent).toBe("Waiting for Tester to restart the game...");
  });
});

describe("Multi player mode - update on moves", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mockSocket.onUpdate}>
        <Game {...player2Props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("updates player 2 when player 1 makes a move", () => {
    expect(getAllByTestId("6")[5].className).toBe("circle p1");
    expect(getByTestId("turn").textContent).toBe("Your turn");
  });
});

describe("Multi player mode - reset on replay", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    component = render(
      <SocketContext.Provider value={mockSocket.onReplay}>
        <Game {...player2Props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("resets player 2's game when player 1 clicks on Replay", () => {
    expect(getByTestId("round").textContent).toBe("Round: 2");
    expect(getAllByTestId("6")[5].className).toBe("circle p2");
    expect(getByTestId("turn").textContent).toBe("Your turn");
  });
});
