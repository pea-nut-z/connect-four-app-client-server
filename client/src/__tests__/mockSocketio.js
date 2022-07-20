let EVENTS = {};

const on = (event, func) => {
  if (EVENTS[event]) {
    const value = EVENTS[event];
    delete EVENTS[event];
    return func(value);
  }
};

const off = () => {
  EVENTS = {};
};

export const connect1 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      EVENTS["player-1-connected"] = true;
      EVENTS["player-has-joined"] = { player1: args.userName, player2: false };
    }
  },
  off,
};

export const connect2 = {
  on,
  emit(event, args) {
    switch (event) {
      case "player-connecting":
        EVENTS["player-2-connected"] = true;
        EVENTS["player-has-joined"] = { player1: "Tester", player2: args.userName };
        break;
      case "replay":
        EVENTS[event] = args.playerNum;
        break;
      case "go-first":
        EVENTS[event] = true;
        break;
      case "result":
        EVENTS[event] = args;
        break;
      case "update-grid":
        EVENTS[event] = args;
        break;
      default:
        return;
    }
  },
  off,
};

export const connect3 = {
  on,
  emit(event) {
    if (event === "player-connecting") {
      EVENTS["full-server"] = true;
    }
  },
  off,
};

export const disconnect1 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      EVENTS["player-2-connected"] = true;
      EVENTS["player-has-joined"] = { player1: "Tester", player2: args.userName };
      EVENTS["player-disconnected"] = { playerName: "Tester", playerNum: 1 };
    }
  },
  off,
};

export const disconnect2 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      EVENTS["player-2-connected"] = true;
      EVENTS["player-has-joined"] = { player1: "Tester", player2: args.userName };
      EVENTS["player-disconnected"] = { playerName: "Jester", playerNum: 2 };
    }
  },
  off,
};

// mock result
const resultGrid = [
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 2, 1],
  [0, 0, 0, 0, 0, 2, 1],
  [0, 0, 0, 0, 0, 2, 1],
  [0, 0, 0, 0, 0, 1, 2],
  [0, 0, 0, 0, 0, 1, 2],
];

let resultValues = {
  grid: resultGrid,
  rowChart: [5, 5, 5, 5, 5, 0, 9],
  result: 1,
};

export const onResult = {
  on(event, func) {
    switch (event) {
      case "result":
        return func({ result: 1, playerNum: 1 });
      case "update-grid":
        return func(resultValues);
      default:
        if (EVENTS[event]) {
          const value = EVENTS[event];
          delete EVENTS[event];
          return func(value);
        }
    }
  },
  emit(event, args) {
    connect2.emit(event, args);
  },
  off,
};

// mock update
const updatedGrid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
];

let updatedValues = {
  grid: updatedGrid,
  rowChart: [5, 5, 5, 5, 4, 0, 0],
  result: undefined,
};

export const onUpdate = {
  on(event, func) {
    switch (event) {
      case "update-grid":
        return func(updatedValues);
      default:
        if (EVENTS[event]) {
          const value = EVENTS[event];
          delete EVENTS[event];
          return func(value);
        }
    }
  },
  emit(event, args) {
    connect2.emit(event, args);
  },
  off,
};

export const onReplay = {
  on(event, func) {
    switch (event) {
      case "replay":
        return func({ playerNum: 1 });
      default:
        if (EVENTS[event]) {
          const value = EVENTS[event];
          delete EVENTS[event];
          return func(value);
        }
    }
  },
  emit(event, args) {
    connect2.emit(event, args);
  },
  off,
};
