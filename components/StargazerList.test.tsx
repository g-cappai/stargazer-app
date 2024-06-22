import { render, screen, waitFor } from "@testing-library/react-native";
import { StargazerList } from "./StargazerList";

describe("StargazersList", () => {
  it("should render list and elements", async () => {
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
});
