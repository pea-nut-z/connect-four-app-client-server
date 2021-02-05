import React from "react";
import SinglePlayer from "../SinglePlayer";
import { render } from "@testing-library/react";
describe("replay button", () => {
  // it("increments the number of round by 1", () => {
  // const { getByText } = render(<SinglePlayer/>)
  // const replayButton = getByText(/Replay/)
  // fireEvent.click(replayButton)
  it("renders without crashing", () => {
    render(<SinglePlayer />);
  });
});
