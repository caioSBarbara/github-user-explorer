import { screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";
import { render } from "../../utils/test-utils";

describe("ErrorMessage", () => {
  const defaultProps = {
    message: "Erro de teste",
    subtitle: "Subtítulo de teste",
  };

  it("should render error message and subtitle", () => {
    render(<ErrorMessage {...defaultProps} />);

    expect(screen.getByText("Erro de teste")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo de teste")).toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const onRetry = jest.fn();
    render(<ErrorMessage {...defaultProps} onRetry={onRetry} />);

    const retryButton = screen.getByText("Tentar novamente");
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage {...defaultProps} />);

    expect(screen.queryByText("Tentar novamente")).not.toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(<ErrorMessage {...defaultProps} icon="/test-icon.png" />);

    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/test-icon.png");
  });

  it("should render without subtitle when not provided", () => {
    render(<ErrorMessage message="Apenas mensagem" />);

    expect(screen.getByText("Apenas mensagem")).toBeInTheDocument();
    expect(screen.queryByText("Subtítulo de teste")).not.toBeInTheDocument();
  });
});
