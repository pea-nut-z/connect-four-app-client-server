import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../../screen/Game";
jest.mock("../../screen/Grid");

describe("Single player mode", () => {
  const props = {
    userName: "Tester",
    game: "single",
    incrementData: jest.fn(),
    toggleGameModeCb: jest.fn(),
  };
  let component, getByTestId;

  beforeAll(() => {
    component = render(<Game {...props} />);
    getByTestId = component.getByTestId;
  });

  it("renders initial setup", () => {
    expect(getByTestId("p1Name").textContent).toBe(props.userName);
    expect(getByTestId("p2Name").textContent).toBe("Peanutbot");
    expect(getByTestId("round").textContent).toBe("Round: 1");
    expect(getByTestId("score1").textContent).toBe("0");
    expect(getByTestId("score2").textContent).toBe("0");
    expect(getByTestId("resultMsg").textContent).toBe("");
    expect(getByTestId("info").textContent).toBe("");
    expect(getByTestId("replay")).not.toBeDisabled();
  });
});
