const express = require("express");
const app = express();
const http = require("http").createServer(app);
const server = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const path = require("path");
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// handle a socket connection request from web client
const connectionStatus = [false, false];
server.on("connection", (socket) => {
  let playerIndex = -1;

  socket.on("player-connecting", ({ USER_NAME }) => {
    // find an available player number
    for (const i in connectionStatus) {
      if (connectionStatus[i] === false) {
        playerIndex = parseInt(i);
        break;
      }
    }

    if (playerIndex === 0) {
      connectionStatus[0] = USER_NAME;
      socket.emit("player-1-connected");
    } else if (playerIndex === 1) {
      connectionStatus[1] = USER_NAME;
      socket.emit("player-2-connected");
    } else if (playerIndex === -1) {
      socket.emit("full-server");
      return;
    }
    console.log(`Player ${playerIndex} has connected`);
    server.emit("player-has-joined", { player1: connectionStatus[0], player2: connectionStatus[1] });
  });

  socket.on("go-first", () => {
    console.log("SERVER - GO-FIRST");
    socket.broadcast.emit("go-first");
  });

  socket.on("update-grid", ({ grid, rowChart, result }) => {
    console.log("SERVER - UPDATE GRID");
    socket.broadcast.emit("update-grid", { grid, rowChart, result });
  });

  socket.on("handle-result", ({ result, lastPlayer }) => {
    console.log("SERVER - HANDLE-RESULT");
    socket.broadcast.emit("handle-result", { result, lastPlayer });
  });

  socket.on("handle-replay", ({ playerNum }) => {
    socket.broadcast.emit("handle-replay", { playerNum });
  });

  socket.on("player-disconnected", ({ playerNum }) => {
    console.log(`Player ${playerNum} has disconnected`);
    let playerName = connectionStatus[playerNum - 1];
    socket.broadcast.emit("player-disconnected", { playerName, playerNum });
    connectionStatus[playerIndex] = false;
    console.log("Updated Connections: ", connectionStatus);
  });

  // handle disconnect
  socket.on("disconnect", () => {
    console.log("PLAYERS ALL LEFT AND SOCKET IS CLOSED.");
  });
});
