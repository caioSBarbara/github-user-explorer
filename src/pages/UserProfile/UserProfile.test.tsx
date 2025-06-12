import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import UserProfile from "./UserProfile";
import { GitHubUser } from "../../types/github";
import useGetUser from "../../hooks/useGetUser";
import useGetUserRepositories from "../../hooks/useGetUserRepositories";
import { AppProvider } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../hooks/useGetUser");
jest.mock("../../hooks/useGetUserRepositories");

const mockUseGetUser = useGetUser as jest.Mock;
const mockUseGetUserRepositories = useGetUserRepositories as jest.Mock;
const mockUsername = useParams as jest.Mock;

const mockUser: GitHubUser = {
  id: 1,
  login: "testuser",
  name: "Test User",
  avatar_url: "https://example.com/avatar.jpg",
  bio: "Test bio",
  public_repos: 10,
  followers: 100,
  following: 50,
  created_at: "2020-01-01",
  updated_at: "2024-01-01",
  html_url: "https://github.com/testuser",
  email: "test@example.com",
  location: "Test City",
  blog: "https://testuser.com",
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<AppProvider>{ui}</AppProvider>);
};

describe("UserProfile", () => {
  beforeEach(() => {
    mockUsername.mockReturnValue({ username: "testuser" });
    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    mockUseGetUserRepositories.mockReturnValue({
      repositories: [],
      isLoading: false,
      error: null,
    });
  });

  it("should show loading state when fetching data", () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithProvider(<UserProfile />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should show error message when user is not found", () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(),
    });

    renderWithProvider(<UserProfile />);
    expect(screen.getByText("Usuário não encontrado")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Hmm... Parece que esse usuário não existe no GitHub. Que tal verificar se o nome está correto ou tentar outro?"
      )
    ).toBeInTheDocument();
  });

  it("should render user information and repository list when data is loaded", () => {
    renderWithProvider(<UserProfile />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
    expect(screen.getByText("Test bio")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText(/📧.*test@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/📍.*Test City/)).toBeInTheDocument();
  });

  it("should return null when no user data is available", () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    const { container } = renderWithProvider(<UserProfile />);
    expect(container.firstChild).toBeNull();
  });

  it("should show loading state when repositories are loading", () => {
    mockUseGetUserRepositories.mockReturnValue({
      repositories: [],
      isLoading: true,
      error: null,
    });

    renderWithProvider(<UserProfile />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should show error message when repositories fail to load", () => {
    mockUsername.mockReturnValue("");
    mockUseGetUserRepositories.mockReturnValue({
      repositories: [],
      isLoading: false,
      error: new Error(),
    });

    renderWithProvider(<UserProfile />);
    const tryAgain = screen.getByText("Tentar novamente");
    expect(tryAgain).toBeInTheDocument();
    fireEvent.click(tryAgain);
    expect(screen.getByText("Usuário não encontrado")).toBeInTheDocument();
  });

  it("should handle case when no repositories are found", () => {
    mockUseGetUserRepositories.mockReturnValue({
      repositories: [],
      isLoading: false,
      error: null,
    });

    renderWithProvider(<UserProfile />);
    expect(
      screen.getByText("Nenhum repositório público encontrado.")
    ).toBeInTheDocument();
  });
});
