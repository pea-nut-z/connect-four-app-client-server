import { getGrid, getRowChart, checkResult, findAiMove } from "../../help";

describe("getGrid", () => {
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

describe("getRowChart", () => {
  it("returns an array that has the number of columns in length and holds the max row index as each value", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    const rowChart = getRowChart(grid);
    expect(rowChart).toEqual([5, 5, 5, 5, 5, 5, 5]);
  });
});

describe("checkResult function checks/returns winning result in every direction", () => {
  it("returns a winner - horizontally", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 0, 0],
      [0, 0, 0, 2, 1, 1, 0],
      [0, 0, 1, 1, 1, 2, 0],
      [2, 2, 2, 2, 1, 2, 0],
    ];
    expect(checkResult(grid, 5, 1)).toEqual(2);
  });

  it("returns a winner - vertically", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 2, 1],
      [0, 0, 0, 0, 0, 2, 2],
      [0, 0, 0, 0, 0, 1, 2],
    ];
    expect(checkResult(grid, 1, 6)).toEqual(1);
  });

  it("returns a winner - diagonally '\\'", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [2, 0, 2, 1, 0, 0, 0],
      [1, 2, 2, 1, 1, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    expect(checkResult(grid, 5, 5)).toEqual(1);
  });

  it("returns a winner - diagonally '/'", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 2, 0, 0, 0],
      [2, 0, 2, 0, 0, 0, 0],
      [1, 2, 2, 1, 0, 0, 0],
      [2, 1, 2, 1, 2, 1, 2],
    ];
    expect(checkResult(grid, 4, 1)).toEqual(2);
  });

  it("returns Draw", () => {
    const grid = [
      [2, 2, 1, 1, 2, 1, 1],
      [1, 2, 1, 1, 2, 1, 2],
      [1, 1, 1, 2, 2, 1, 1],
      [2, 2, 2, 1, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 2, 2],
    ];
    expect(checkResult(grid, 0, 0)).toEqual("Draw");
  });
});

describe("findAiMove function", () => {
  it("makes a move to avoid human from winning", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 2, 0, 0, 0, 0, 0],
      [1, 2, 2, 0, 0, 0, 0],
    ];
    const [row, col] = findAiMove(grid, [2, 4, 4, 4, 5, 5, 5]);
    expect(row).toEqual(2);
    expect(col).toEqual(0);
  });

  it("makes a move to win instead of blocking", () => {
    const grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 2, 2, 2, 0, 0, 0],
    ];
    const [row, col] = findAiMove(grid, [2, 4, 4, 4, 5, 5, 5]);
    expect(row).toEqual(5);
    expect(col).toEqual(4);
  });
});