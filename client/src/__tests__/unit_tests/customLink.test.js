import React from "react";
import { render, cleanup } from "@testing-library/react/pure";
import { Router } from "react-router-dom";
import CustomLink from "../../UI/CustomLink";
import { createMemoryHistory } from "history";

const history = createMemoryHistory();

describe("CustomButton - button style", () => {
  const props = {
    text: "some text",
    moreText: "more text",
    id: "123",
    testid: "456",
    to: "./path",
  };

  let component, link, getByTestId;
  beforeAll(() => {
    component = render(
      <Router history={history}>
        <CustomLink {...props} />
      </Router>
    );
    getByTestId = component.getByTestId;
    link = component.getByTestId(props.testid);
  });

  afterAll(() => {
    cleanup();
  });

  it("renders text", () => {
    expect(getByTestId("linkText").textContent).toContain("more text");
    expect(link.textContent).toBe("some text");
  });
});
