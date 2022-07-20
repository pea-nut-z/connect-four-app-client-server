let events = {};

const on = (event, func) => {
  if (events[event]) {
    const value = events[event];
    delete events[event];
    return func(value);
  }
};

const off = () => {
  events = {};
};

export const connect1 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-1-connected"] = true;
      events["player-has-joined"] = { player1: args.userName, player2: false };
    }
  },
  off,
};

export const connect2 = {
  on,
  emit(event, args) {
    switch (event) {
      case "player-connecting":
        events["player-2-connected"] = true;
        events["player-has-joined"] = { player1: "Tester", player2: args.userName };
        break;
      case "replay":
        events[event] = args.playerNum;
        break;
      case "go-first":
        events[event] = true;
        break;
      case "result":
        events[event] = args;
        break;
      case "update-grid":
        events[event] = args;
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
      events["full-server"] = true;
    }
  },
  off,
};

export const disconnect1 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-2-connected"] = true;
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
      events["player-disconnected"] = { playerName: "Tester", playerNum: 1 };
    }
  },
  off,
};

export const disconnect2 = {
  on,
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-2-connected"] = true;
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
      events["player-disconnected"] = { playerName: "Jester", playerNum: 2 };
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
        if (events[event]) {
          const value = events[event];
          delete events[event];
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
        if (events[event]) {
          const value = events[event];
          delete events[event];
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
        if (events[event]) {
          const value = events[event];
          delete events[event];
          return func(value);
        }
    }
  },
  emit(event, args) {
    connect2.emit(event, args);
  },
  off,
};
