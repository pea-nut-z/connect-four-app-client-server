const test = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, "Player-2", "Player-1", null],
  [null, null, null, null, "Player-2", "Player-1", null],
  [null, null, null, null, "Player-2", "Player-1", null],
];

// SINGLE
// at [5,0]
const aiWins = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, "Player-1", "Player-1", "Player-2", null, null, null],
  [null, "Player-2", "Player-2", "Player-1", null, null, null],
  [null, "Player-2", "Player-1", "Player-1", null, null, "Player-2"],
  [
    null,
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
  ],
];

// draw at [0,5]
const draw = [
  ["Player-2", "Player-2", "Player-1", "Player-1", null, null, "Player-1"],
  [
    "Player-1",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-1",
    "Player-2",
  ],
  [
    "Player-1",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
  ],
  [
    "Player-2",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-1",
  ],
  [
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-2",
  ],
  [
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-2",
  ],
];

const draw = [
  ["Player-2", "Player-2", "Player-1", "Player-1", null, null, "Player-1"],
  [
    "Player-1",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-1",
    "Player-2",
  ],
  [
    "Player-1",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
  ],
  [
    "Player-2",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-1",
  ],
  [
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-2",
  ],
  [
    "Player-2",
    "Player-2",
    "Player-1",
    "Player-1",
    "Player-2",
    "Player-2",
    "Player-2",
  ],
];
