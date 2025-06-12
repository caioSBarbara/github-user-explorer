import { screen, fireEvent, waitFor } from "@testing-library/react";
import RepositoryList from "./RepositoryList";
import { GitHubRepository } from "../../types/github";
import { render } from "@/utils/test-utils";

const mockSetSortOptions = jest.fn();
jest.mock("@/hooks", () => ({
  useApp: () => ({
    setSortOptions: mockSetSortOptions,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../utils/formatDate/formatDate", () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
}));

const mockRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: "awesome-project",
    full_name: "testuser/awesome-project",
    description: "An awesome project description",
    html_url: "https://github.com/testuser/awesome-project",
    clone_url: "https://github.com/testuser/awesome-project.git",
    language: "TypeScript",
    stargazers_count: 150,
    watchers_count: 75,
    forks_count: 25,
    open_issues_count: 5,
    size: 2048,
    default_branch: "main",
    private: false,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    owner: {
      login: "testuser",
      avatar_url: "https://example.com/avatar.jpg",
    },
  },
  {
    id: 2,
    name: "simple-app",
    full_name: "testuser/simple-app",
    description: "A simple application",
    html_url: "https://github.com/testuser/simple-app",
    clone_url: "https://github.com/testuser/simple-app.git",
    language: "JavaScript",
    stargazers_count: 50,
    watchers_count: 25,
    forks_count: 10,
    open_issues_count: 2,
    size: 1024,
    default_branch: "main",
    private: false,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
    license: null,
    owner: {
      login: "testuser",
      avatar_url: "https://example.com/avatar.jpg",
    },
  },
  {
    id: 3,
    name: "library-utils",
    full_name: "testuser/library-utils",
    description: null,
    html_url: "https://github.com/testuser/library-utils",
    clone_url: "https://github.com/testuser/library-utils.git",
    language: null,
    stargazers_count: 10,
    watchers_count: 5,
    forks_count: 3,
    open_issues_count: 1,
    size: 512,
    default_branch: "main",
    private: false,
    created_at: "2023-12-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    license: null,
    owner: {
      login: "testuser",
      avatar_url: "https://example.com/avatar.jpg",
    },
  },
];

describe("RepositoryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render repository list with correct count", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      expect(screen.getByText("Repositórios (3)")).toBeInTheDocument();
    });

    it("should render all repositories", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      expect(screen.getByText("awesome-project")).toBeInTheDocument();
      expect(screen.getByText("simple-app")).toBeInTheDocument();
      expect(screen.getByText("library-utils")).toBeInTheDocument();
    });

    it("should render repository descriptions when available", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      expect(
        screen.getByText("An awesome project description")
      ).toBeInTheDocument();
      expect(screen.getByText("A simple application")).toBeInTheDocument();
    });

    it("should render repository stats", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      expect(screen.getByText("⭐ 150")).toBeInTheDocument();
      expect(screen.getByText("🍴 25")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });

    it("should render formatted update dates", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      expect(
        screen.getByText("Atualizado em Formatted: 2024-01-15T00:00:00Z")
      ).toBeInTheDocument();
    });

    it("should show empty state when no repositories", () => {
      render(<RepositoryList repositories={[]} username="testuser" />);

      expect(screen.getByText("Repositórios")).toBeInTheDocument();
      expect(
        screen.getByText("Nenhum repositório público encontrado.")
      ).toBeInTheDocument();
    });
  });

  describe("Sorting", () => {
    it("should render sort controls", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const sortBySelect = screen.getByDisplayValue("Estrelas");
      const sortOrderSelect = screen.getByDisplayValue("Decrescente");

      expect(sortBySelect).toBeInTheDocument();
      expect(sortOrderSelect).toBeInTheDocument();
    });

    it("should change sort criteria when select is changed", async () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const sortBySelect = screen.getByDisplayValue("Estrelas");
      fireEvent.change(sortBySelect, { target: { value: "name" } });

      await waitFor(() => {
        expect(mockSetSortOptions).toHaveBeenCalledWith("name", "desc");
      });
    });

    it("should change sort order when select is changed", async () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const sortOrderSelect = screen.getByDisplayValue("Decrescente");
      fireEvent.change(sortOrderSelect, { target: { value: "asc" } });

      await waitFor(() => {
        expect(mockSetSortOptions).toHaveBeenCalledWith("stars", "asc");
      });
    });
  });

  describe("Navigation", () => {
    it("should navigate to repository details when clicked", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const awesomeProjectCard = screen
        .getByText("awesome-project")
        .closest("div");
      fireEvent.click(awesomeProjectCard!);

      expect(mockNavigate).toHaveBeenCalledWith(
        "/user/testuser/awesome-project"
      );
    });
  });

  describe("Conditional rendering", () => {
    it("should not render language when not available", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const libraryUtilsCard = screen.getByText("library-utils").closest("div");
      expect(libraryUtilsCard).not.toHaveTextContent("TypeScript");
      expect(libraryUtilsCard).not.toHaveTextContent("JavaScript");
    });

    it("should not render description when not available", () => {
      render(
        <RepositoryList repositories={mockRepositories} username="testuser" />
      );

      const libraryUtilsCard = screen.getByText("library-utils").closest("div");
      expect(libraryUtilsCard).toHaveTextContent("library-utils");
      expect(libraryUtilsCard).not.toHaveTextContent(
        "An awesome project description"
      );
    });
  });
});
