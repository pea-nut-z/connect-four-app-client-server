// NOTE
// r = row; c = column
const defaultRows = 6;
const defaultCols = 7;

export const getGrid = function (rows = defaultRows, cols = defaultCols) {
  let grid = [];
  let i = 0;
  while (i < rows) {
    grid.push(Array(cols).fill(null));
    i++;
  }
  return grid;
};

export function checkResult(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      let value = grid[r][c];

      if (
        //left and right
        value &&
        value === grid[r][c + 1] &&
        value === grid[r][c + 2] &&
        value === grid[r][c + 3]
      ) {
        return value;
      }

      if (r < grid.length - 3) {
        if (
          //up and down
          (value &&
            value === grid[r + 1][c] &&
            value === grid[r + 2][c] &&
            value === grid[r + 3][c]) ||
          //diagonal " \ "
          (value &&
            value === grid[r + 1][c + 1] &&
            value === grid[r + 2][c + 2] &&
            value === grid[r + 3][c + 3]) ||
          //diagonal " / "
          (value &&
            value === grid[r + 1][c - 1] &&
            value === grid[r + 2][c - 2] &&
            value === grid[r + 3][c - 3])
        ) {
          return value;
        }
      }
    }
  }
  const tie = grid.every((row) => !row.includes(null));
  if (tie) return "Draw";
}

export function findAValidMove(grid, c) {
  for (let r = grid.length - 1; r >= 0; r--) {
    if (grid[r][c] === null) {
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
  let bestDepth;
  let bestScore = Infinity;

  for (let c = 0; c < numOfCols; c++) {
    let r = findAValidMove(grid, c);
    if (r !== undefined) {
      grid[r][c] = "p2"; // bot's move
      let depthAndScore = alphabeta(grid, numOfCols, maxDepth, true); // get human's move
      grid[r][c] = null;
      let [moveDepth, moveScore] = depthAndScore;

      if (
        moveScore < bestScore || // look for lowest score (-10)
        (moveScore === bestScore && moveDepth < bestDepth && moveScore >= 0) || // positive score - human is winning; look for min depth to delay human's win
        (moveScore === bestScore && moveDepth > bestDepth && moveScore < 0) // negative score - bot is winning; look for max depth to speed up bot's win
      ) {
        bestMoves = [];
        bestDepth = moveDepth;
        bestScore = moveScore;
        bestMoves.push([r, c]);
      } else if (moveScore === bestScore && moveDepth === bestDepth) {
        bestMoves.push([r, c]);
      }
    }
  }
  let randomMove = Math.floor(Math.random() * bestMoves.length);
  const t1 = performance.now();
  // Total time : It took 2217.699999988079 milliseconds.
  // It took 2667.899999976158 milliseconds.
  console.log(`It took ${t1 - t0} milliseconds.`);
  return bestMoves[randomMove];
}

function alphabeta(grid, numOfCols, depth, isMaximizingPlayer) {
  let result = checkResult(grid);
  if (result === "p1") return [depth, 10]; // human
  if (result === "p2") return [depth, -10]; // bot
  if (result === "Draw" || depth === 0) return [depth, 0];

  if (isMaximizingPlayer) {
    let bestMove;
    let bestDepth = Infinity;
    let bestScore = -Infinity;
    for (let c = 0; c < numOfCols; c++) {
      let r = findAValidMove(grid, c);
      if (r !== undefined) {
        grid[r][c] = "p1"; // human's move
        let depthAndScore = alphabeta(grid, numOfCols, depth - 1, false); // get bot's move
        grid[r][c] = null;
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
        grid[r][c] = "p2"; // bot's move
        let depthAndScore = alphabeta(grid, numOfCols, depth - 1, true); // get human's move
        grid[r][c] = null;
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
