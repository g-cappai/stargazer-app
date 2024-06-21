import { render, screen, userEvent } from "@testing-library/react-native";
import { Input } from "./Input";

describe("Input component", () => {
  it("should render an input element", async () => {
    render(<Input label="inputLabel" />);
    const input = screen.getByLabelText("inputLabel");
    expect(input).toBeDefined();
  });
});
