import { Link, TypeText, Typography, TypographyProps } from "@mui/material";

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

export const NotoTypography = (
  props: TypographyProps & CustomProps & { to?: string }
) => {
  const { italic = false, to, ...restProp } = props ?? {};

  if (to) {
    return (
      <Typography
        component={Link}
        to={to}
        {...restProp}
        fontFamily="'Noto Sans', sans-serif"
        fontStyle={italic ? "oblique 45deg" : "normal"}
      />
    );
  }

  return (
    <Typography
      {...restProp}
      fontFamily="'Noto Sans', sans-serif"
      fontStyle={italic ? "oblique 45deg" : "normal"}
    />
  );
};
