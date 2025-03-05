import { Avatar, Stack, Typography } from "@mui/material";
import { NotoTypography } from "./NotoTypography";

interface ReviewAuthorProps {
  name: string;
  role: string;
}
const ReviewAuthor: React.FC<ReviewAuthorProps> = ({ name, role }) => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Avatar src={name} />
      <Stack>
        <NotoTypography mode="dark" fontWeight={700}>
          {name}
        </NotoTypography>
        <NotoTypography mode="dark">{role}</NotoTypography>
      </Stack>
    </Stack>
  );
};

export default ReviewAuthor;
