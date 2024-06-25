import React from "react";
import { render, screen } from "@testing-library/react-native";
import { SearchStatusIndicator, SearchStatus } from "./SearchStatusIndicator";
import { View } from "react-native";

describe("SearchStatusIndicator component", () => {
  test("renders states correctly", () => {
    const renderError = () => <View testID="error" />;
    const renderIdle = () => <View testID="idle" />;
    const renderLoading = () => <View testID="loading" />;
    const { rerender } = render(
      <SearchStatusIndicator
        status={SearchStatus.IDLE}
        renderError={renderError}
        renderIdle={renderIdle}
        renderLoading={renderLoading}
      />
    );
    expect(screen.getByTestId("idle")).toBeOnTheScreen();
    expect(screen.queryByTestId("loading")).not.toBeOnTheScreen();
    expect(screen.queryByTestId("error")).not.toBeOnTheScreen();

    rerender(
      <SearchStatusIndicator
        status={SearchStatus.LOADING}
        renderError={renderError}
        renderIdle={renderIdle}
        renderLoading={renderLoading}
      />
    );

    expect(screen.getByTestId("loading")).toBeOnTheScreen();
    expect(screen.queryByTestId("idle")).not.toBeOnTheScreen();
    expect(screen.queryByTestId("error")).not.toBeOnTheScreen();

    rerender(
      <SearchStatusIndicator
        status={SearchStatus.ERROR}
        renderError={renderError}
        renderIdle={renderIdle}
        renderLoading={renderLoading}
      />
    );

    expect(screen.getByTestId("error")).toBeOnTheScreen();
    expect(screen.queryByTestId("loading")).not.toBeOnTheScreen();
    expect(screen.queryByTestId("idle")).not.toBeOnTheScreen();
  });
});
