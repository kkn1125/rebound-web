import type React from "react";
import { Stack } from "@mui/material";
import CTButton from "../atom/CTButton";
import { Link } from "react-router-dom";

type CallToActionProps = {};
const CallToAction: React.FC<CallToActionProps> = () => {
  return (
    <Stack direction="row" gap={1}>
      {/* <CTButton rounded color="dark" variant="text" component={Link} to="/login">
        로그인
      </CTButton> */}
      <CTButton
        rounded
        color="dark"
        variant="outlined"
        component={Link}
        to="/signup"
      >
        시작하기
      </CTButton>
    </Stack>
  );
};

export default CallToAction;
