import { render, screen } from "@testing-library/react";
import Background from "../../components/Background";

describe("Background", () => {
  beforeEach(() => {
    // Mock Math.random to return a consistent value for patternId
    vi.spyOn(Math, "random").mockReturnValue(0.5);
  });

  it("should render with default props", () => {
    render(<Background />);
    const svgElement = screen.getByTestId("background-svg");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement.querySelector("pattern")).toHaveAttribute(
      "id",
      "pattern-50000"
    );
  });

  it("should apply custom props to path element", () => {
    render(<Background color={"#FFFFFF"} stroke={2} />);

    const path = screen.getByTestId("background-path");
    expect(path).toHaveAttribute("stroke", "#FFFFFF");
    expect(path).toHaveAttribute("stroke-width", "2");
  });

  it("should apply custom props to pattern element", () => {
    const transform = { x: 10, y: 20, k: 2 };
    render(<Background gap={10} transform={transform} />);

    const pattern = screen.getByTestId("background-pattern");
    expect(pattern).toHaveAttribute("x", "10");
    expect(pattern).toHaveAttribute("y", "0");
    expect(pattern).toHaveAttribute("width", "20");
    expect(pattern).toHaveAttribute("height", "20");
  });
});
