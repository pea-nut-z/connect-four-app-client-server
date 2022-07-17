let events = {};

export const allAvailable = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-1-connected"] = " ";
      events["player-has-joined"] = { player1: args.userName, player2: false };
    }
  },
  off() {
    return;
  },
};

export const oneAvailable = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-2-connected"] = " ";
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
    }
  },
  off() {
    return;
  },
};

export const unavailable = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event) {
    if (event === "player-connecting") {
      events["full-server"] = " ";
    }
  },
  off() {
    return;
  },
};

export const disconnect = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
    if (event === "player-disconnected") {
      return func({ playerName: "Tester", playerNum: 1 });
    }
  },
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-2-connected"] = " ";
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
    }
  },
  off() {
    return;
  },
};
