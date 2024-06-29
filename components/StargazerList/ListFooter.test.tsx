import {
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
import { ListFooter } from "./ListFooter";

describe("StargazerList/ListFooter", () => {
  it("should display a loading state if is loading more stargazers", () => {
    render(<ListFooter isLoading />);

    const loading = screen.getByLabelText("Loading more");

    expect(loading).toBeOnTheScreen();
  });

  it("should display a retry state if loading more failed", () => {
    render(<ListFooter hasError />);

    const retry = screen.getByText("try again", { exact: false });

    expect(retry).toBeOnTheScreen();
  });

  it("should call try again function when retry state is pressed", async () => {
    jest.useFakeTimers();
    const tryAgain = jest.fn();
    render(<ListFooter hasError tryAgain={tryAgain} />);

    const retryButton = screen.getByRole("button");

    const user = userEvent.setup();
    await user.press(retryButton);

    expect(tryAgain).toHaveBeenCalled();
    jest.runAllTimers();
    jest.useRealTimers();
  });

  it("should display loading state if both is loading and loading more has failed", () => {
    render(<ListFooter isLoading hasError />);

    const loading = screen.getByLabelText("Loading more");
    const retry = screen.queryByText("try again", { exact: false });

    expect(loading).toBeOnTheScreen();
    expect(retry).not.toBeOnTheScreen();
  });
});
