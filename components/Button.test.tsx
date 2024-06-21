import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button component", () => {
  it("should render a button element", () => {
    render(<Button />);
    screen.debug();
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });

  it("should call the onPress function when the button is pressed", () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress} />);
    const button = screen.getByRole("button");
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
