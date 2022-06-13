import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { cleanup } from "@testing-library/react/pure";
import Dashboard from "../../src/components/Dashboard";

describe("Dashboard", () => {
  let wrapper;

  const props = {
    toggleGameModeCb: jest.fn(),
    logout: jest.fn(),
    updateProfile: jest.fn(),
    : "Test",
    played: 10,
    won: 5,
  };

  beforeAll(() => {
    wrapper = shallow(<Dashboard {...props} />);
  });

  afterAll(() => {
    cleanup();
  });

  it("shows username", () => {
    expect(wrapper.find("#").text()).toEqual(`Hello, ${props.}!`);
  });

  it("shows number of games played", () => {
    expect(wrapper.find("#played").text()).toEqual(`🎮 ✖️ ${props.played}`);
  });

  it("shows number of times won", () => {
    expect(wrapper.find("#won").text()).toEqual(`🏆 ✖️ ${props.won}`);
  });

  it("clicks Challenge Peanutbot button -> calls toggleGameModeCb to start game in single player mode", () => {
    wrapper.find("#single").simulate("click");
    expect(props.toggleGameModeCb).toHaveBeenCalledWith("single");
  });

  it("clicks Play With A Friend button -> calls toggleGameModeCb to start game in multi player mode", () => {
    wrapper.find("#multi").simulate("click");
    expect(props.toggleGameModeCb).toHaveBeenCalledWith("multi");
  });

  it("clicks on Log Out button -> calls logout", () => {
    wrapper.find("#logoutBtn").simulate("click");
    expect(props.logout).toHaveBeenCalledTimes(1);
  });

  it("clicks on Update Profile button -> calls updateProfile", () => {
    wrapper.find("#updateProfile").simulate("click");
    expect(props.updateProfile).toHaveBeenCalledTimes(1);
  });
});
