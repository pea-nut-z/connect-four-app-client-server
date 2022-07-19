import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react/pure";
import "@testing-library/jest-dom/extend-expect";
import Game from "../../screen/Game";
import * as helper from "../../helper";
import { act } from "react-dom/test-utils";

const singlePlayerProps = {
  userName: "Player",
  game: "single",
  incrementData: jest.fn(),
  toggleGameModeCb: jest.fn(),
};

describe("Single player mode - win and lose", () => {
  let component, getByTestId, getAllByTestId, container;

  beforeEach(() => {
    helper.initialGrid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 1, 2],
      [0, 0, 0, 0, 0, 1, 2],
    ];
    helper.initialRowIndex = [5, 5, 5, 5, 5, 0, 0];
    component = render(<Game {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
    container = component.container;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders messages and increments player's score when player wins", () => {
    const playerMove = getAllByTestId("6")[0];
    fireEvent.click(playerMove);
    expect(getByTestId("score1").textContent).toBe("1");
    expect(getByTestId("resultMsg").textContent).toBe("🥂 YOU WIN! 🎉");
    expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
  });

  it("renders messages and increments AI's score when AI wins", async () => {
    const playerMove = getAllByTestId("4")[0];
    fireEvent.click(playerMove);
    await waitFor(() => {
      expect(getByTestId("score2").textContent).toBe("1");
      expect(getByTestId("resultMsg").textContent).toBe("😱 YOU LOSE! 💩");
      expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
    });
  });

  // Passes but with odd log: Round:2 after click of replay; after setTimeout it does
  // not render the "Your turn" message
  it("waits for AI to start the game when player loses", async () => {
    const playerMove = getAllByTestId("4")[0];
    fireEvent.click(playerMove);

    await waitFor(async () => {
      expect(getByTestId("resultMsg").textContent).toBe("😱 YOU LOSE! 💩");
      fireEvent.click(getByTestId("replay"));
      expect(getByTestId("turn").textContent).toBe("Waiting for Peanutbot...");
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 1500));
    });
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
    const playerMove = getAllByTestId("0")[0];
    fireEvent.click(playerMove);
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("Draw! 🤝");
    expect(getByTestId("info").textContent).toBe("Click Replay ⬇️");
  });
});

describe("Single player mode - moves and buttons", () => {
  let component, getByTestId, getAllByTestId, container;

  beforeEach(() => {
    helper.initialGrid = [
      [0, 0, 0, 0, 0, 2, 0],
      [0, 0, 0, 0, 2, 1, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 2, 2, 1],
      [0, 0, 0, 2, 2, 2, 1],
      [0, 0, 0, 1, 2, 2, 1],
    ];
    helper.initialRowIndex = [5, 5, 5, 2, 0, 9, 2];
    component = render(<Game {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
    container = component.container;
  });

  afterEach(() => {
    cleanup();
  });

  it("AI blocks the player at mid-column", async () => {
    const playerMove = getAllByTestId("0")[0];
    fireEvent.click(playerMove);
    await waitFor(() => {
      expect(getAllByTestId("6")[2].className).toBe("circle p2");
    });
  });

  it("AI blocks the player at the top of the column", async () => {
    const playerMove1 = getAllByTestId("0")[0];
    fireEvent.click(playerMove1);
    await waitFor(() => {
      expect(getAllByTestId("6")[2].className).toBe("circle p2");
      const playerMove2 = getAllByTestId("6")[0];
      fireEvent.click(playerMove2);
    });
    await waitFor(() => {
      expect(getAllByTestId("6")[0].className).toBe("circle p2");
    });
  });

  it("player makes a move on the top of the column", async () => {
    const playerMove1 = getAllByTestId("4")[0];
    fireEvent.click(playerMove1);
    await waitFor(() => {
      expect(getAllByTestId("4")[0].className).toBe("circle p1");
    });
  });

  it("disregards a click on a column that is full", async () => {
    const square = getAllByTestId("5")[0];
    fireEvent.click(square);
    expect(getAllByTestId("5")[0].className).toBe("circle p2");
  });

  it("increments the player's play data on click of 'Replay' in the middle of a game", () => {
    const playerMove = getAllByTestId("4");
    fireEvent.click(playerMove[0]);
    fireEvent.click(getByTestId("replay"));
    expect(singlePlayerProps.incrementData).toHaveBeenCalledWith("played");
  });

  it("increments the player's play data on click of 'Quit' in the middle of a game", () => {
    const playerMove = getAllByTestId("4");
    fireEvent.click(playerMove[0]);
    fireEvent.click(getByTestId("quit"));
    expect(singlePlayerProps.incrementData).toHaveBeenCalledWith("played");
  });
});
