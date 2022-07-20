import puppeteer from "puppeteer";
import * as pti from "puppeteer-to-istanbul";
import { localhost, player2 } from "../mockValues";

let browser, page;

describe("Authentication and database", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 20,
    });
    page = await browser.newPage();
    await page.coverage.startJSCoverage();
    await page.goto(localhost);
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
    await page.click("#signupLink");
    await page.type("#nameInput", player2.username);
    await page.type("#emailInput", player2.email);
    await page.type("#passwordInput", player2.password);
    await page.type("#confirmPasswordInput", player2.password);
    await page.click("#signupBtn");
    await page.waitForSelector("#", { visible: true });
    const msg = await page.$eval("#", (element) => {
      return element.innerHTML;
    });
    const played = await page.$eval("#played", (element) => {
      return element.innerHTML;
    });
    const won = await page.$eval("#won", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe(`Hello, ${player2.username}!`);
    expect(played).toContain("0");
    expect(won).toContain("0");
  });

  it("updates user profile.", async () => {
    await page.click("#update");
    await page.type("#usernameInput", "123");
    await page.click("#updateBtn");
    await page.waitForSelector("#", { visible: true });
    const msg = await page.$eval("#", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe(`Hello, ${player2.username}123!`);
  });

  it("clicks cancel on update profile page and returns to Dashboard.", async () => {
    await page.click("#update");
    await page.type("#usernameInput", "456");
    await page.click("#cancelLink");
    const nameDisplay = await page.waitForSelector("#", (element) => {
      return element;
    });
    expect(nameDisplay).toBeTruthy();
  });

  it("returns to update profile page and player's information is unchanged.", async () => {
    await page.click("#update");
    await page.waitForSelector("#usernameInput", { visible: true });
    let name = await page.$eval("#usernameInput", (input) => {
      return input.getAttribute("value");
    });
    expect(name).toBe(`${player2.username}123`);
  });

  it("selects single player mode, makes a move, quits the game and increments game count data by 1.", async () => {
    await page.click("#cancelLink");
    await page.click("#single");
    await page.click("#grid");
    await page.click("#quitBtn");
    await page.waitForSelector("#played", { visible: true });
    const played = await page.$eval("#played", (element) => {
      return element.innerHTML;
    });
    expect(played).toContain("1");
  });

  it("logs out successfully.", async () => {
    await page.click("#logout");
    const loginBtn = await page.waitForSelector("#loginBtn", (button) => {
      return button;
    });
    expect(loginBtn).toBeTruthy();
  });

  it("fails to log in with the wrong password.", async () => {
    await page.type("#emailInput", player2.email);
    await page.type("#passwordInput", "123");
    await page.click("#loginBtn");
    const errorMsg = await page.$eval("#error", (element) => {
      return element.innerHTML;
    });
    expect(errorMsg).toBe("Failed to log in");
  });

  it("logs in and displays player's existing data.", async () => {
    await page.type("#passwordInput", "456");
    await page.click("#loginBtn");
    await page.waitForSelector("#played", { visible: true });
    const played = await page.$eval("#played", (element) => {
      return element.innerHTML;
    });
    expect(played).toContain("1");
  });
});
