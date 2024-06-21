import { render, screen } from "@testing-library/react-native";
import { Input } from "./Input";

describe("Input component", () => {
  it("should render an input element", async () => {
    render(<Input label="inputLabel" />);
    const input = screen.getByLabelText("inputLabel");
    expect(input).toBeDefined();
  });

  it("should render an helper text if there's an error", async () => {
    const { rerender } = render(<Input label="inputLabel" />);
    const helperText = screen.queryByRole("alert");
    expect(helperText).toBeNull();

    rerender(<Input label="inputLabel" errorMessage="error" />);
    const errorText = screen.queryByRole("alert");
    expect(errorText).toHaveTextContent("error");
  });
});
