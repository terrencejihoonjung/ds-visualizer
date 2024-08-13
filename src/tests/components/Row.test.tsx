import { render, screen } from "@testing-library/react";
import Row from "../../components/Row";
import { BrowserRouter as Router } from "react-router-dom";
import { DataStructure } from "../../entities";

describe("Row", () => {
  const dataStructure: DataStructure = {
    name: "Dynamic Array",
    description: "Resizable arrays with dynamic capacity.",
    icon: "🪟",
    category: "Arrays/Strings",
    difficulty: "Beginner",
    notesUrl: "",
  };

  it("should render the correct icon, name, description, category, and difficulty", () => {
    render(
      <Router>
        <Row dataStructure={dataStructure} />
      </Router>
    );

    expect(screen.getByText(dataStructure.icon)).toBeInTheDocument();
    expect(screen.getByText(dataStructure.name)).toBeInTheDocument();
    expect(screen.getByText(dataStructure.description)).toBeInTheDocument();
    expect(screen.getByText(dataStructure.category)).toBeInTheDocument();
    expect(screen.getByText(dataStructure.difficulty)).toBeInTheDocument();
  });

  it("should generate the correct link based on the dataStructure name", () => {
    render(
      <Router>
        <Row dataStructure={dataStructure} />
      </Router>
    );

    const link = screen.getByRole("button");
    expect(link).toHaveAttribute("href", "/dynamic-array");
  });
});
