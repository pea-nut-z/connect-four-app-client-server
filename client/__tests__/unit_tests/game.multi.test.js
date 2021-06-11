// import React from "react";
import React from "react";
import { render, fireEvent, cleanup, act, waitFor } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Game from "../../src/components/game/Game";
import { SocketContext, socket } from "../../src/contexts/socket";
import puppeteer from "puppeteer";
import { app, player1, player2, testGridMulti, testGridDraw } from "../constants";

let browser, page;
const incrementData = jest.fn();
const toggleGameMode = jest.fn();

describe("Multi player mode", () => {
  let component, grid;
  let getByTestId, getAllByTestId;

  beforeAll(async () => {
    await act(async () => {
      component = await render(
        <SocketContext.Provider value={socket}>
          <Game
            userName={player1}
            game={"multi"}
            initialGrid={testGridMulti}
            incrementData={incrementData}
            toggleGameMode={toggleGameMode}
          />
        </SocketContext.Provider>
      );
      getByTestId = component.getByTestId;
      getAllByTestId = component.getAllByTestId;
      grid = getAllByTestId("square");
    });
  });

  afterAll(async () => {
    // await page.click("#logoutBtn");
    // await browser.close();
    // await browser.close().catch((e) => e);
    cleanup();
  });

  it("says it is waiting for another player to join. ", () => {
    expect(getByTestId("p2Name")).toHaveTextContent("Waiting...");
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
      // click replay to get the pre filled grid passed through component as prop
      const replayBtn = getByTestId("replay");
      await fireEvent.click(replayBtn);

      expect(getByTestId("p1Name")).toHaveTextContent(player1);
      expect(getByTestId("p2Name")).toHaveTextContent(player2.username);
    });
  });

  it("says it is player2's turn in green.", () => {
    expect(getByTestId("turn")).toHaveTextContent(`Waiting for ${player2.username}...`);
    expect(getByTestId("turn").style).toHaveProperty("color", "rgb(46, 204, 64)");
  });

  it("says it is player1's turn in pink.", async () => {
    page.click("#grid");
    await waitFor(() => {
      expect(getByTestId("turn")).toHaveTextContent("Your turn");
      expect(getByTestId("turn").style).toHaveProperty("color", "rgb(240, 18, 190)");
    });
  });

  it("says player1 wins and increments its score.", async () => {
    fireEvent.click(grid[3]);
    await waitFor(() => {
      expect(getByTestId("resultMsg")).toHaveTextContent("🥂 YOU WIN! 🎉");
      expect(getByTestId("score1")).toHaveTextContent(1);
      expect(getByTestId("info")).toHaveTextContent("Click Replay ⬇️");
      expect(getByTestId("replay")).not.toBeDisabled();
    });
  });

  it("increments the number of rounds after winner clicks replay.", () => {
    const replayBtn = getByTestId("replay");
    fireEvent.click(replayBtn);
    expect(getByTestId("numOfRounds")).toHaveTextContent("3");
  });

  it("says player1 has lost and increments opponent's score.", async () => {
    fireEvent.click(grid[3]);
    page.click("#grid");
    await waitFor(() => {
      expect(getByTestId("resultMsg")).toHaveTextContent("😱 YOU LOST! 💩");
      expect(getByTestId("score2")).toHaveTextContent(1);
      expect(getByTestId("info")).toHaveTextContent(
        `Waiting for ${player2.username} to restart the game...`
      );
      expect(getByTestId("replay")).toBeDisabled();
    });
  });

  it("says a player has left the game.", async () => {
    page.click("#quitBtn");
    await waitFor(() => {
      expect(getByTestId("turn")).toHaveTextContent("Waiting for a player to join...");
      expect(getByTestId("info")).toHaveTextContent(`${player2.username} left💨`);
    });
  });
});
