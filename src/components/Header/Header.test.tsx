import { screen } from "@testing-library/react";
import Header from "./Header";
import { render } from "../../utils/test-utils";

describe("Header", () => {
  it("should render header with title", () => {
    render(<Header />);

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Explorer")).toBeInTheDocument();
  });

  it("should render home link", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should render header as navigation element", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });
});
