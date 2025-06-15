import type { PaletteOptions } from "@mui/material";

const darkTheme = {
  background: {
    default: "#0F1419", // 더 부드러운 다크 블루
    paper: "#1A1F2E", // 약간 밝은 다크 블루
    dark: "#FFFFFF",
    white: "#0F1419",
  },
  primary: {
    main: "#4F8EF7", // 더 밝고 선명한 블루
  },
  secondary: {
    main: "#8B9DC3", // 부드러운 라이트 블루
    dark: "#5A6B8C", // 다크 블루
  },
  info: {
    main: "#64B5F6", // 스카이 블루
  },
  success: {
    main: "#4CAF50", // 그린
  },
  error: {
    main: "#FF6B6B", // 부드러운 레드
  },
  warning: {
    main: "#FFB74D", // 부드러운 오렌지
  },
  dark: {
    contrastText: "#0F1419",
    main: "#FFFFFF",
  },
  white: {
    main: "#FFFFFF", // 화이트
  },
  text: {
    primary: "#E8EAED", // 부드러운 화이트
    secondary: "#BDC1C6", // 중간 그레이
    disabled: "#9AA0A6", // 연한 그레이
    white: "#0F1419",
    caption: "#80868B", // 캡션용 그레이
  },
  GrayText: "#9AA0A6", // 미디엄 그레이
  divider: "#3C4043", // 다크 그레이
  contrastThreshold: 3,
  tonalOffset: 0.2,
} as PaletteOptions;

export default darkTheme;
