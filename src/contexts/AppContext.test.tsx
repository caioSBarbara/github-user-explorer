import React, { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, AppContext } from "./AppContext";

describe("AppContext", () => {
  const TestComponent = () => {
    const ctx = useContext(AppContext)!;
    return (
      <div>
        <div data-testid="loading">{ctx.loading ? "true" : "false"}</div>
        <div data-testid="error">{ctx.error ?? ""}</div>
        <div data-testid="user">{ctx.currentUser?.login ?? ""}</div>
        <div data-testid="repos">{ctx.repositories.length}</div>
        <div data-testid="sortBy">{ctx.sortBy}</div>
        <div data-testid="sortOrder">{ctx.sortOrder}</div>
        <button onClick={() => ctx.setLoading(true)}>Set Loading</button>
        <button onClick={() => ctx.setError("err")}>Set Error</button>
        <button
          onClick={() =>
            ctx.setUser({
              id: 1,
              login: "octocat",
              name: "Octocat",
              avatar_url: "url",
              bio: "bio",
              email: "octo@cat.com",
              location: "Earth",
              blog: "blog",
              followers: 1,
              following: 2,
              public_repos: 3,
              created_at: "2020-01-01",
              updated_at: "2020-01-01",
              html_url: "url",
            })
          }
        >
          Set User
        </button>
        <button
          onClick={() =>
            ctx.setRepositories([
              {
                id: 1,
                name: "repo",
                full_name: "octocat/repo",
                description: null,
                html_url: "",
                clone_url: "",
                language: null,
                stargazers_count: 0,
                watchers_count: 0,
                forks_count: 0,
                open_issues_count: 0,
                size: 0,
                default_branch: "main",
                private: false,
                created_at: "",
                updated_at: "",
                license: null,
                owner: { login: "octocat", avatar_url: "" },
              },
            ])
          }
        >
          Set Repos
        </button>
        <button onClick={() => ctx.setSortOptions("name", "asc")}>
          Set Sort
        </button>
        <button onClick={() => ctx.clearUser()}>Clear User</button>
      </div>
    );
  };

  it("should provide initial values", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByTestId("loading")).toHaveTextContent("false");
    expect(screen.getByTestId("error")).toHaveTextContent("");
    expect(screen.getByTestId("user")).toHaveTextContent("");
    expect(screen.getByTestId("repos")).toHaveTextContent("0");
    expect(screen.getByTestId("sortBy")).toHaveTextContent("stars");
    expect(screen.getByTestId("sortOrder")).toHaveTextContent("desc");
  });

  it("should update loading state", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await userEvent.click(screen.getByText("Set Loading"));
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("true");
    });
  });

  it("should update error state", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await userEvent.click(screen.getByText("Set Error"));
    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("err");
    });
  });

  it("should update user", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await userEvent.click(screen.getByText("Set User"));
    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("octocat");
    });
  });

  it("should update repositories", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await userEvent.click(screen.getByText("Set Repos"));
    await waitFor(() => {
      expect(screen.getByTestId("repos")).toHaveTextContent("1");
    });
  });

  it("should update sort options", async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    await userEvent.click(screen.getByText("Set Sort"));
    await waitFor(() => {
      expect(screen.getByTestId("sortBy")).toHaveTextContent("name");
      expect(screen.getByTestId("sortOrder")).toHaveTextContent("asc");
    });
  });

  it("should clear user and repositories", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    screen.getByText("Set User").click();
    screen.getByText("Set Repos").click();
    screen.getByText("Clear User").click();
    expect(screen.getByTestId("user")).toHaveTextContent("");
    expect(screen.getByTestId("repos")).toHaveTextContent("0");
    expect(screen.getByTestId("error")).toHaveTextContent("");
  });
});
