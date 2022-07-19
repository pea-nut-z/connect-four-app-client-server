let events = {};

export const connect1 = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-1-connected"] = true;
      events["player-has-joined"] = { player1: args.userName, player2: false };
    }
  },
  off() {
    return;
  },
};

export const connect2 = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event, args) {
    switch (event) {
      case "player-connecting":
        events["player-2-connected"] = true;
        events["player-has-joined"] = { player1: "Tester", player2: args.userName };
        break;
      case "replay":
        events[event] = args.playerNum;
        break;
      // case "go-first":
      //   events[event] = true;
      default:
        return;
    }
  },
  off() {
    return;
  },
};

export const connect3 = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
  },
  emit(event) {
    if (event === "player-connecting") {
      events["full-server"] = true;
    }
  },
  off() {
    return;
  },
};

export const disconnect1 = {
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
      events["player-2-connected"] = true;
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
    }
  },
  off() {
    return;
  },
};

export const disconnect2 = {
  on(event, func) {
    if (events[event]) {
      const value = events[event];
      delete events[event];
      return func(value);
    }
    if (event === "player-disconnected") {
      return func({ playerName: "Jester", playerNum: 2 });
    }
  },
  emit(event, args) {
    if (event === "player-connecting") {
      events["player-2-connected"] = true;
      events["player-has-joined"] = { player1: "Tester", player2: args.userName };
    }
  },
  off() {
    return;
  },
};
