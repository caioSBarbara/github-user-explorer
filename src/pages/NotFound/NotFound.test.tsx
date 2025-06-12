import { screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { render } from "../../utils/test-utils";

describe("NotFound", () => {
  it("should render 404 page content", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("should render back to home link", () => {
    render(<NotFound />);

    const homeLink = screen.getByRole("link", { name: /voltar.*início/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render descriptive message", () => {
    render(<NotFound />);

    expect(screen.getByText(/página.*não.*encontrada/i)).toBeInTheDocument();
  });
});
