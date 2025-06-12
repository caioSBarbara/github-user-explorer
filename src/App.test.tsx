import { screen } from "@testing-library/react";
import { render } from "./utils/test-utils";
import App from "./App";

jest.mock("./components/Header/Header", () => () => <div>Mocked Header</div>);
jest.mock("./pages/Home/Home", () => () => <div>Mocked Home</div>);
jest.mock("./pages/UserProfile/UserProfile", () => () => (
  <div>Mocked UserProfile</div>
));
jest.mock("./pages/Repository/Repository", () => () => (
  <div>Mocked Repository</div>
));
jest.mock("./pages/NotFound/NotFound", () => () => <div>Mocked NotFound</div>);

describe("App", () => {
  it("should render Header and Home on root route", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked Home")).toBeInTheDocument();
  });

  it("should render UserProfile on /user/:username route", () => {
    window.history.pushState({}, "", "/user/testuser");
    render(<App />);
    expect(screen.getByText("Mocked UserProfile")).toBeInTheDocument();
  });

  it("should render Repository on /user/:username/:repository route", () => {
    window.history.pushState({}, "", "/user/testuser/testrepo");
    render(<App />);
    expect(screen.getByText("Mocked Repository")).toBeInTheDocument();
  });

  it("should render NotFound on unknown route", () => {
    window.history.pushState({}, "", "/unknown");
    render(<App />);
    expect(screen.getByText("Mocked NotFound")).toBeInTheDocument();
  });
});
