import { render, screen } from "@testing-library/react";
import StackPG from "../../../components/DSPlaygrounds/StackPG";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("StackPG", () => {
  const renderComponent = () => {
    render(
      <Router>
        <StackPG />
      </Router>
    );
  };

  const getElements = () => {
    return {
      size: screen.getByTestId("size"),
      isEmpty: screen.getByTestId("is-empty"),
    };
  };

  it("should render initial state correctly", () => {
    // arrange
    renderComponent();

    // assert size=0 and isEmpty=yes
    const { size, isEmpty } = getElements();

    expect(size).toHaveTextContent("0");
    expect(isEmpty).toHaveTextContent("Yes");
  });

  it("should push value onto stack correctly when user clicks push", async () => {
    // arrange
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByTestId("num-input");
    const pushButton = screen.getByRole("button", { name: "Push" });

    // act
    await user.type(input, "1");
    await user.click(pushButton);

    // assert
    const { size, isEmpty } = getElements();
    expect(size).toHaveTextContent("1");
    expect(isEmpty).toHaveTextContent("No");
  });
});
