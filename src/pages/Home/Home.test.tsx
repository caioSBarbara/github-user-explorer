import { screen, fireEvent, waitFor } from "@testing-library/react";
import { render } from "../../utils/test-utils";
import Home from "./Home";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockSetLoading = jest.fn();
const mockSetError = jest.fn();
jest.mock("../../hooks", () => ({
  useApp: () => ({
    setLoading: mockSetLoading,
    setError: mockSetError,
  }),
}));

describe("Home", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the main title and subtitle", () => {
      render(<Home />);

      expect(screen.getByText("GitHub User Explorer")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Descubra perfis incríveis e explore repositórios fascinantes do GitHub de forma simples e intuitiva."
        )
      ).toBeInTheDocument();
    });

    it("should render the GitHub icon", () => {
      render(<Home />);

      const icon = screen.getByAltText("GitHub");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("src", "/github-icon.svg");
    });

    it("should render the search form", () => {
      render(<Home />);

      expect(
        screen.getByPlaceholderText("Digite o nome do usuário do GitHub...")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /buscar/i })
      ).toBeInTheDocument();
    });
  });

  describe("Search Functionality", () => {
    it("should show error when submitting empty username", async () => {
      render(<Home />);

      const form = screen.getByRole("textbox").closest("form")!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSetError).toHaveBeenCalledWith(
          "Por favor, digite um nome de usuário"
        );
      });
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should navigate to user page when submitting valid username", async () => {
      render(<Home />);

      const input = screen.getByPlaceholderText(
        "Digite o nome do usuário do GitHub..."
      );
      fireEvent.change(input, { target: { value: "octocat" } });

      const form = screen.getByRole("textbox").closest("form")!;
      fireEvent.submit(form);

      await waitFor(() => {
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(mockNavigate).toHaveBeenCalledWith("/user/octocat");
      });
    });
  });
});
