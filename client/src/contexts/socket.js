import socketio from "socket.io-client";
import React from "react";
export const SocketContext = React.createContext();
// export const socket = socketio.connect("/", { forceNew: true });
export const socket = socketio.connect("/", {
  reconnection: false,
  forceNew: true,
});
