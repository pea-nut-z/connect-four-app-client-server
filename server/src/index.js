import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import user from "../src/routes/user.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://connect-four-pz.netlify.app"],
    methods: ["GET", "PUT", "POST"],
    credentials: true,
  },
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use("/user", user);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

let connectionStatus = [false, false];
io.on("connection", (socket) => {
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
    io.emit("player-has-joined", { player1: connectionStatus[0], player2: connectionStatus[1] });
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
