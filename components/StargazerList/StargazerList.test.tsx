import { render, screen } from "@testing-library/react-native";
import { StargazerList } from "./StargazerList";

describe("StargazersList component", () => {
  it("should render list and elements", () => {
    render(
      <StargazerList
        stargazers={[
          { id: 1, avatarUrl: "", name: "User1" },
          { id: 2, avatarUrl: "", name: "User2" },
        ]}
      />
    );
    const list = screen.getByLabelText("Stargazers list");
    () => expect(list).toBeOnTheScreen();

    const listItems = screen.getAllByTestId("stargazersListItem");
    expect(listItems).toHaveLength(2);
  });

  it("should render empty state if no stargazers", () => {
    render(<StargazerList stargazers={[]} />);
    const listItems = screen.queryAllByTestId("stargazersListItem");
    const emptyList = screen.getByLabelText("No stargazers found");
    expect(listItems).toHaveLength(0);
    expect(emptyList).toBeOnTheScreen();
  });

  it("should display a loading state if is loading more stargazers", () => {
    const { rerender } = render(
      <StargazerList
        stargazers={[
          { id: 1, avatarUrl: "", name: "User1" },
          { id: 2, avatarUrl: "", name: "User2" },
        ]}
        isLoadingMore={false}
      />
    );
    expect(screen.queryByLabelText("Loading more")).not.toBeOnTheScreen();

    rerender(
      <StargazerList
        stargazers={[
          { id: 1, avatarUrl: "", name: "User1" },
          { id: 2, avatarUrl: "", name: "User2" },
        ]}
        isLoadingMore={true}
      />
    );
    expect(screen.queryByLabelText("Loading more")).toBeOnTheScreen();
  });
});
