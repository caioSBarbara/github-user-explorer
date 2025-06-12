import { screen } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import UserInfo from "./UserInfo";
import { GitHubUser } from "../../types/github";

jest.mock("@/utils/formatDate/formatDate", () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
}));

const mockUserComplete: GitHubUser = {
  id: 1,
  login: "octocat",
  name: "The Octocat",
  avatar_url: "https://github.com/images/error/octocat_happy.gif",
  bio: "A great-looking octopus who loves to code",
  email: "octocat@github.com",
  location: "San Francisco",
  blog: "https://github.blog",
  followers: 1000,
  following: 500,
  public_repos: 150,
  created_at: "2011-01-25T18:44:36Z",
  updated_at: "2021-01-25T18:44:36Z",
  html_url: "https://github.com/octocat",
};

describe("UserInfo", () => {
  it("should render all user information when all fields are present", () => {
    render(<UserInfo user={mockUserComplete} />);
    expect(screen.getByAltText("octocat avatar")).toBeInTheDocument();
    expect(screen.getByAltText("octocat avatar")).toHaveAttribute(
      "src",
      mockUserComplete.avatar_url
    );
    expect(screen.getByText("The Octocat")).toBeInTheDocument();
    expect(screen.getByText("@octocat")).toBeInTheDocument();
    expect(
      screen.getByText("A great-looking octopus who loves to code")
    ).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("Seguidores")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Seguindo")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Repositórios")).toBeInTheDocument();
    expect(screen.getByText("📧 octocat@github.com")).toBeInTheDocument();
    expect(screen.getByText("📍 San Francisco")).toBeInTheDocument();
    expect(screen.getByText("🌐")).toBeInTheDocument();
    expect(screen.getByText("https://github.blog")).toBeInTheDocument();
    expect(
      screen.getByText("📅 Membro desde Formatted: 2011-01-25T18:44:36Z")
    ).toBeInTheDocument();
  });
});
