import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import HashTablePG from "../../../components/DSPlaygrounds/HashTablePG";

describe("HashTablePG", () => {
  const renderComponent = () => {
    render(
      <Router>
        <HashTablePG />
      </Router>
    );
  };

  it("should render initial state correctly", () => {
    renderComponent();

    const setButton = screen.getByText(/Set/);
    const buckets = within(screen.getByTestId("buckets")).getAllByTestId(
      /^bucket-/i
    );

    expect(setButton).toHaveTextContent("Set (Hash: ?)");
    expect(buckets).toHaveLength(4);

    buckets.forEach((bucket, index) => {
      expect(bucket.firstElementChild).toHaveTextContent(`${index}`);
    });
  });

  it('should set key-value pair correctly when user clicks "Set" button with valid input', async () => {
    // arrange
    renderComponent();
    const keyInput = screen.getByTestId("set-key-input");
    const valueInput = screen.getByTestId("set-value-input");
    const setButton = screen.getByText(/Set/);
    const user = userEvent.setup();

    // act
    await user.type(keyInput, "0");
    await user.type(valueInput, "0");
    await user.click(setButton);

    // assert
    const sizeLabel = screen.getByTestId("size");
    expect(sizeLabel).toHaveTextContent("1");

    const firstBucketNodes = screen.getAllByTestId(`bucket-0-node`);
    expect(firstBucketNodes).toHaveLength(1);

    const firstBucket = firstBucketNodes[0];
    expect(firstBucket).toHaveTextContent("0:0");
  });
});
