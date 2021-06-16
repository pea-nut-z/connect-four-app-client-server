export const app = "http://localhost:3000/";
export const player1 = "Jest";
export const player2 = {
  username: "Puppeteer",
  email: "testing5@gmail.com",
  password: "123456",
};
export const player3 = {
  username: "Incognito",
  email: "testing1@gmail.com",
  password: "123456",
};

export const testGridSingle = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ["p1", null, null, null, null, null, null],
  ["p1", null, null, null, null, null, null],
  ["p1", "p2", "p2", null, "p2", null, null],
  ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
];

export const testGridMulti = [
  [null, "p2", null, null, "p1", "p1", "p2"],
  ["p1", "p2", "p1", "p2", "p2", "p1", "p2"],
  ["p1", "p2", "p1", "p2", "p2", "p2", "p1"],
  ["p2", "p1", "p1", "p2", "p1", "p1", "p2"],
  ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
  ["p2", "p1", "p1", "p1", "p2", "p2", "p2"],
];
