import puppeteer from "puppeteer";
import * as pti from "puppeteer-to-istanbul";

const player = {
  username: "Puppeteer",
  email: "testing6@gmail.com",
  password: "123456",
};

let browser, page;

describe("Authentication and database", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: 20,
    });
    page = await browser.newPage();
    await page.coverage.startJSCoverage();
    await page.goto("http://localhost:3000/");
    await page.waitForNavigation();
    jest.setTimeout(30000);
  });

  afterAll(async () => {
    // change player2's username back to Puppeteer
    await page.click("#update");
    await page.waitForSelector("#usernameInput", { visible: true });
    await page.$eval("#usernameInput", (input) => {
      return (input.value = "");
    });
    await page.type("#usernameInput", player2.username);
    await page.click("#updateBtn");

    const [jsCoverage] = await Promise.all([page.coverage.stopJSCoverage()]);
    pti.write([...jsCoverage]);
    await browser.close();
  });

  it("signs up a new user and displays new player data.", async () => {
    await page.click("[data-testid='goToSignup']");
    await page.type("[data-testid='nameInput']", player.username);
    await page.type("[data-testid='emailInput']", player.email);
    await page.type("[data-testid='passwordInput']", player.password);
    await page.type("[data-testid='confirmPasswordInput']", player.password);
    await page.click("[data-testid='signup']");
    await page.waitForSelector("[data-testid='userName']", { visible: true });
    const msg = await page.$eval("[data-testid='userName']", (element) => {
      return element.innerHTML;
    });
    const played = await page.$eval("[data-testid='played']", (element) => {
      return element.innerHTML;
    });
    const won = await page.$eval("[data-testid='won']", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe(`Hello, ${player.username}!`);
    expect(played).toContain("0");
    expect(won).toContain("0");
  });

  it("updates user profile.", async () => {
    await page.click("[data-testid='goToUpdate']");
    await page.type("[data-testid='updateUsernameInput']", "123");
    await page.click("[data-testid='update']");
    await page.waitForSelector("[data-testid='userName']", { visible: true });
    const msg = await page.$eval("[data-testid='userName']", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe(`Hello, ${player.username}123!`);
  });

  it("clicks cancel on update profile page and returns to Dashboard.", async () => {
    await page.click("[data-testid='goToUpdate']");
    await page.type("[data-testid='updateUsernameInput']", "456");
    await page.click("[data-testid='cancel']");
    await page.waitForSelector("[data-testid='userName']", { visible: true });
    const msg = await page.$eval("[data-testid='userName']", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe(`Hello, ${player.username}123!`);
  });

  it("returns to update profile page and player's information is unchanged.", async () => {
    await page.click("[data-testid='goToUpdate']");
    await page.waitForSelector("[data-testid='updateUsernameInput']", { visible: true });
    let name = await page.$eval("[data-testid='updateUsernameInput']", (input) => {
      return input.getAttribute("value");
    });
    expect(name).toBe(`${player.username}123`);
  });

  it("selects single player mode, makes a move, quits the game and increments game count data by 1.", async () => {
    await page.click("[data-testid='cancel']");
    await page.click("[data-testid='single']");
    await page.click("[data-testid='grid']");
    await page.click("[data-testid='quit']");
    await page.waitForSelector("[data-testid='played']", { visible: true });
    const played = await page.$eval("[data-testid='played']", (element) => {
      return element.innerHTML;
    });
    expect(played).toContain("1");
  });

  it("logs out successfully.", async () => {
    await page.click("[data-testid='logout']");
    const loginBtn = await page.waitForSelector("[data-testid='login']", (button) => {
      return button;
    });
    expect(loginBtn).toBeTruthy();
  });

  it("fails to log in with the wrong password.", async () => {
    await page.type("[data-testid='loginEmailInput']", player.email);
    await page.type("[data-testid='loginPasswordInput']", "123");
    await page.click("[data-testid='login']");
    const errorMsg = await page.$eval("[data-testid='error']", (element) => {
      return element.innerHTML;
    });
    expect(errorMsg).toBe("Failed to log in");
  });

  it("logs in and displays player's existing data.", async () => {
    await page.click("[data-testid='loginPasswordInput']", { clickCount: 3 });
    await page.type("[data-testid='loginPasswordInput']", player.password);
    await page.click("[data-testid='login']");
    await page.waitForSelector("[data-testid='played']", { visible: true });
    const played = await page.$eval("[data-testid='played']", (element) => {
      return element.innerHTML;
    });
    expect(played).toContain("1");
  });
});
