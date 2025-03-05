export declare global {
  type ThemeMode = "light" | "dark";
}

declare module "@mui/material/styles" {
  interface Palette {
    dark: Palette["primary"];
    white: Palette["primary"];
  }

  interface PaletteOptions {
    dark?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    dark: string;
  }
  interface TypeText {
    white: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true;
    white: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    dark: true;
    white: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsColorOverrides {
    dark: true;
    white: true;
  }
}
