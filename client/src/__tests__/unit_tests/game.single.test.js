import React from "react";
import { shallow, mount } from "enzyme";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import Game from "../../screen/Game";

describe("Single player mode", () => {
  const player = "Tester";
  const incrementData = jest.fn();
  const toggleGameModeCb = jest.fn();
  let wrapper, getByTestId;

  beforeAll(() => {
    wrapper = shallow(
      <Game
        userName={player}
        game={"single"}
        incrementData={incrementData}
        toggleGameModeCb={toggleGameModeCb}
      />
    );
    // component = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("renders initial setup", () => {
    expect(wrapper.find({ "data-testid": "p1Name" }).text()).toEqual(player);
    expect(wrapper.find({ "data-testid": "p2Name" }).text()).toEqual("Peanutbot");
    expect(wrapper.find({ "data-testid": "round" }).text()).toEqual("Round: 1");
    expect(wrapper.find({ "data-testid": "score1" }).text()).toEqual("0");
    expect(wrapper.find({ "data-testid": "score2" }).text()).toEqual("0");
    expect(wrapper.find({ "data-testid": "resultMsg" }).text()).toEqual("");
    expect(wrapper.find({ "data-testid": "info" }).text()).toEqual("");
  });
});
