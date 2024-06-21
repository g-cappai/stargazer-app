import { render, screen } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button component", () => {
  it("should render a button element", () => {
    render(<Button />);
    screen.debug();
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });
});
