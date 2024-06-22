import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SearchForm } from "./SearchForm";

describe("SearchForm component", () => {
  it("should render a search form", () => {
    render(<SearchForm onSubmit={() => {}} />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByLabelText("Search");

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

  it("should show helper text if invalid submission", async () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const searchButton = screen.getByLabelText("Search");
    expect(screen.queryByRole("alert")).not.toBeOnTheScreen();

    fireEvent.press(searchButton);
    await waitFor(() =>
      expect(screen.queryAllByRole("alert")[0]).toBeOnTheScreen()
    );
  });

  it("should submit and cleanup errors after a failed submission when resubmitted with valid values", async () => {
    const handleSubmit = jest.fn();
    render(<SearchForm onSubmit={handleSubmit} />);
    const repositoryOwnerInput = screen.getByLabelText("Repository owner");
    const repositoryNameInput = screen.getByLabelText("Repository name");
    const searchButton = screen.getByLabelText("Search");
    fireEvent.press(searchButton);
    await waitFor(() =>
      expect(screen.queryAllByRole("alert")[0]).toBeOnTheScreen()
    );

    const owner = "facebook";
    const name = "react";

    fireEvent.changeText(repositoryOwnerInput, owner);
    fireEvent.changeText(repositoryNameInput, name);
    fireEvent.press(searchButton);

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeOnTheScreen();
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          repositoryOwner: owner,
          repositoryName: name,
        })
      );
    });
  });
});