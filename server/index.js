const http = require("http").createServer();
const server = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

// handle a socket connection request from web client
const connectionStatus = [false, false];
server.on("connection", (socket) => {
  let playerIndex = -1;
  // find an available player number
  for (const i in connectionStatus) {
    if (connectionStatus[i] === false) {
      playerIndex = parseInt(i);
      break;
    }
  }

  // tell the connecting client what player number they are
  console.log(`Player ${playerIndex} has connected`);

  // ignore the 3rd player
  if (playerIndex === -1) {
    socket.emit("full-server");
  }

  if (playerIndex === 1) {
    socket.emit("assign-player-as-player2");
  }

  connectionStatus[playerIndex] = true;
  console.log({ connectionStatus });

  // set connection status indicators
  server.emit("player-connection-status", connectionStatus);

  // switch turns
  socket.on("switch-turn", (grid) => {
    socket.broadcast.emit("take-the-turn", grid);
  });

  // handle disconnect
  socket.on("disconnect", () => {
    server.emit("player-disconnected", playerIndex);
    console.log(`Player ${playerIndex} has disconnected`);
    connectionStatus[playerIndex] = false;
    console.log({ connectionStatus });
  });
});
