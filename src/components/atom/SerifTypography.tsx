import { styled, TypeText, Typography, TypographyProps } from "@mui/material";

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
})<TypographyProps & CustomProps>(({ italic = false }) => {
  return {
    fontFamily: "'Playfair Display', 'Nanum Myeongjo', serif",
    fontStyle: italic ? "oblique 45deg" : "normal",
  };
});
