import { render, screen } from "@testing-library/react";
import Heading from "../../components/Heading";
import { DataStructure } from "../../entities";
import { BrowserRouter as Router } from "react-router-dom";

describe("Heading", () => {
  const ds: DataStructure = {
    name: "Dynamic Array",
    description: "Resizable arrays with dynamic capacity.",
    icon: "🪟",
    category: "Arrays/Strings",
    difficulty: "Beginner",
    notesUrl: "",
  };

  it("should render ds prop's name", () => {
    render(
      <Router>
        <Heading ds={ds} />
      </Router>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(/dynamic array/i);
  });
});
