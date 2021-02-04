import { checkResult, findAiMove } from "../help";
// import {rows, columns} from "../SinglePlayer"

describe("testing Single Player mode AI function", () => {
  const grid = [
    [
      "Player-2",
      "Player-2",
      "Player-1",
      "Player-1",
      null,
      "Player-1",
      "Player-1",
    ],
    [
      "Player-1",
      "Player-2",
      "Player-1",
      "Player-1",
      "Player-2",
      "Player-1",
      "Player-2",
    ],
    [
      "Player-1",
      "Player-1",
      "Player-1",
      "Player-2",
      "Player-2",
      "Player-1",
      "Player-1",
    ],
    [
      "Player-2",
      "Player-2",
      "Player-2",
      "Player-1",
      "Player-1",
      "Player-2",
      "Player-1",
    ],
    [
      "Player-2",
      "Player-1",
      "Player-1",
      "Player-2",
      "Player-2",
      "Player-1",
      "Player-2",
    ],
    [
      "Player-2",
      "Player-2",
      "Player-1",
      "Player-1",
      "Player-2",
      "Player-2",
      "Player-2",
    ],
  ];
  it("returns draw as a result after AI makes a move", () => {
    const [row, col] = findAiMove(grid, 7);
    grid[row][col] = "Player-2";
    expect(checkResult(grid)).toEqual("Draw!");
  });
});
