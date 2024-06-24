import React from "react";
import { render, screen } from "@testing-library/react-native";
import { SearchStatusIndicator, SearchStatus } from "./SearchStatusIndicator";

describe("SearchStatusIndicator component", () => {
  test("renders idle state correctly", () => {
    render(<SearchStatusIndicator status={SearchStatus.IDLE} />);
    expect(screen.getByTestId("idleStatus")).toBeOnTheScreen();
  });

  test("renders loading state correctly", () => {
    const { getByText, getByTestId } = render(
      <SearchStatusIndicator status={SearchStatus.LOADING} />
    );
    expect(screen.getByTestId("loadingStatus")).toBeOnTheScreen();
  });

  test("renders error state with default message correctly", () => {
    const { getByText } = render(
      <SearchStatusIndicator status={SearchStatus.ERROR} />
    );
    expect(screen.getByTestId("errorStatus")).toBeOnTheScreen();
  });

  test("renders error state with custom message correctly", () => {
    const customErrorMessage = "Custom error message";
    const { getByText } = render(
      <SearchStatusIndicator
        status={SearchStatus.ERROR}
        errorMessage={customErrorMessage}
      />
    );
    expect(getByText(customErrorMessage)).toBeTruthy();
  });
});
