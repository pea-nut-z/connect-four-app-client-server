import socketio from "socket.io-client";
import React from "react";

const endpoint =
  process.env.NODE_ENV === "production" ? "https://connect-four-server.onrender.com/" : "/";

export const socket = socketio.connect(endpoint, {
  reconnection: false,
  forceNew: true,
});

export const SocketContext = React.createContext();
