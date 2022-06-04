// NOTE
// r = row; c = column
const defaultRows = 6;
const defaultCols = 7;

export const getGrid = function (rows = defaultRows, cols = defaultCols) {
  let grid = [];
  let i = 0;
  while (i < rows) {
    grid.push(Array(cols).fill(0));
    i++;
  }
  return grid;
};

export function checkResult(grid, row, col) {
  const value = grid[row][col];
  // Indexes
  let rMins = row - 1;
  let rPlus = row + 1;
  let cMins = col - 1;
  let cPlus = col + 1;

  // Counts
  let up_down = 1;
  let left_right = 1;
  let upLeft_downRight = 1;
  let upRight_downLeft = 1;

  // Flag to increment its count
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

  const counts = [up_down, left_right, upLeft_downRight, upRight_downLeft];
  if (counts.some((count) => count >= 4)) return value;
  if (row === 0 && !grid[0].includes(0)) return "Draw";
}

export function findAValidMove(grid, c) {
  for (let r = grid.length - 1; r >= 0; r--) {
    if (grid[r][c] === 0) {
      let move = r;
      return move;
    }
  }
}

export function findAiMove(grid) {
  const t0 = performance.now();
  let maxDepth = 7;
  let numOfCols = grid[0].length;
  let bestMoves;
  let bestScores = [];
  let bestDepth;
  let bestScore = Infinity;

  for (let c = 0; c < numOfCols; c++) {
    let r = findAValidMove(grid, c);
    if (r !== undefined) {
      grid[r][c] = 2; // bot's move
      let depthAndScore = alphabeta(r, c, grid, numOfCols, maxDepth, true); // get human's move
      grid[r][c] = 0;
      let [moveDepth, moveScore] = depthAndScore;

      if (
        moveScore < bestScore || // look for lowest score (-10)
        (moveScore === bestScore && moveDepth < bestDepth && moveScore >= 0) || // positive score - human is winning; look for min depth to delay human's win
        (moveScore === bestScore && moveDepth > bestDepth && moveScore < 0) // negative score - bot is winning; look for max depth to speed up bot's win
      ) {
        bestMoves = [];
        bestScores = [];

        bestDepth = moveDepth;
        bestScore = moveScore;
        bestMoves.push([r, c]);
        bestScores.push(moveScore);
      } else if (moveScore === bestScore && moveDepth === bestDepth) {
        bestMoves.push([r, c]);
        bestScores.push(moveScore);
      }
    }
  }
  let randomMove = Math.floor(Math.random() * bestMoves.length);
  const t1 = performance.now();
  // Total time : It took 2217 to 2667 milliseconds.
  console.log(`It took ${t1 - t0} milliseconds.`);
  // console.log({ bestMoves });
  // console.log({ bestScores });
  const move = bestMoves[randomMove];
  // console.log({ move });

  return move;
}

function alphabeta(row, col, grid, numOfCols, depth, isMaximizingPlayer) {
  let result = checkResult(grid, row, col);
  if (result === 1) {
    // console.log("HU wins", row, col);

    return [depth, 10];
  } // human
  if (result === 2) {
    // console.log("BOT wins", row, col);
    return [depth, -10];
  } // bot
  if (result === "Draw" || (depth === 0 && result === undefined)) {
    // console.log("draw", row, col);

    return [depth, 0];
  }

  if (isMaximizingPlayer) {
    let bestMove;
    let bestDepth = Infinity;
    let bestScore = -Infinity;
    for (let c = 0; c < numOfCols; c++) {
      let r = findAValidMove(grid, c);
      if (r !== undefined) {
        grid[r][c] = 1; // human's move
        let depthAndScore = alphabeta(r, c, grid, numOfCols, depth - 1, false); // get bot's move
        grid[r][c] = 0;
        let [moveDepth, moveScore] = depthAndScore;
        if (
          moveScore > bestScore || // look for highest score (10)
          (moveScore === bestScore && moveDepth > bestDepth && moveScore >= 0) || // positive score - human is winning; look for max depth to speed up human's win
          (moveScore === bestScore && moveDepth < bestDepth && moveScore < 0) // negative score - bot is winning; look for min depth to delay bot's win
        ) {
          bestDepth = moveDepth;
          bestScore = moveScore;
          bestMove = depthAndScore;
        }
      }
    }
    return bestMove;
  } else {
    let bestMove;
    let bestDepth = Infinity;
    let bestScore = Infinity;
    for (let c = 0; c < numOfCols; c++) {
      let r = findAValidMove(grid, c);
      if (r !== undefined) {
        grid[r][c] = 2; // bot's move
        let depthAndScore = alphabeta(r, c, grid, numOfCols, depth - 1, true); // get human's move
        grid[r][c] = 0;
        let [moveDepth, moveScore] = depthAndScore;
        if (
          moveScore < bestScore || // look for lowest score (-10)
          (moveScore === bestScore && moveDepth < bestDepth && moveScore >= 0) || // positive score - human is winning; look for min depth to delay human's win
          (moveScore === bestScore && moveDepth > bestDepth && moveScore < 0) // negative score - bot is winning; look for max depth to speed up bot's win
        ) {
          bestDepth = moveDepth;
          bestScore = moveScore;
          bestMove = depthAndScore;
        }
      }
    }
    return bestMove;
  }
}
