// const times = [];    // for checking runtime in development
const DEFAULT_ROWS = 6;
const DEFAULT_COLS = 7;
const FULL_COLUMN = 9; // Because the max standard number of rows is 8

export const getGrid = (rows = DEFAULT_ROWS, cols = DEFAULT_COLS) => {
  const grid = [];
  let i = 0;
  while (i < rows) {
    grid.push(Array(cols).fill(0));
    i++;
  }
  return grid;
};

export const initialGrid = getGrid();

export const getRowIndex = (grid) => {
  const numOfCol = grid[0].length;
  const maxRowIdx = grid.length - 1;
  const rowChart = [];
  let i = 0;
  while (i < numOfCol) {
    rowChart.push(maxRowIdx);
    i++;
  }
  return rowChart;
};

export const initialRowIndex = getRowIndex(getGrid());

export const checkResult = (grid, row, col) => {
  const value = grid[row][col];
  // INDEXES
  let rMins = row - 1;
  let rPlus = row + 1;
  let cMins = col - 1;
  let cPlus = col + 1;

  // COUNTS
  let up_down = 1;
  let left_right = 1;
  let upLeft_downRight = 1;
  let upRight_downLeft = 1;

  // FLAGS FOR COUNT INCREMENT
  let up = true;
  let down = true;
  let left = true;
  let right = true;
  let upLeft = true;
  let downRight = true;
  let upRight = true;
  let downLeft = true;

  while (up || down || left || right || upLeft || downRight || upRight || downLeft) {
    const counts = [up_down, left_right, upLeft_downRight, upRight_downLeft];
    if (counts.some((count) => count >= 4)) return value;

    if (up) {
      grid[rMins]?.[col] === value ? up_down++ : (up = false);
    }

    if (down) {
      grid[rPlus]?.[col] === value ? up_down++ : (down = false);
    }

    if (left) {
      grid[row][cMins] === value ? left_right++ : (left = false);
    }

    if (right) {
      grid[row][cPlus] === value ? left_right++ : (right = false);
    }

    if (upLeft) {
      grid[rMins]?.[cMins] === value ? upLeft_downRight++ : (upLeft = false);
    }

    if (downRight) {
      grid[rPlus]?.[cPlus] === value ? upLeft_downRight++ : (downRight = false);
    }

    if (upRight) {
      grid[rMins]?.[cPlus] === value ? upRight_downLeft++ : (upRight = false);
    }

    if (downLeft) {
      grid[rPlus]?.[cMins] === value ? upRight_downLeft++ : (downLeft = false);
    }
    rMins--;
    rPlus++;
    cMins--;
    cPlus++;
  }
  if (row === 0 && !grid[0].includes(0)) return "Draw";
};

export const findAiMove = (grid, rowChart) => {
  // const t0 = performance.now();
  const maxDepth = 7;
  const numOfCols = grid[0].length;
  let bestMoves = [];
  let bestDepth;
  let bestScore = Infinity;

  for (let c = 0; c < numOfCols; c++) {
    if (rowChart[c] === FULL_COLUMN) continue;
    let r = rowChart[c];
    grid[r][c] = 2; // BOT'S MOVE
    let depthAndScore = alphabeta(r, c, grid, numOfCols, rowChart, maxDepth, true); // GET HUMAN'S MOVE
    rowChart[c] = r;
    grid[r][c] = 0;
    let [moveDepth, moveScore] = depthAndScore;
    if (
      moveScore < bestScore || // LOOK FOR LOWEST SCORE (-10)
      (bestScore > 0 && moveScore === bestScore && moveDepth < bestDepth) || // POSITIVE SCORE - human is winning; look for min depth to delay human's win
      (moveScore === bestScore && moveDepth > bestDepth && moveScore < 0) // NEGATIVE SCORE - bot is winning; look for max depth to speed up bot's win
    ) {
      bestMoves = [];
      bestDepth = moveDepth;
      bestScore = moveScore;
      bestMoves.push([r, c]);
    } else if (moveScore === bestScore && moveDepth === bestDepth) {
      bestMoves.push([r, c]);
    }
  }
  let randomMove = Math.floor(Math.random() * bestMoves.length);

  // TO GET AVERAGE RUNTIME
  // const t1 = performance.now();
  // console.log(`It took ${t1 - t0} milliseconds.`);
  // const time = t1 - t0;
  // times.push(time);
  // const total = times.reduce((acc, time) => {
  //   return acc + time;
  // }, 0);
  // const average = total / times.length;
  // console.log({ average });
  return bestMoves[randomMove];
};

const alphabeta = (row, col, grid, numOfCols, rowChart, depth, isMaximizingPlayer) => {
  let result = checkResult(grid, row, col);
  switch (result) {
    case 1:
      return [depth, 10];
    case 2:
      return [depth, -10];
    case "Draw":
      return [depth, 0];
    case undefined:
      if (depth === 0) return [depth, 0];
      rowChart[col] = row === 0 ? 9 : row - 1;
      break;
  }

  if (isMaximizingPlayer) {
    let bestMove = [];
    let bestDepth = Infinity;
    let bestScore = -Infinity;
    for (let c = 0; c < numOfCols; c++) {
      if (rowChart[c] === FULL_COLUMN) continue;
      let r = rowChart[c];
      grid[r][c] = 1; // HUMAN'S MOVE
      let depthAndScore = alphabeta(r, c, grid, numOfCols, rowChart, depth - 1, false); // GET BOT'S MOVE
      rowChart[c] = r;
      grid[r][c] = 0;
      let [moveDepth, moveScore] = depthAndScore;
      if (
        moveScore > bestScore || // LOOK FOR HIGHEST SCORE (10)
        (moveScore === bestScore && moveDepth > bestDepth && moveScore >= 0) || // POSITIVE SCORE - human is winning; look for max depth to speed up human's win
        (moveScore === bestScore && moveDepth < bestDepth && moveScore < 0) // NEGATIVE SCORE - bot is winning; look for min depth to delay bot's win
      ) {
        bestDepth = moveDepth;
        bestScore = moveScore;
        bestMove = depthAndScore;
      }
    }
    return bestMove;
  } else {
    let bestMove = [];
    let bestDepth = Infinity;
    let bestScore = Infinity;
    for (let c = 0; c < numOfCols; c++) {
      if (rowChart[c] === FULL_COLUMN) continue;
      let r = rowChart[c];
      grid[r][c] = 2; // BOT'S MOVE
      let depthAndScore = alphabeta(r, c, grid, numOfCols, rowChart, depth - 1, true); // GET HUMAN's MOVE
      rowChart[c] = r;
      grid[r][c] = 0;
      let [moveDepth, moveScore] = depthAndScore;
      if (
        moveScore < bestScore || // LOOK FOR LOWEST SCORE (-10)
        (moveScore === bestScore && moveDepth < bestDepth && moveScore >= 0) || // POSITIVE SCORE - human is winning; look for min depth to delay human's win
        (moveScore === bestScore && moveDepth > bestDepth && moveScore < 0) // NEGATIVE SCORE - bot is winning; look for max depth to speed up bot's win
      ) {
        bestDepth = moveDepth;
        bestScore = moveScore;
        bestMove = depthAndScore;
      }
    }
    return bestMove;
  }
};
