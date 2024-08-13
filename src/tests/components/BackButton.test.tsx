import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("BackButton", () => {
  it("should navigate back when user clicks component", async () => {
    // arrange
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <Router>
        <BackButton />
      </Router>
    );
    const button = screen.getByRole("button");

    // act
    const user = userEvent.setup();
    await user.click(button);

    // assert
    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("..");
  });
});
