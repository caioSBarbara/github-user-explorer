import { screen } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import Repository from "./Repository";
import { GitHubRepository } from "../../types/github";
import { AxiosError } from "axios";

const mockParams = {
  username: "testuser",
  repository: "test-repo",
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams,
}));

jest.mock("../../utils/formatDate/formatDate", () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
}));

jest.mock("../../utils/formatSize/formatSize", () => ({
  formatSize: (size: number) => `${size} KB`,
}));

const mockRepository: GitHubRepository = {
  id: 1,
  name: "test-repo",
  full_name: "testuser/test-repo",
  description: "A test repository",
  html_url: "https://github.com/testuser/test-repo",
  clone_url: "https://github.com/testuser/test-repo.git",
  language: "TypeScript",
  stargazers_count: 100,
  watchers_count: 50,
  forks_count: 25,
  open_issues_count: 10,
  size: 1024,
  default_branch: "main",
  private: false,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-02-01T00:00:00Z",
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
};

const mockUseGetRepository = jest.fn();
jest.mock("../../hooks", () => ({
  useGetRepository: (props: any) => mockUseGetRepository(props),
}));

describe("Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetRepository.mockReturnValue({
      repository: mockRepository,
      isLoading: false,
      error: null,
      hasParams: true,
    });
  });

  it("should show loading message when fetching data", () => {
    mockUseGetRepository.mockReturnValue({
      repository: null,
      isLoading: true,
      error: null,
      hasParams: true,
    });

    render(<Repository />);

    expect(
      screen.getByText("Carregando detalhes do repositório...")
    ).toBeInTheDocument();
  });

  it("should show default error message when error has no message", () => {
    mockUseGetRepository.mockReturnValue({
      repository: null,
      isLoading: false,
      error: new AxiosError(),
      hasParams: true,
    });

    render(<Repository />);

    expect(
      screen.getByText("Erro ao carregar repositório")
    ).toBeInTheDocument();
  });

  it("should return null when no params are provided", () => {
    mockUseGetRepository.mockReturnValue({
      repository: null,
      isLoading: false,
      error: null,
      hasParams: false,
    });

    const { container } = render(<Repository />);
    expect(container.firstChild).toBeNull();
  });

  it("should render repository information correctly", () => {
    render(<Repository />);

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
    expect(screen.getByText("← Voltar para o perfil")).toBeInTheDocument();
    expect(
      screen.getByText("← Voltar para o perfil").closest("a")
    ).toHaveAttribute("href", "/user/testuser");
    expect(screen.getByText("🔗 Ver no GitHub")).toBeInTheDocument();
    expect(screen.getByText("🔗 Ver no GitHub").closest("a")).toHaveAttribute(
      "href",
      "https://github.com/testuser/test-repo"
    );
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Estrelas")).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("Watchers")).toBeInTheDocument();
    expect(screen.getByText("Issues")).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByText("Criado em")).toBeInTheDocument();
    expect(
      screen.getByText("Formatted: 2024-01-01T00:00:00Z")
    ).toBeInTheDocument();
    expect(screen.getByText("Última atualização")).toBeInTheDocument();
    expect(
      screen.getByText("Formatted: 2024-02-01T00:00:00Z")
    ).toBeInTheDocument();
    expect(screen.getByText("1024 KB")).toBeInTheDocument();
    expect(screen.getByText("main")).toBeInTheDocument();
    expect(screen.getByText("MIT License")).toBeInTheDocument();
    expect(screen.getByText("Público")).toBeInTheDocument();
  });

  it("should handle private repositories", () => {
    const privateRepo: GitHubRepository = {
      ...mockRepository,
      private: true,
    };

    mockUseGetRepository.mockReturnValue({
      repository: privateRepo,
      isLoading: false,
      error: null,
      hasParams: true,
    });

    render(<Repository />);

    expect(screen.getByText("Privado")).toBeInTheDocument();
  });
});
