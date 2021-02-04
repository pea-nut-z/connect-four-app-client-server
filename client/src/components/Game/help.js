// NOTE
// r = row; c = column

import firebase from "firebase/app";
import "firebase/database";

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
  const tie = grid.every((row) => !row.includes(null));
  if (tie) return "Draw!";
}

export function findAValidMove(grid, c) {
  for (let r = grid.length - 1; r >= 0; r--) {
    if (grid[r][c] === null) {
      let move = r;
      return move;
    }
  }
}

export function findAiMove(grid, numOfCols) {
  let maxDepth = 7;
  let bestMoves = [];
  let bestDepth;
  let bestScore = -Infinity;

  // console.log("*********BEGIN*********");
  for (let c = 0; c < numOfCols; c++) {
    let r = findAValidMove(grid, c);
    if (r !== undefined) {
      grid[r][c] = "Player-2";
      let depthAndScore = alphabeta(grid, numOfCols, maxDepth, false);
      grid[r][c] = null;
      let [moveDepth, moveScore] = depthAndScore;
      if (
        moveScore > bestScore ||
        (moveScore === bestScore && moveDepth > bestDepth && moveScore >= 0) ||
        (moveScore === bestScore && moveDepth < bestDepth && moveScore < 0)
      ) {
        // console.log(
        //   "Created new best moves",
        //   moveScore,
        //   bestScore,
        //   moveDepth,
        //   bestDepth
        // );
        bestMoves = [];
        bestDepth = moveDepth;
        bestScore = moveScore;
        bestMoves.push([r, c]);
      } else if (moveScore === bestScore && moveDepth === bestDepth) {
        // console.log(
        //   "pushed moves with same score",
        //   moveScore,
        //   bestScore,
        //   moveDepth,
        //   bestDepth
        // );
        bestMoves.push([r, c]);
      }
    }
  }
  // console.log({ bestMoves });
  let randomMove = Math.floor(Math.random() * bestMoves.length);
  return bestMoves[randomMove];
}

function alphabeta(grid, numOfCols, depth, isMaximizingPlayer) {
  let result = checkResult(grid);
  if (result === "Player-1 wins") return [depth, -10];
  if (result === "Player-2 wins") return [depth, 10];
  if (result === "Draw!" || depth === 0) return [depth, 0];

  if (isMaximizingPlayer) {
    let bestMove = [];
    let bestDepth = 0;
    let bestScore = -Infinity;
    for (let c = 0; c < numOfCols; c++) {
      let r = findAValidMove(grid, c);
      if (r !== undefined) {
        grid[r][c] = "Player-2";
        let depthAndScore = alphabeta(grid, numOfCols, depth - 1, false);
        grid[r][c] = null;
        let [moveDepth, moveScore] = depthAndScore;
        if (
          moveScore > bestScore ||
          (moveScore === bestScore &&
            moveDepth > bestDepth &&
            moveScore >= 0) ||
          (moveScore === bestScore && moveDepth < bestDepth && moveScore < 0)
        ) {
          bestDepth = moveDepth;
          bestScore = moveScore;
          bestMove = depthAndScore;
        }
      }
    }
    return bestMove;
  } else {
    let bestMove = [];
    let bestDepth = 0;
    let bestScore = Infinity;
    for (let c = 0; c < numOfCols; c++) {
      let r = findAValidMove(grid, c);
      if (r !== undefined) {
        grid[r][c] = "Player-1";
        let depthAndScore = alphabeta(grid, numOfCols, depth - 1, true);
        grid[r][c] = null;
        // if (!depthAndScore) continue;
        let [moveDepth, moveScore] = depthAndScore;
        if (
          moveScore < bestScore ||
          (moveScore === bestScore && moveDepth > bestDepth)
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

export function storeScore(id, totalGame, score) {
  firebase.database().ref(id).set({
    played: totalGame,
    won: score,
  });
}

export function fetchScore(id) {
  let played, won;
  firebase
    .database()
    .ref(id)
    .on("value", function (snapshot) {
      played = snapshot.val().played;
      won = snapshot.val().won;
    });
  return [played, won];
}
