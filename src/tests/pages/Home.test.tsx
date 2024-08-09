// Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home.tsx";
import dataStructures from "../../data/data-structures.ts";
import { DataStructure } from "../../entities.ts";

vi.mock("../../components/Row", () => {
  return {
    default: ({ dataStructure }: { dataStructure: DataStructure }) => (
      <div data-testid="mocked-row">{dataStructure.name}</div>
    ),
  };
});

describe("Home", () => {
  it("should render correctly when dataStructures is not empty", () => {
    render(<Home />);

    expect(
      screen.getByText(`Count · ${dataStructures.length}`)
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("mocked-row")).toHaveLength(
      dataStructures.length
    );
  });
});
