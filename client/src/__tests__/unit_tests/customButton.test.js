import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react/pure";
import CustomButton from "../../UI/CustomButton";

describe("CustomButton - button style", () => {
  const props = {
    id: "123",
    testid: "456",
    link: null,
    text: "This is a test",
    type: "button",
    func: jest.fn(),
    funcArgu: "argu",
    disabled: false,
  };

  let component, button, getByTestId;
  beforeAll(() => {
    component = render(<CustomButton {...props} />);
    getByTestId = component.getByTestId;
    button = component.getByTestId(props.testid);
  });

  afterAll(() => {
    cleanup();
  });

  it("is a button when the link prop is null", () => {
    expect(button.className).toBe("btn w-100 mt-3 text-center btn btn-warning  btn btn-warning");
  });

  it("has two class names when the value prop is greater than 0", () => {
    expect(button).not.toBeDisabled();
  });

  it("calls the function with the argument prop if it is not a link button", () => {
    fireEvent.click(button);
    expect(props.func).toBeCalledWith(props.funcArgu);
  });

  it("has a name", () => {
    expect(button.textContent).toBe(props.text);
  });

  it("has an id property", () => {
    expect(button).toHaveAttribute("id", props.id);
  });

  it("has a data-testid attribute", () => {
    expect(button).toHaveAttribute("data-testid", props.testid);
  });

  it("has a type attribute", () => {
    expect(button).toHaveAttribute("type", props.type);
  });
});

describe("CustomButton - link style", () => {
  const props = {
    testid: "456",
    link: true,
  };

  let component, button, getByTestId;
  beforeAll(() => {
    component = render(<CustomButton {...props} />);
    getByTestId = component.getByTestId;
    button = component.getByTestId(props.testid);
  });

  afterAll(() => {
    cleanup();
  });

  it("is a link when the link prop is true", () => {
    expect(button.className).toBe("btn w-100 mt-3 text-center text-decoration-none btn btn-link");
  });
});
