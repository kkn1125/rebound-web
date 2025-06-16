import { Button, ButtonProps, Theme } from "@mui/material";

interface CTButtonProps {
  rounded?: boolean;
  to?: string; // to 추가
}

const CTButton = (props: ButtonProps & CTButtonProps) => {
  const { rounded = false, to, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={(theme: Theme) => ({
        borderRadius: rounded ? 9999 : 0,
        textDecoration: "none",
        color:
          rest.variant === "contained"
            ? theme.palette.getContrastText(
                rest.color === "white"
                  ? theme.palette.text.white
                  : theme.palette.text.primary
              )
            : "inherit",
      })}
    />
  );
};

const CTButtonLink = (props: CTButtonProps & ButtonProps) => {
  if (props.to) {
    return <CTButton {...props} />;
  }
  return <CTButton {...props} />;
};

export default CTButtonLink;
