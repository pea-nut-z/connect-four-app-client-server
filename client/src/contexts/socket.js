import socketio from "socket.io-client";
import React from "react";
export const SocketContext = React.createContext();
export const socket = socketio.connect("/", { forceNew: true });
