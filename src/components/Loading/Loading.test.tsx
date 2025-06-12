import { screen } from "@testing-library/react";
import Loading from "./Loading";
import { render } from "../../utils/test-utils";

describe("Loading", () => {
  it("should render default loading message", () => {
    render(<Loading />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should render custom message when provided", () => {
    const customMessage = "Carregando dados...";
    render(<Loading message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
