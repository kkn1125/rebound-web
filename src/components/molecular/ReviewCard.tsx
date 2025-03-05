import { NotoTypography } from "@components/atom/NotoTypography";
import ReviewAuthor from "@components/atom/ReviewAuthor";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Stack } from "@mui/material";

interface ReviewCardProps {
  name: string;
  role: string;
  content: string;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ name, role, content }) => {
  return (
    <Stack
      gap={2}
      p={5}
      sx={{
        background: (theme) => theme.palette.background.dark,
        borderRadius: 3,
      }}
    >
      <SerifTypography mode="dark" fontSize={36}>
        "
      </SerifTypography>
      <NotoTypography mode="dark" fontStyle="italic" fontWeight={200}>
        {content}
      </NotoTypography>
      <ReviewAuthor name={name} role={role} />
    </Stack>
  );
};

export default ReviewCard;
