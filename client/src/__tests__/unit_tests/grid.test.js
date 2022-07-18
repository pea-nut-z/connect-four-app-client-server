import React from "react";
import { render } from "@testing-library/react/pure";
import { SocketContext } from "../../contexts/socket";
import { Grid } from "../../screen/Grid";
import * as mock from "../mockSocketio";

jest.mock("../../UI/Square", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="square" />;
    },
  };
});

describe("Single player mode", () => {
  const singlePlayerProps = {
    ref: React.createRef(),
    game: "single",
    handleResultCb: jest.fn(),
    opponentName: "Jester",
    thisPlayerNum: 1,
    gameOver: false,
  };

  let component, getByTestId, getAllByTestId, unmount;

  beforeAll(() => {
    component = render(<Grid {...singlePlayerProps} />);
    getByTestId = component.getByTestId;
    getAllByTestId = component.getAllByTestId;
    unmount = component.unmount;
  });

  afterAll(() => {
    unmount();
  });

  it("says it is player1's turn in pink", () => {
    expect(getByTestId("turn")).toHaveTextContent("Your turn");
    expect(getByTestId("turn").style).toHaveProperty("color", "rgb(240, 18, 190)");
  });

  it("renders a 6 x 7 grid", () => {
    expect(getAllByTestId("square").length).toBe(42);
  });
});

describe("Multi player mode - all spots are available", () => {
  const multiPlayerProps = {
    ref: React.createRef(),
    game: "multi",
    handleResultCb: jest.fn(),
    opponentName: null,
    thisPlayerNum: 1,
    gameOver: true,
  };

  let component, getByTestId, unmount;

  beforeAll(() => {
    component = render(
      <SocketContext.Provider value={mock.allAvailable}>
        <Grid {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    unmount = component.unmount;
  });

  afterAll(() => {
    unmount();
  });

  it("says waiting for a player to join in green when there is only one player", () => {
    expect(getByTestId("turn")).toHaveTextContent("Waiting for a player to join...");
    expect(getByTestId("turn").style).toHaveProperty("color", "rgb(46, 204, 64)");
  });
});

describe("Multi player mode - one spot is available", () => {
  const multiPlayerProps = {
    ref: React.createRef(),
    game: "multi",
    handleResultCb: jest.fn(),
    opponentName: "Tester",
    thisPlayerNum: 2,
    gameOver: false,
  };

  let component, getByTestId, unmount;

  beforeAll(() => {
    component = render(
      <SocketContext.Provider value={mock.oneAvailable}>
        <Grid {...multiPlayerProps} />
      </SocketContext.Provider>
    );
    getByTestId = component.getByTestId;
    unmount = component.unmount;
  });

  afterAll(() => {
    unmount();
  });

  it("says waiting for the first player to start in pink when the second player joins the game", () => {
    expect(getByTestId("turn")).toHaveTextContent("Waiting for Tester...");
    expect(getByTestId("turn").style).toHaveProperty("color", "rgb(240, 18, 190)");
  });
});
