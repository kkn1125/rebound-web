import { Stack } from "@mui/material";
import CTButton from "../atom/CTButton";

interface CallToActionProps {}
const CallToAction: React.FC<CallToActionProps> = () => {
  return (
    <Stack direction="row" gap={1}>
      <CTButton rounded color="dark" variant="text">
        로그인
      </CTButton>
      <CTButton rounded color="dark" variant="outlined">
        시작하기
      </CTButton>
    </Stack>
  );
};

export default CallToAction;
