import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SearchForm } from "./SearchForm";
import { Colors } from "@/constants/Colors";

describe("SearchForm component", () => {
  it("should render a search form", () => {
    render(<SearchForm onSubmit={() => {}} />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByText("Search");

    expect(repositoryOwnerInput).toBeDefined();
    expect(repositoryNameInput).toBeDefined();
    expect(searchButton).toBeDefined();
  });

  it("should submit form if valid when search button is pressed", async () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByLabelText("Search");

    const owner = "facebook";
    const name = "react";

    fireEvent.changeText(repositoryOwnerInput, owner);
    fireEvent.changeText(repositoryNameInput, name);
    fireEvent.press(searchButton);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          repositoryOwner: owner,
          repositoryName: name,
        })
      )
    );
  });

  it("should not submit form if invalid", async () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const searchButton = screen.getByLabelText("Search");

    fireEvent.press(searchButton);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it("should submit and cleanup errors after a failed submission when resubmitted with valid values", async () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByLabelText("Search");
    fireEvent.press(searchButton);
    await waitFor(() => {
      expect(repositoryOwnerInput).toHaveStyle({ borderColor: Colors.alert });
      expect(repositoryNameInput).toHaveStyle({ borderColor: Colors.alert });
    });

    const owner = "facebook";
    const name = "react";

    fireEvent.changeText(repositoryOwnerInput, owner);
    fireEvent.changeText(repositoryNameInput, name);
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(repositoryOwnerInput).toHaveStyle({ borderColor: Colors.border });
      expect(repositoryNameInput).toHaveStyle({ borderColor: Colors.border });

      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          repositoryOwner: owner,
          repositoryName: name,
        })
      );
    });
  });
});
