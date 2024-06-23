import { render, screen, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";
import { Colors } from "@/constants/Colors";

describe("Input component", () => {
  it("should render an input element", () => {
    render(<Input label="inputLabel" />);
    const input = screen.getByLabelText("inputLabel");
    expect(input).toBeOnTheScreen();
  });

  it("should show a red border if there's an error", () => {
    const { rerender } = render(<Input label="inputLabel" />);
    expect(screen.queryByLabelText("inputLabel")).toHaveStyle({
      borderColor: Colors.border,
    });

    rerender(<Input label="inputLabel" error={true} />);
    expect(screen.queryByLabelText("inputLabel")).toHaveStyle({
      borderColor: Colors.alert,
    });
  });

  it("should display text passed as value", () => {
    const text = "userInput";
    render(<Input label="inputLabel" value={text} />);
    const input = screen.getByDisplayValue(text);
    expect(input).toBeOnTheScreen();
  });

  it("should update the value when the user types", () => {
    const changeHandler = jest.fn();
    const text = "userInput";
    render(<Input label="inputLabel" onChange={changeHandler} />);
    const input = screen.getByLabelText("inputLabel");
    fireEvent.changeText(input, text);
    expect(changeHandler).toHaveBeenCalledWith(text);
  });
});
