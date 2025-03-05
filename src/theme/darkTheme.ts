import { PaletteOptions } from "@mui/material";

const darkTheme = {
  background: {
    default: "#0A1929", // 매우 어두운 블루
    paper: "#0D2137", // 딥 블루 계열의 배경색
  },
  primary: {
    main: "#3F51B5", // 딥 블루
  },
  secondary: {
    main: "#7986CB", // 라이트 블루
    dark: "#303F9F", // 다크 블루
  },
  info: {
    main: "#64B5F6", // 스카이 블루
  },
  success: {
    main: "#4CAF50", // 그린
  },
  error: {
    main: "#F44336", // 브라이트 레드
  },
  warning: {
    main: "#FFC107", // 옐로우
  },
  dark: {
    contrastText: "#121212",
    main: "#FFFFFF",
  },
  white: {
    main: "#FFFFFF", // 화이트
  },
  text: {
    primary: "#FFFFFF", // 화이트
    secondary: "#B0BEC5", // 라이트 블루 그레이
    disabled: "#9E9E9E",
    white: "#121212",
  },
  GrayText: "#9E9E9E", // 미디엄 그레이
  divider: "#37474F", // 다크 블루 그레이
  contrastThreshold: 3,
  tonalOffset: 0.2,
} as PaletteOptions;

export default darkTheme;
