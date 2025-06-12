import { Theme } from "../types/theme";

export const theme: Theme = {
  colors: {
    primary: "#0366d6",
    primaryHover: "#0256cc",
    secondary: "#6f42c1",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",

    background: "#ffffff",
    backgroundSecondary: "#f8f9fa",

    text: "#24292e",
    textSecondary: "#586069",
    textMuted: "#6a737d",

    border: "#e1e4e8",
    borderHover: "#d1d5da",

    gray: {
      50: "#fafbfc",
      100: "#f6f8fa",
      200: "#e1e4e8",
      300: "#d1d5da",
      400: "#babbbd",
      500: "#959da5",
      600: "#6a737d",
      700: "#586069",
      800: "#444d56",
      900: "#2f363d",
    },

    github: {
      blue: "#0366d6",
      green: "#28a745",
      purple: "#6f42c1",
      orange: "#f66a0a",
      red: "#d73a49",
    },
  },

  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1200px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    xxxl: "32px",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  borderRadius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
  },

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  },

  transitions: {
    fast: "0.15s ease-in-out",
    normal: "0.25s ease-in-out",
    slow: "0.35s ease-in-out",
  },
};
