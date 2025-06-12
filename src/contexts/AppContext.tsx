import React, { createContext, useReducer, ReactNode, useMemo } from "react";
import {
  GitHubUser,
  GitHubRepository,
  SortBy,
  SortOrder,
} from "../types/github";

interface AppState {
  currentUser: GitHubUser | null;
  repositories: GitHubRepository[];
  loading: boolean;
  error: string | null;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: GitHubUser }
  | { type: "SET_REPOSITORIES"; payload: GitHubRepository[] }
  | {
      type: "SET_SORT_OPTIONS";
      payload: { sortBy: SortBy; sortOrder: SortOrder };
    }
  | { type: "CLEAR_USER" };

export interface AppContextType extends AppState {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: GitHubUser) => void;
  setRepositories: (repositories: GitHubRepository[]) => void;
  setSortOptions: (sortBy: SortBy, sortOrder: SortOrder) => void;
  clearUser: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  currentUser: null,
  repositories: [],
  loading: false,
  error: null,
  sortBy: "stars",
  sortOrder: "desc",
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: null,
      };

    case "SET_REPOSITORIES":
      return {
        ...state,
        repositories: action.payload,
        loading: false,
        error: null,
      };

    case "SET_SORT_OPTIONS":
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      };

    case "CLEAR_USER":
      return {
        ...state,
        currentUser: null,
        repositories: [],
        error: null,
      };

    default:
      return state;
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const setUser = (user: GitHubUser) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  const setRepositories = (repositories: GitHubRepository[]) => {
    dispatch({ type: "SET_REPOSITORIES", payload: repositories });
  };

  const setSortOptions = (sortBy: SortBy, sortOrder: SortOrder) => {
    dispatch({ type: "SET_SORT_OPTIONS", payload: { sortBy, sortOrder } });
  };

  const clearUser = () => {
    dispatch({ type: "CLEAR_USER" });
  };

  const value: AppContextType = useMemo(
    () => ({
      ...state,
      setLoading,
      setError,
      setUser,
      setRepositories,
      setSortOptions,
      clearUser,
    }),
    [
      state,
      setLoading,
      setError,
      setUser,
      setRepositories,
      setSortOptions,
      clearUser,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
