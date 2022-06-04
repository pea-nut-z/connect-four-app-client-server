import { getGrid, findAValidMove, checkResult, findAiMove } from "../../src/components/game/help";

describe("getGrid function", () => {
  it("returns a specified size of blank grid", () => {
    const rows = 4;
    const cols = 4;
    const grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const newGrid = getGrid(rows, cols);
    expect(newGrid).toEqual(grid);
  });

  it("returns a default size of blank grid", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const newGrid = getGrid();
    expect(newGrid).toEqual(grid);
  });
});

describe("checkResult function checks/returns winning result in every direction", () => {
  it("returns a winner - horizontally", () => {
    const grid1 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 2, 1, 1, 0],
      [0, 0, 1, 1, 1, 2, 0],
      [2, 2, 2, 2, 1, 2, 0],
    ];
    expect(checkResult(grid1, 5, 1)).toEqual(2);
  });

  it("returns a winner - vertically", () => {
    const grid2 = [
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 1, 2],
    ];
    expect(checkResult(grid2, 1, 6)).toEqual(1);
  });

  it("returns a winner - diagonally '\\'", () => {
    const grid3 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [2, 0, 2, 1, 0, 0, 0],
      [1, 2, 2, 1, 1, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    expect(checkResult(grid3, 5, 5)).toEqual(1);
  });

  it("returns a winner - diagonally '/'", () => {
    const grid3 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 2, 0, 0, 0],
      [2, 0, 2, 0, 0, 0, 0],
      [1, 2, 2, 1, 0, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    expect(checkResult(grid3, 4, 1)).toEqual(2);
  });

  it("returns Draw", () => {
    const grid4 = [
      [2, 2, 1, 1, 2, 1, 1],
      [1, 2, 1, 1, 2, 1, 2],
      [1, 1, 1, 2, 2, 1, 1],
      [2, 2, 2, 1, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 2, 2],
    ];
    expect(checkResult(grid4, 0, 0)).toEqual("Draw");
  });
});

describe("findAValidMove function", () => {
  it("returns the correct row index for a move in a selected column", () => {
    const grid5 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
    ];
    const row = findAValidMove(grid5, 0);
    expect(row).toEqual(3);
  });
});

describe("findAiMove function", () => {
  it("makes a move to avoid human from winning", () => {
    const grid6 = [
      [0, 1, 2, 0, 2, 1, 2],
      [2, 1, 2, 0, 2, 1, 2],
      [2, 1, 2, 0, 2, 1, 2],
      [2, 1, 2, 0, 2, 1, 2],
      [2, 2, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    const [row, col] = findAiMove(grid6, 7);
    expect(row).toEqual(0);
    expect(col).toEqual(0);
  });

  it("makes a move to win instead of blocking", () => {
    const grid7 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 2, 2, 2, 0, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    const [row, col] = findAiMove(grid7, 7);
    grid7[row][col] = 2;
    expect(checkResult(grid7)).toEqual(2);
  });

  it("makes a move to block", () => {
    const grid8 = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [2, 2, 2, 0, 0, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    const [row, col] = findAiMove(grid8, 7);
    grid8[row][col] = 2;
    expect(row).toEqual(4);
    expect(col).toEqual(3);
  });
});
