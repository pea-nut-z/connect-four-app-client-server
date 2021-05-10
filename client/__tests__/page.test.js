import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import Page from "../src/components/Page";

describe("Page", () => {
  it("renders <Game /> without crashing", () => {
    shallow(<Page />);
  });
});
