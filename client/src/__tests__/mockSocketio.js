const connections = {
  1: [false, false],
  2: ["Tester", false],
  3: ["Tester", "Jest"],
  4: ["Tester", false],
  5: ["Tester", false],
};
// const connectionsCopy = { ...connections };
let testNum = 1;
let events = {};

const emit = (event, args) => {
  switch (event) {
    case "player-connecting":
      connectPlayer(args);
      break;
    case "player-disconnected":
      disconnectPlayer(args);
      break;
    default:
      console.log("unhandled event: ", event);
  }
};

const socket = {
  on(event, func) {
    if (events[event] || events[event] === null) {
      const value = events[event];
      // console.log(".ON events BEFORE", events);
      delete events[event];
      // console.log(".ON events AFTER", events);
      return func(value);
    }
    if (event === "player-disconnected" && testNum === 5) {
      return func({ playerName: "Tester", playerNum: 1 });
    }
  },
  emit,
  off(event) {
    if (event === "player-disconnected") {
      // connections[testNum] = connectionsCopy[testNum];
      testNum++;
    }
  },
};

export const mockio = {
  connect() {
    return socket;
  },
};

const connectPlayer = (args) => {
  // console.log({ testNum });
  let name = args.userName;
  let playerIndex = -1;
  let event;
  const curConnection = connections[testNum];
  for (const i in curConnection) {
    if (curConnection[i] === false) {
      playerIndex = parseInt(i);
      break;
    }
  }

  if (playerIndex === 0) {
    connections[testNum][0] = name;
    event = "player-1-connected";
  } else if (playerIndex === 1) {
    connections[testNum][1] = name;
    event = "player-2-connected";
  } else {
    event = "full-server";
  }

  if (playerIndex > -1) {
    const player1 = connections[testNum][0];
    const player2 = connections[testNum][1];
    events["player-has-joined"] = { player1, player2 };
  }
  events[event] = null;
  // console.log({ connections });
};

const disconnectPlayer = (args) => {
  const index = args.playerNum - 1;
  const name = connections[testNum][index];
  events["player-disconnected"] = { name, ...args };
};
