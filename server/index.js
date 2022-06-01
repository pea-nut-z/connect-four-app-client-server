const express = require("express");
const app = express();
const http = require("http").createServer(app);
const server = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// handle a socket connection request from web client
const connectionStatus = [false, false];
server.on("connection", (socket) => {
  let playerIndex = -1;

  socket.on("player-connecting", ({ userName }) => {
    // find an available player number
    for (const i in connectionStatus) {
      if (connectionStatus[i] === false) {
        console.log("connection available");
        playerIndex = parseInt(i);
        break;
      }
    }
    let player1 = connectionStatus[0];
    let player2 = connectionStatus[1];

    if (playerIndex === 0) {
      socket.emit("player-1-connected", player2);
      connectionStatus[0] = userName;
    } else if (playerIndex === 1) {
      socket.emit("player-2-connected", player1);
      connectionStatus[1] = userName;
    } else if (playerIndex === -1) {
      console.log("emited full server");
      socket.emit("full-server");
      return;
    }
    console.log(`Player ${playerIndex} has connected`);

    // inform other players a player is connected
    socket.broadcast.emit("player-has-joined", { userName, playerIndex });
  });

  socket.on("update-grid", ({ grid, ready }) => {
    socket.broadcast.emit("update-grid", { grid, ready });
  });

  socket.on("update-result-display-and-rounds", ({ result, currentPlayerName, numOfRounds }) => {
    socket.broadcast.emit("update-result-display-and-rounds", {
      result,
      currentPlayerName,
      numOfRounds,
    });
  });

  socket.on("update-score", ({ result, numOfRounds }) => {
    server.sockets.emit("update-score", { result, numOfRounds });
  });

  // handle disconnect
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} has disconnected`);
    console.log("connections before", { connectionStatus });
    if (playerIndex !== -1) {
      let name = connectionStatus[playerIndex];
      let num = playerIndex;
      socket.broadcast.emit("player-disconnected", { name, num });
      connectionStatus[playerIndex] = false;
    }
    console.log("connections after", { connectionStatus });
  });
});
