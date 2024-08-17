import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import SinglyLinkedListPG from "../../../components/DSPlaygrounds/SinglyLinkedListPG";

describe("SinglyLinkedList", () => {
  const renderComponent = () => {
    render(
      <Router>
        <SinglyLinkedListPG />
      </Router>
    );
  };

  it("should render initial state correctly", () => {
    renderComponent();

    expect(screen.getByTestId("size")).toHaveTextContent("0");
    expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Insert at Head" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Insert at Tail" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete at Head" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete at Tail" })
    ).toBeInTheDocument();
  });

  it("should update state when pushing a new element", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText("Enter a number");
    const pushButton = screen.getByRole("button", { name: "Insert at Head" });

    await user.type(input, "5");
    await user.click(pushButton);

    expect(screen.getByTestId("size")).toHaveTextContent("1");
  });
});
