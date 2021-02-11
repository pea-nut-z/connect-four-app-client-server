import io from "socket.io-client";
// const client = io("http://localhost:3001");

// const client = io("http://localhost:3001", {
//   secure: true,
//   transports: ["websocket"],
// });

const client = io("http://localhost:3001", {
  path: "../../../package.json",
});

export { client };
