import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import DynamicArrayPG from "../../../components/DSPlaygrounds/DynamicArrayPG";

describe("DynamicArrayPG", () => {
  const renderComponent = () => {
    render(
      <Router>
        <DynamicArrayPG />
      </Router>
    );
  };

  it("should render initial state correctly", () => {
    renderComponent();

    expect(screen.getByTestId("size")).toHaveTextContent("1");
    expect(screen.getByTestId("capacity")).toHaveTextContent("2");
    expect(screen.getByPlaceholderText("Enter a number")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Push" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pop" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("should update state when pushing a new element", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText("Enter a number");
    const pushButton = screen.getByRole("button", { name: "Push" });

    await user.type(input, "5");
    await user.click(pushButton);

    expect(screen.getByTestId("size")).toHaveTextContent("2");
  });

  it("should reset state when clicking Reset button", async () => {
    const user = userEvent.setup();
    renderComponent();

    const input = screen.getByPlaceholderText("Enter a number");
    const pushButton = screen.getByRole("button", { name: "Push" });
    const resetButton = screen.getByRole("button", { name: "Reset" });

    // First, push a new element
    await user.type(input, "5");
    await user.click(pushButton);

    // Then reset
    await user.click(resetButton);

    expect(screen.getByTestId("size")).toHaveTextContent("1");
    expect(screen.getByTestId("capacity")).toHaveTextContent("2");
  });
});
