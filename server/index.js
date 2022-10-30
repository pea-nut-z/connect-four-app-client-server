const express = require("express");
const app = express();
const http = require("http").createServer(app);
const server = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://connect-four-pz.netlify.app"],
    methods: ["GET"],
  },
});

app.get("/", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

let connectionStatus = [false, false];
server.on("connection", (socket) => {
  let playerIndex = -1;

  socket.on("player-connecting", ({ userName }) => {
    for (const i in connectionStatus) {
      if (connectionStatus[i] === false) {
        playerIndex = parseInt(i);
        break;
      }
    }

    if (playerIndex === 0) {
      connectionStatus[0] = userName;
      socket.emit("player-1-connected");
    } else if (playerIndex === 1) {
      connectionStatus[1] = userName;
      socket.emit("player-2-connected");
    } else if (playerIndex === -1) {
      socket.emit("full-server");
      return;
    }
    server.emit("player-has-joined", { player1: connectionStatus[0], player2: connectionStatus[1] });
    console.log(`Player has connected: `, connectionStatus);
  });

  socket.on("go-first", () => {
    socket.broadcast.emit("go-first");
  });

  socket.on("update-grid", ({ grid, rowChart, result }) => {
    socket.broadcast.emit("update-grid", { grid, rowChart, result });
  });

  socket.on("result", ({ result, playerNum }) => {
    socket.broadcast.emit("result", { result, playerNum });
  });

  socket.on("replay", ({ playerNum }) => {
    socket.broadcast.emit("replay", { playerNum });
  });

  socket.on("player-disconnected", ({ playerNum }) => {
    let playerName = connectionStatus[playerNum - 1];
    socket.broadcast.emit("player-disconnected", { playerName, playerNum });
    connectionStatus[playerIndex] = false;
    console.log(`Player ${playerNum} has disconnected: `, connectionStatus);
  });

  socket.on("disconnect", () => {
    connectionStatus = [false, false];
    console.log("All players left: ", connectionStatus);
  });
});
