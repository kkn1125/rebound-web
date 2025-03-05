import { styled, TypeText, Typography, TypographyProps } from "@mui/material";
import darkTheme from "@theme/darkTheme";
import lightTheme from "@theme/lightTheme";

type CustomProps = {
  mode?: "light" | "dark";
  italic?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | `text${Capitalize<keyof TypeText>}`;
};

export const SerifTypography = styled(Typography, {
  shouldForwardProp(props) {
    return !["mode", "color", "italic"].includes(props as string);
  },
})<TypographyProps & CustomProps>(
  ({ mode = "light", color = "", italic = false }) => {
    const isDark = mode === "dark";
    const currentTheme = isDark ? darkTheme : lightTheme;
    const replaceText = color
      .replace("text", "")
      .toLowerCase() as keyof TypeText;
    return {
      fontFamily: "'Playfair Display', 'Nanum Myeongjo', serif",
      color: currentTheme.text?.[replaceText] || currentTheme.text?.primary,
      fontStyle: italic ? "oblique 45deg" : "normal",
    };
  }
);
