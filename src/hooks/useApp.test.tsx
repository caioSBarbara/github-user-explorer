import { renderHook } from "@testing-library/react";
import { useApp } from "./useApp";
import { AppProvider } from "../contexts/AppContext";

describe("useApp", () => {
  it("should return the app context when used within AppProvider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    );

    const { result } = renderHook(() => useApp(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.setLoading).toBeDefined();
    expect(result.current.setError).toBeDefined();
    expect(result.current.setUser).toBeDefined();
    expect(result.current.setRepositories).toBeDefined();
    expect(result.current.setSortOptions).toBeDefined();
    expect(result.current.clearUser).toBeDefined();
  });

  it("should throw an error when used outside AppProvider", () => {
    expect(() => {
      renderHook(() => useApp());
    }).toThrow("useApp must be used within an AppProvider");
  });
});
