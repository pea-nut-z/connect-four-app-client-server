import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react/pure";
import "@testing-library/jest-dom/extend-expect";
import Game from "../../screen/Game";
import * as helper from "../../helper";

const singlePlayerProps = {
  userName: "Player",
  game: "single",
  incrementData: jest.fn(),
  toggleGameModeCb: jest.fn(),
};

describe("Single player mode - win and lose", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    helper.initialGrid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 1],
    ];
    helper.initialRowIndex = [5, 5, 5, 5, 5, 2, 2];
    component = render(<Game {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders messages and increments human's score when human wins", () => {
    const move = getAllByTestId("6");
    fireEvent.click(move[0]);
    expect(getByTestId("score1").textContent).toBe("1");
    expect(getByTestId("resultMsg").textContent).toBe("🥂 YOU WIN! 🎉");
    expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
  });

  it("renders messages and increments AI's score when AI wins", async () => {
    const move = getAllByTestId("4");
    fireEvent.click(move[0]);
    await waitFor(() => {
      expect(getByTestId("score2").textContent).toBe("1");
      expect(getByTestId("resultMsg").textContent).toBe("😱 YOU LOSE! 💩");
      expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
    });
  });

  it("increments player's play data on click of replay in the middle of a game", () => {
    const move = getAllByTestId("4");
    fireEvent.click(move[0]);
    fireEvent.click(getByTestId("replay"));
    expect(singlePlayerProps.incrementData).toHaveBeenCalledWith("played");
  });

  it("increments player's play data on click of quit in the middle of a game", () => {
    const move = getAllByTestId("4");
    fireEvent.click(move[0]);
    fireEvent.click(getByTestId("quit"));
    expect(singlePlayerProps.incrementData).toHaveBeenCalledWith("played");
  });
});

describe("Single player mode - draw", () => {
  let component, getByTestId, getAllByTestId;

  beforeEach(() => {
    helper.initialGrid = [
      [0, 2, 1, 1, 2, 1, 1],
      [1, 2, 1, 1, 2, 1, 2],
      [1, 1, 1, 2, 2, 1, 1],
      [2, 2, 2, 1, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 2, 2],
    ];
    helper.initialRowIndex = [0, 9, 9, 9, 9, 9, 9];
    component = render(<Game {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders messages and both players' scores remain the same", () => {
    const move = getAllByTestId("0");
    fireEvent.click(move[0]);
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("Draw! 🤝");
    expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
  });
});
