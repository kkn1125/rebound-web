import { Button, ButtonProps, styled } from "@mui/material";

interface CTButtonProps {
  rounded?: boolean;
}

const CTButton = styled(Button, {
  shouldForwardProp(props) {
    return !["rounded"].includes(props);
  },
})<ButtonProps & CTButtonProps>(
  ({ rounded = false, theme }) => ({
    borderRadius: rounded ? 9999 : 0,
  })
);

export default CTButton;
