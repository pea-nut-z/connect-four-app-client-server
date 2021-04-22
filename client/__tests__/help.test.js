import { getGrid, findAValidMove, checkResult, findAiMove } from "../src/components/game/help";

describe("getGrid function", () => {
  it("returns a specified size of blank grid", () => {
    const rows = 4;
    const cols = 4;
    const grid = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];

    const newGrid = getGrid(rows, cols);
    expect(newGrid).toEqual(grid);
  });
});

describe("checkResult function checks/returns winning result in every direction", () => {
  it("returns a winner - horizontally", () => {
    const grid1 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p2", "p2", "p2", "p2", null, null, null],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    expect(checkResult(grid1)).toEqual("p2");
  });

  it("returns a winner - vertically", () => {
    const grid2 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p2", null, null, null, null, null, null],
      ["p2", null, null, null, null, null, null],
      ["p2", "p2", "p2", "p1", null, null, null],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    expect(checkResult(grid2)).toEqual("p2");
  });

  it("returns a winner - diagonally", () => {
    const grid3 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p1", null, null, "p2", null, null, null],
      ["p2", null, "p2", null, null, null, null],
      ["p1", "p2", "p2", "p1", null, null, null],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    expect(checkResult(grid3)).toEqual("p2");
  });

  it("returns Draw", () => {
    const grid4 = [
      ["p2", "p2", "p1", "p1", "p2", "p1", "p1"],
      ["p1", "p2", "p1", "p1", "p2", "p1", "p2"],
      ["p1", "p1", "p1", "p2", "p2", "p1", "p1"],
      ["p2", "p2", "p2", "p1", "p1", "p2", "p1"],
      ["p2", "p1", "p1", "p2", "p2", "p1", "p2"],
      ["p2", "p2", "p1", "p1", "p2", "p2", "p2"],
    ];
    expect(checkResult(grid4)).toEqual("Draw");
  });
});

describe("findAValidMove function", () => {
  it("returns the correct row index for a move in a selected column", () => {
    const grid1 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p2", null, null, null, null, null, null],
      ["p2", null, null, null, null, null, null],
    ];
    const row = findAValidMove(grid1, 0);
    expect(row).toEqual(3);
  });
});

describe("findAiMove function", () => {
  it("makes a move to avoid human from winning", () => {
    const grid1 = [
      [null, "p1", "p2", null, "p2", "p1", "p2"],
      ["p2", "p1", "p2", null, "p2", "p1", "p2"],
      ["p2", "p1", "p2", null, "p2", "p1", "p2"],
      ["p2", "p1", "p2", null, "p2", "p1", "p2"],
      ["p2", "p2", "p2", "p1", "p2", "p1", "p2"],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    const [row, col] = findAiMove(grid1, 7);
    expect(row).toEqual(0);
    expect(col).toEqual(0);
  });

  it("makes a move to win instead of blocking", () => {
    const grid2 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p1", null, null, null, null, null, null],
      ["p1", null, null, null, null, null, null],
      ["p1", "p2", "p2", "p2", null, null, null],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    const [row, col] = findAiMove(grid2, 7);
    grid2[row][col] = "p2";
    expect(checkResult(grid2)).toEqual("p2");
  });

  it("makes a move to block", () => {
    const grid3 = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      ["p2", "p2", "p2", null, null, null, null],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ];
    const [row, col] = findAiMove(grid3, 7);
    grid3[row][col] = "p2";
    expect(row).toEqual(4);
    expect(col).toEqual(3);
  });
});
