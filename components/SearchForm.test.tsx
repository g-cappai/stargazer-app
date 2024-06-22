import { render, screen } from "@testing-library/react-native";
import { SearchForm } from "./SearchForm";

describe("SearchForm component", () => {
  it("should render a search form", () => {
    render(<SearchForm />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByLabelText("Search");

    expect(repositoryOwnerInput).toBeDefined();
    expect(repositoryNameInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });
});
