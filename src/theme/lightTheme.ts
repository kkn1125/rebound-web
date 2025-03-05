import { PaletteOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

const lightTheme = {
  background: {
    default: "#F8F5F2",
    paper: "#EAEAEA",
    dark: "#353535",
  },
  primary: {
    main: "#5A67EE",
  },
  secondary: {
    main: "#DC57D0",
    dark: "#518071",
  },
  info: {
    main: "#0094C6",
  },
  success: {
    main: "#008F66",
    dark: "#296668",
  },
  error: {
    main: "#E3263E",
  },
  warning: {
    main: "#FFC55A",
  },
  dark: {
    contrastText: "#FFFFFF",
    main: "#121212",
  },
  white: {
    main: "#FFFFFF",
  },
  text: {
    primary: "#000000",
    secondary: "#565656",
    disabled: "#7E7E7E",
    white: "#FFFFFF",
    caption: "#ACACAC",
  },
  GrayText: "#B1B1B1",
  divider: grey[700],
  contrastThreshold: 3,
  tonalOffset: 0.2,
} as PaletteOptions;

export default lightTheme;
