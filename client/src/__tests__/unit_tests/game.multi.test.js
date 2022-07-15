import React, { useContext } from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Game from "../../screen/Game";
import { SocketContext } from "../../contexts/socket";
import { mockio, socket, serverSocket, cleanUp } from "../mockSocketio";
jest.mock("../../screen/Grid");

describe("Multi player mode", () => {
  const props = {
    userName: "Tester1",
    game: "multi",
    incrementData: jest.fn(),
    toggleGameModeCb: jest.fn(),
  };

  let component, getByTestId;

  beforeAll(() => {
    component = render(
      <SocketContext.Provider value={mockio.connect()}>
        <Game {...props} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
  });

  it.only("renders initial setup for the first player joining the game", () => {
    expect(getByTestId("p1Name").textContent).toBe(props.userName);
    expect(getByTestId("p2Name").textContent).toBe("Waiting...");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).toBeDisabled();

    // console.log(component.debug());
  });

  it("displays two players' names when another player joins in.", async () => {
    await act(async () => {
      jest.setTimeout(30000);
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 35,
      });
      page = await browser.newPage();
      await page.goto(app);
      await page.waitForNavigation();
      await page.type("#emailInput", player2.email);
      await page.type("#passwordInput", player2.password);
      await page.click("#loginBtn");
      await page.waitForNavigation();
      await page.click("#multi");
      expect(getByTestId("p1Name")).toHaveTextContent(player1);
      expect(getByTestId("p2Name")).toHaveTextContent(player2.username);
    });
  });

  it("says it is player1's turn in pink.", async () => {
    await waitFor(() => {
      expect(getByTestId("turn")).toHaveTextContent("Your turn");
      expect(getByTestId("turn").style).toHaveProperty("color", "rgb(240, 18, 190)");
    });
  });

  it("increments the number of rounds on click of replay.", () => {
    const replayBtn = getByTestId("replay");
    fireEvent.click(replayBtn);
    expect(getByTestId("numOfRounds")).toHaveTextContent("2");
  });

  it("says a player has left the game.", async () => {
    await act(async () => {
      page.click("#quitBtn");
      await waitFor(() => {
        expect(getByTestId("turn")).toHaveTextContent("Waiting for a player to join...");
        expect(getByTestId("info")).toHaveTextContent(`${player2.username} left💨`);
      });
    });
  });
});
