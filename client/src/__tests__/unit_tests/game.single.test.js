import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import Game from "../../screen/Game";

describe("Single player mode", () => {
  const props = {
    userName: "Tester",
    game: "single",
    incrementData: jest.fn(),
    toggleGameModeCb: jest.fn(),
  };
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Game {...props} />);
  });

  it("renders initial setup", () => {
    expect(wrapper.find({ "data-testid": "p1Name" }).text()).toEqual(props.userName);
    expect(wrapper.find({ "data-testid": "p2Name" }).text()).toEqual("Peanutbot");
    expect(wrapper.find({ "data-testid": "round" }).text()).toEqual("Round: 1");
    expect(wrapper.find({ "data-testid": "score1" }).text()).toEqual("0");
    expect(wrapper.find({ "data-testid": "score2" }).text()).toEqual("0");
    expect(wrapper.find({ "data-testid": "resultMsg" }).text()).toEqual("");
    expect(wrapper.find({ "data-testid": "info" }).text()).toEqual("");
  });
});
