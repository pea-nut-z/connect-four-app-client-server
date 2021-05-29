import puppeteer from "puppeteer";
import * as pti from "puppeteer-to-istanbul";

const app = "http://localhost:3000/";
const login = {
  username: "Testing",
  email: "testing8@gmail.com",
  password: "123456",
};
let browser, page;

describe("Authentication and database", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 20,
    });
    page = await browser.newPage();
    await page.coverage.startJSCoverage();
    await page.goto(app);
    await page.waitForNavigation();
    jest.setTimeout(30000);
  });

  afterAll(async () => {
    const [jsCoverage] = await Promise.all([page.coverage.stopJSCoverage()]);
    pti.write([...jsCoverage]);
    await browser.close();
  });

  it("signs up a new user and displays new player data.", async () => {
    await page.click("#signupLink");
    await page.type("#nameInput", login.username);
    await page.type("#emailInput", login.email);
    await page.type("#passwordInput", login.password);
    await page.type("#confirmPasswordInput", login.password);
    await page.click("#signupBtn");
    await page.waitForSelector("#userName", { visible: true });
    const msg = await page.$eval("#userName", (element) => {
      return element.innerHTML;
    });
    const played = await page.$eval("#played", (element) => {
      return element.innerHTML;
    });
    const won = await page.$eval("#won", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe("Hello, Testing!");
    expect(played).toContain("0");
    expect(won).toContain("0");
  });

  it("updates user profile.", async () => {
    await page.click("#updateProfile");
    await page.type("#usernameInput", "123");
    await page.click("#updateBtn");
    await page.waitForSelector("#userName", { visible: true });
    const msg = await page.$eval("#userName", (element) => {
      return element.innerHTML;
    });
    expect(msg).toBe("Hello, Testing123!");
  });

  it("clicks cancel on update profile page and returns to Dashboard.", async () => {
    await page.click("#updateProfile");
    await page.type("#usernameInput", "456");
    await page.click("#cancelLink");
    const nameDisplay = await page.waitForSelector("#userName", (element) => {
      return element;
    });
    expect(nameDisplay).toBeTruthy();
  });

  it("returns to update profile page and player's information is unchanged.", async () => {
    await page.click("#updateProfile");
    await page.waitForSelector("#usernameInput", { visible: true });
    const name = await page.$eval("#usernameInput", (input) => {
      return input.getAttribute("value");
    });
    expect(name).toBe("Testing123");
  });

  it("selects single player mode, makes awaitForSelector, quits the game and increments game count data by 1.", async () => {
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
    await page.click("#logoutBtn");
    const loginBtn = await page.waitForSelector("#loginBtn", (button) => {
      return button;
    });
    expect(loginBtn).toBeTruthy();
  });

  it("fails to log in with the wrong password.", async () => {
    await page.type("#emailInput", login.email);
    await page.type("#passwordInput", "12");
    await page.click("#loginBtn");
    // await page.waitForSelector("#played", { visible: true });
    const errorMsg = await page.$eval("#error", (element) => {
      return element.innerHTML;
    });
    expect(errorMsg).toBe("Failed to log in");
  });

  it("logs in and displays player's existing data.", async () => {
    await page.type("#emailInput", login.email);
    await page.type("#passwordInput", login.password);
    await page.click("#loginBtn");
    await page.waitForSelector("#played", { visible: true });
    const played = await page.$eval("#played", (element) => {
      return element.innerHTML;
    });
    expect(played).toContain("1");
  });
});
