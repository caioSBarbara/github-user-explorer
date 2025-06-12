export interface Theme {
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderHover: string;
    gray: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    github: {
      blue: string;
      green: string;
      purple: string;
      orange: string;
      red: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semiBold: number;
    bold: number;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}
