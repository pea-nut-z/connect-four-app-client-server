import React from "react";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import Game from "../../src/components/game/Game";
import SquareGrid from "../../src/components/game/SquareGrid";

const testGrid = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ["p1", null, null, null, null, null, null],
  ["p1", null, null, null, null, null, null],
  ["p1", "p2", "p2", "p2", null, null, null],
  ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
];
const incrementData = jest.fn();
const toggleGameMode = jest.fn();

describe("Game Screen", () => {
  it("renders Game component without crashing", () => {
    shallow(<Game />);
  });

  it("renders SquareGrid component without crashing", () => {
    shallow(<SquareGrid />);
  });
});

describe("Single player mode", () => {
  let getByTestId, getAllByTestId;
  let initialGrid;

  beforeAll(() => {
    const component = render(
      <Game
        userName={"Test"}
        game={"single"}
        initialGrid={testGrid}
        incrementData={incrementData}
        toggleGameMode={toggleGameMode}
      />
    );

    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("renders initial layout", () => {
    expect(getByTestId("p1Name")).toHaveTextContent("Test");
    expect(getByTestId("p2Name")).toHaveTextContent("Peanutbot");
    expect(getByTestId("numOfRounds")).toHaveTextContent(1);
    expect(getByTestId("score1")).toHaveTextContent(0);
    expect(getByTestId("score2")).toHaveTextContent(0);
    expect(getByTestId("resultMsg")).toHaveTextContent("");
    expect(getByTestId("info")).toHaveTextContent("");
  });

  it("makes a winning move -> displays messages -> increments score -> increments game and win counts data", async () => {
    initialGrid = getAllByTestId("square");
    const square = initialGrid[0];
    await fireEvent.click(square);
    expect(getByTestId("resultMsg")).toHaveTextContent("🥂 YOU WIN! 🎉");
    expect(getByTestId("score1")).toHaveTextContent(1);
    expect(incrementData).toHaveBeenCalledWith("won", "played");
    expect(getByTestId("info")).toHaveTextContent("Click Replay ⬇️");
  });

  it("clicks replay button after winning -> increments number of rounds -> resets result message and grid", async () => {
    const button = getByTestId("replay");
    const numOfRounds = getByTestId("numOfRounds");
    await fireEvent.click(button);
    expect(numOfRounds).toHaveTextContent(2);
    expect(getByTestId("resultMsg")).toHaveTextContent("");
    expect(getByTestId("info")).toHaveTextContent("");
    expect(getAllByTestId("square")).toEqual(initialGrid);
  });

  it("makes a losing move -> displays messages -> increments opponent's score", async () => {
    const grid = getAllByTestId("square");
    const square = grid[1];
    await fireEvent.click(square);
    await waitFor(() => {
      expect(getByTestId("resultMsg")).toHaveTextContent("😱 YOU LOST! 💩");
      expect(getByTestId("score2")).toHaveTextContent(1);
      expect(getByTestId("info")).toHaveTextContent("Click Replay ⬇️");
    });
  });

  it("clicks replay button after losing -> increments game count data", async () => {
    const button = getByTestId("replay");
    await fireEvent.click(button);
    await waitFor(() => {
      expect(incrementData).toHaveBeenCalledWith("played");
    });
  });

  it("clicks replay button during a game -> increments game count data", async () => {
    const button = getByTestId("replay");
    await fireEvent.click(button);
    await waitFor(() => {
      expect(incrementData).toHaveBeenCalledWith("played");
    });
  });

  it("clicks quit button after game is over -> calls toggleGameMode -> does not call incrementData", async () => {
    const button = getByTestId("quit");
    await fireEvent.click(button);
    expect(toggleGameMode).toHaveBeenCalledTimes(1);
    expect(incrementData).toHaveBeenCalledTimes(0);
  });
});

describe("Quit Button", () => {
  it("clicks quit button during a game -> calls toggleGameMode -> increments play count data", async () => {
    const component = render(
      <Game
        game={"single"}
        initialGrid={testGrid}
        incrementData={incrementData}
        toggleGameMode={toggleGameMode}
      />
    );

    const grid = component.getAllByTestId("square");
    const square = grid[4];
    await fireEvent.click(square);
    const quitBtn = component.getByTestId("quit");
    await fireEvent.click(quitBtn);
    expect(toggleGameMode).toHaveBeenCalledTimes(1);
    expect(incrementData).toHaveBeenCalledWith("played");
    cleanup();
  });
});
