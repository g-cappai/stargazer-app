import { render, screen, fireEvent } from "@testing-library/react-native";
import { Input } from "./Input";

describe("Input component", () => {
  it("should render an input element", () => {
    render(<Input label="inputLabel" />);
    const input = screen.getByLabelText("inputLabel");
    expect(input).toBeOnTheScreen();
  });

  it("should render an helper text if there's an error", () => {
    const { rerender } = render(<Input label="inputLabel" />);
    const helperText = screen.queryByRole("alert");
    expect(helperText).toBeNull();

    rerender(<Input label="inputLabel" errorMessage="error" />);
    const errorText = screen.queryByRole("alert");
    expect(errorText).toHaveTextContent("error");
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
