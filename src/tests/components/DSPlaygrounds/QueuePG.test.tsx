import { render, screen } from "@testing-library/react";
import QueuePG from "../../../components/DSPlaygrounds/QueuePG";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("QueuePG", () => {
  const renderComponent = () => {
    render(
      <Router>
        <QueuePG />
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

  it("should push value onto queue correctly when user clicks enqueue", async () => {
    // arrange
    renderComponent();
    const user = userEvent.setup();
    const input = screen.getByTestId("num-input");
    const pushButton = screen.getByRole("button", { name: "Enqueue" });

    // act
    await user.type(input, "1");
    await user.click(pushButton);

    // assert
    const { size, isEmpty } = getElements();
    expect(size).toHaveTextContent("1");
    expect(isEmpty).toHaveTextContent("No");
  });
});
