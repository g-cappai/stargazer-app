import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "./Button";
import { Text } from "react-native";

describe("Button component", () => {
  it("should render a button element", () => {
    render(<Button />);
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

  it("should display the text passed as children", () => {
    const text = "buttonText";
    render(
      <Button>
        <Text>{text}</Text>
      </Button>
    );
    const button = screen.getByText(text);
    expect(button).toBeDefined();
  });
});
