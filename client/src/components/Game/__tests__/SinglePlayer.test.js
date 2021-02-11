import React from "react";
import { render } from "@testing-library/react";
import SinglePlayer from "../SinglePlayer";
import { initialGrid } from ".././help";

describe("<SinglePlayer />", () => {
  //   function createTestProps(props) {
  //     return {

  //     };
  // }
  //   let wrapper, props;

  //   beforeAll(() => {
  //     props = createTestProps();
  //     wrapper = shallow(<Comment {...props} /> );
  // });
  //   const { login } = useAuth();
  // jest.mock("./MyComponent");
  // it("increments the number of round by 1", () => {
  // const { getByText } = render(<SinglePlayer/>)
  // const replayButton = getByText(/Replay/)
  // fireEvent.click(replayButton)
  it("renders without crashing", () => {
    const name = "Testing";
    let incremented = false;
    console.log(initialGrid);

    render(
      <SinglePlayer
        userName={name}
        incrementPlayedData={() => {
          incremented = true;
        }}
        incrementScoreData={() => {
          incremented = true;
        }}
        initialGrid={initialGrid}
        toggleGameMode={() => {
          incremented = true;
        }}
      />
    );
  });
});
