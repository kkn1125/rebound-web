import { Button, ButtonProps, styled } from "@mui/material";

interface CTButtonProps {
  rounded?: boolean;
  to?: string; // to 추가
}

const CTButton = styled(Button, {
  shouldForwardProp(props) {
    // "rounded"만 필터링, "to"는 Button으로 전달
    return !["rounded"].includes(props as string);
  },
})<ButtonProps & CTButtonProps>(({ rounded = false }) => ({
  borderRadius: rounded ? 9999 : 0,
  textDecoration: "none",
}));

const CTButtonLink = (props: CTButtonProps & ButtonProps) => {
  if (props.to) {
    return <CTButton {...props} />;
  }
  return <CTButton {...props} />;
};

export default CTButtonLink;
