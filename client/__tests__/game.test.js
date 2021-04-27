import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import Game from "../src/components/game/Game";
import SquareGrid from "../src/components/game/SquareGrid";

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
  it("renders <Game /> without crashing", () => {
    shallow(<Game />);
  });

  it("renders <SquareGrid /> without crashing", () => {
    shallow(<SquareGrid />);
  });
});

describe("<Game /> in single player mode", () => {
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

  it("renders initial layout properly", () => {
    expect(getByTestId("p1Name")).toHaveTextContent("Test");
    expect(getByTestId("p2Name")).toHaveTextContent("Peanutbot");
    expect(getByTestId("numOfRounds")).toHaveTextContent(1);
    expect(getByTestId("score1")).toHaveTextContent(0);
    expect(getByTestId("score2")).toHaveTextContent(0);
    expect(getByTestId("resultMsg")).toHaveTextContent("");
    expect(getByTestId("info")).toHaveTextContent("");
  });

  it("makes a winning move -> displays msg -> increments score & data", () => {
    initialGrid = getAllByTestId("square");
    const square = initialGrid[7];
    fireEvent.click(square);
    expect(getByTestId("resultMsg")).toHaveTextContent("🥂 YOU WIN! 🎉");
    expect(getByTestId("score1")).toHaveTextContent(1);
    expect(incrementData).toHaveBeenCalledWith("won", "played");
    expect(getByTestId("info")).toHaveTextContent("Click Replay ⬇️");
  });

  it("clicks replay button on game over when it has won -> increments number of rounds & data -> resets some states", () => {
    const button = getByTestId("replay");
    const numOfRounds = getByTestId("numOfRounds");
    fireEvent.click(button);
    expect(numOfRounds).toHaveTextContent(2);
    expect(getByTestId("resultMsg")).toHaveTextContent("");
    expect(getByTestId("info")).toHaveTextContent("");
    expect(getAllByTestId("square")).toEqual(initialGrid);
  });

  it("makes a losing move -> displays msg -> increments opponent's score", () => {
    const grid = getAllByTestId("square");
    const square = grid[22];
    fireEvent.click(square);
    expect(getByTestId("resultMsg")).toHaveTextContent("😱 YOU LOST! 💩");
    expect(getByTestId("score2")).toHaveTextContent(1);
    expect(getByTestId("info")).toHaveTextContent("Click Replay ⬇️");
  });

  it("clicks replay button on game over when it has lost -> increments data", () => {
    const button = getByTestId("replay");
    fireEvent.click(button);
    expect(incrementData).toHaveBeenCalledWith("played");
  });

  it("clicks replay button during a game -> increments data", () => {
    const button = getByTestId("replay");
    fireEvent.click(button);
    expect(incrementData).toHaveBeenCalledWith("played");
  });

  it("clicks Quit button on game over -> calls toggleGameMode -> does not call incrementData", () => {
    const button = getByTestId("quit");
    fireEvent.click(button);
    expect(toggleGameMode).toHaveBeenCalledTimes(1);
    expect(incrementData).toHaveBeenCalledTimes(0);
  });
});

describe("Quit Button", () => {
  it("clicks Quit button during a game -> calls toggleGameMode -> increments data", () => {
    const component = render(
      <Game
        game={"single"}
        initialGrid={testGrid}
        incrementData={incrementData}
        toggleGameMode={toggleGameMode}
      />
    );

    const grid = component.getAllByTestId("square");
    const square = grid[32];
    fireEvent.click(square);
    const quitBtn = component.getByTestId("quit");
    fireEvent.click(quitBtn);
    expect(toggleGameMode).toHaveBeenCalledTimes(1);
    expect(incrementData).toHaveBeenCalledWith("played");
    cleanup();
  });
});
