import { render, screen } from "@testing-library/react";
import Badge from "../../components/Badge";

describe("Badge", () => {
  it("should display text props within span element", () => {
    render(<Badge text={"test"} />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
