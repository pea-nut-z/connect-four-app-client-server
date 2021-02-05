import React from "react";
import { render } from "@testing-library/react";

xdescribe("replay button", () => {
  //   const { login } = useAuth();
  jest.mock("./MyComponent");
  // it("increments the number of round by 1", () => {
  // const { getByText } = render(<SinglePlayer/>)
  // const replayButton = getByText(/Replay/)
  // fireEvent.click(replayButton)
  it("renders without crashing", () => {
    render(<SinglePlayer />);
  });
});
