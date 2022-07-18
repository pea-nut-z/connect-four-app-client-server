import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import Square from "../../UI/Square";

describe("Square", () => {
  const props = {
    value: 1,
    colIdx: 3,
    handleMove: jest.fn(),
  };
  let component, getByTestId;
  beforeAll(() => {
    component = render(<Square {...props} />);
    getByTestId = component.getByTestId;
  });

  afterAll(() => {
    cleanup();
  });

  it("calls a function on click", () => {
    fireEvent.click(getByTestId("square"));
    expect(props.handleMove).toBeCalledWith(3);
  });

  it("has two class names when the value prop is greater than 0", () => {
    expect(getByTestId("square").className).toBe("circle p1");
  });
});

describe("Square", () => {
  const props = {
    value: 0,
    colIdx: 3,
    handleMove: jest.fn(),
  };
  let component, getByTestId;
  beforeAll(() => {
    component = render(<Square {...props} />);
    getByTestId = component.getByTestId;
  });

  it("has one class name when the value prop is 0", () => {
    expect(getByTestId("square").className).toBe("circle ");
  });
});
