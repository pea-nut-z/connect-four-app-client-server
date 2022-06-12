const express = require("express");
const app = express();
const http = require("http").createServer(app);
const server = require("socket.io")(http, {
  cors: {
    origin: "/",
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
    console.log("SERVER RECEIVED GO-FIRST");
    socket.broadcast.emit("go-first");
  });

  socket.on("update-grid", ({ grid, rowChart, result }) => {
    console.log("SERVER SENDING UPDATE GRID");
    socket.broadcast.emit("update-grid", { grid, rowChart, result });
  });

  socket.on("handle-result", ({ result, lastPlayer }) => {
    console.log("SERVER SEND HANDLE-RESULT");
    socket.broadcast.emit("handle-result", { result, lastPlayer });
  });

  socket.on("handle-replay", (playerNum) => {
    socket.broadcast.emit("handle-replay", { playerNum });
  });

  // handle disconnect
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} has disconnected`);
    if (playerIndex !== -1) {
      let name = connectionStatus[playerIndex];
      let num = playerIndex;
      socket.broadcast.emit("player-disconnected", { name, num });
      connectionStatus[playerIndex] = false;
    }
    console.log("Updated Connections: ", connectionStatus);
  });
});
