import { styled, Typography, TypographyProps } from "@mui/material";

type CustomProps = {
  mode?: "light" | "dark";
};

export const NotoTypography = styled(Typography, {
  shouldForwardProp(props) {
    return !["mode"].includes(props);
  },
})<TypographyProps & CustomProps>(({ mode = "light", theme }) => ({
  fontFamily: "'Noto Sans', sans-serif",
  color:
    mode === "dark" ? theme.palette.text.white : theme.palette.text.primary,
}));
