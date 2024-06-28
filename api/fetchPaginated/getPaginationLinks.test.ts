import { getPaginationLinks } from "./getPaginationLinks";

describe("getPaginationLinks", () => {
  it("should return an empty object if the linkHeader is null", () => {
    const linkHeader = null;

    const result = getPaginationLinks(linkHeader);

    expect(result).toEqual({});
  });

  it("should return an object with the links", () => {
    const linkHeader = `<https://api.github.com/repositories/10270250/stargazers?page=1>; rel="prev", <https://api.github.com/repositories/10270250/stargazers?page=3>; rel="next", <https://api.github.com/repositories/10270250/stargazers?page=1334>; rel="last", <https://api.github.com/repositories/10270250/stargazers?page=1>; rel="first"`;

    const result = getPaginationLinks(linkHeader);

    expect(result).toEqual({
      first: "https://api.github.com/repositories/10270250/stargazers?page=1",
      last: "https://api.github.com/repositories/10270250/stargazers?page=1334",
      next: "https://api.github.com/repositories/10270250/stargazers?page=3",
      prev: "https://api.github.com/repositories/10270250/stargazers?page=1",
    });
  });
});
