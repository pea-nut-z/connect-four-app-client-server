let EVENTS = {};
const connections = [false, false];

function emit(event, args) {
  server.on(event, args);
}

const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return func(EVENTS[event]);
    } else {
      EVENTS[event] = [func];
      console.log("no event yet");
    }
  },
  emit,
};

export const mockio = {
  connect() {
    return socket;
  },
};

const connectPlayer = (args) => {
  let name = args.userName;
  let playerIndex = -1;
  let event;
  for (const i in connections) {
    if (connections[i] === false) {
      playerIndex = parseInt(i);
      break;
    }
  }

  if (playerIndex === 0) {
    connections[0] = name;
    event = "player-1-connected";
  } else if (playerIndex === 1) {
    connections[1] = name;
    event = "player-2-connected";
  } else {
    event = "full-server";
  }
  EVENTS[event] = undefined;
  EVENTS["player-has-joined"] = { player1: connections[0], player2: connections[1] };
  console.log(EVENTS);
  console.log({ connections });
};

const disconnectPlayer = (args) => {
  const index = args.playerNum - 1;
  const name = connections[index];
  EVENTS["player-disconnected"] = { name, ...args };
  connections[index] = false;
};

export const server = {
  on(event, args) {
    switch (event) {
      case "player-connecting":
        connectPlayer(args);
        break;
      case "player-disconnected":
        console.log("player disconnected");
        disconnectPlayer(args);
      default:
        console.log("unknown event");
    }
  },
};

// cleanup helper
export function cleanup() {
  EVENTS = {};
}
