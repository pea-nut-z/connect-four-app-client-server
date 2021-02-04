import { findAValidMove, checkResult, findAiMove } from "../help";

describe("findAValidMove finds the first valid move in a column", () => {
  it("returns the correct row index for a move", () => {
    const grid1 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-2", null, null, null, null, null, null],
      ["Player-2", null, null, null, null, null, null],
    ];
    const row = findAValidMove(grid1, 0);
    expect(row).toEqual(3);
  });
});

describe("checkResult function checks/returns winning result in every direction", () => {
  it("returns a winner - horizontally", () => {
    const grid1 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-2", "Player-2", "Player-2", "Player-2", null, null, null],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    expect(checkResult(grid1)).toEqual("Player-2");
  });

  it("returns a winner - vertically", () => {
    const grid2 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-2", null, null, null, null, null, null],
      ["Player-2", null, null, null, null, null, null],
      ["Player-2", "Player-2", "Player-2", "Player-1", null, null, null],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    expect(checkResult(grid2)).toEqual("Player-2");
  });

  it("returns a winner - diagonally", () => {
    const grid3 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-1", null, null, "Player-2", null, null, null],
      ["Player-2", null, "Player-2", null, null, null, null],
      ["Player-1", "Player-2", "Player-2", "Player-1", null, null, null],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    expect(checkResult(grid3)).toEqual("Player-2");
  });

  it("returns Draw", () => {
    const grid4 = [
      ["Player-2", "Player-2", "Player-1", "Player-1", "Player-2", "Player-1", "Player-1"],
      ["Player-1", "Player-2", "Player-1", "Player-1", "Player-2", "Player-1", "Player-2"],
      ["Player-1", "Player-1", "Player-1", "Player-2", "Player-2", "Player-1", "Player-1"],
      ["Player-2", "Player-2", "Player-2", "Player-1", "Player-1", "Player-2", "Player-1"],
      ["Player-2", "Player-1", "Player-1", "Player-2", "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-2", "Player-1", "Player-1", "Player-2", "Player-2", "Player-2"],
    ];
    expect(checkResult(grid4)).toEqual("Draw");
  });
});

describe("AI function makes the right move", () => {
  it("makes a move to avoid human from winning", () => {
    const grid1 = [
      [null, "Player-1", "Player-2", null, "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-1", "Player-2", null, "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-1", "Player-2", null, "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-1", "Player-2", null, "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-2", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    const [row, col] = findAiMove(grid1, 7);
    expect(row).toEqual(0);
    expect(col).toEqual(0);
  });

  it("makes a move to win instead of blocking", () => {
    const grid2 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-1", null, null, null, null, null, null],
      ["Player-1", null, null, null, null, null, null],
      ["Player-1", "Player-2", "Player-2", "Player-2", null, null, null],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    const [row, col] = findAiMove(grid2, 7);
    grid2[row][col] = "Player-2";
    expect(checkResult(grid2)).toEqual("Player-2");
  });

  it("makes a move to block", () => {
    const grid3 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["Player-2", "Player-2", "Player-2", null, null, null, null],
      ["Player-2", "Player-1", "Player-2", "Player-1", "Player-2", "Player-1", "Player-2"],
    ];
    const [row, col] = findAiMove(grid3, 7);
    grid3[row][col] = "Player-2";
    expect(row).toEqual(4);
    expect(col).toEqual(3);
  });
});
