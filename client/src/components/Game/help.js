// NOTE
// r = row index
// c = column index

export function createGrid(r, c) {
  let grid = [];
  let i = 0;
  while (i < r) {
    grid.push(Array(c).fill(null));
    i++;
  }
  return grid;
}

export function checkResult(grid) {
  const tie = grid.every((row) => !row.includes(null));
  if (tie) return "Draw!";

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
        return value + " wins";
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
          return value + " wins";
        }
      }
    }
  }
  return null;
}

export function findAValidMove(grid, c) {
  for (let r = grid.length - 1; r >= 0; r--) {
    if (grid[r][c] === null) {
      let move = [r, c];
      return move;
    }
  }
}

export function findAiMove(grid, columns, huPlayer, aiPlayer) {
  let MAX_DEPTH = 3;
  let bestMoveScore = 100;
  let move = [];
  let columnIndexes = columns - 1;

  for (let c = columnIndexes; c >= 0; c--) {
    let newMove = findAValidMove(grid, c);
    if (newMove) {
      const [row, col] = newMove;
      grid[row][col] = aiPlayer;
      const moveScore = maxScore(
        grid,
        columnIndexes,
        MAX_DEPTH,
        huPlayer,
        aiPlayer
      );
      grid[row][col] = null;
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
        move = [row, col];
      }
    }
  }
  return move;
}

function minScore(grid, columnIndexes, depth, huPlayer, aiPlayer) {
  let result = checkResult(grid);
  if (result) {
    if (result === "Player-1 wins") return 10;
    if (result === "Player-2 wins") return -10;
    if (result === "Draw") return 0;
  }
  if (depth === 0) return 0;

  let bestMoveScore = 100;
  for (let c = columnIndexes; c >= 0; c--) {
    const newMove = findAValidMove(grid, c);
    if (newMove) {
      const [row, col] = newMove;
      grid[row][col] = huPlayer;
      const moveScore = maxScore(
        grid,
        columnIndexes,
        depth - 1,
        huPlayer,
        aiPlayer
      );
      grid[row][col] = null;
      if (moveScore < bestMoveScore) {
        bestMoveScore = moveScore;
      }
    }
  }

  return bestMoveScore;
}

function maxScore(grid, columnIndexes, depth, huPlayer, aiPlayer) {
  let result = checkResult(grid);
  if (result) {
    if (result === "Player-1 wins") return 10;
    if (result === "Player-2 wins") return -10;
    if (result === "Draw") return 0;
  }
  if (depth === 0) return 0;

  let bestMoveScore = -100;
  for (let c = columnIndexes; c >= 0; c--) {
    let newMove = findAValidMove(grid, c);
    if (newMove) {
      const [row, col] = newMove;
      grid[row][col] = huPlayer;
      const moveScore = minScore(
        grid,
        columnIndexes,
        depth - 1,
        huPlayer,
        aiPlayer
      );
      grid[row][col] = null;
      if (moveScore > bestMoveScore) {
        bestMoveScore = moveScore;
      }
    }
  }

  return bestMoveScore;
}
