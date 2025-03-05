import { SerifTypography } from "@components/atom/SerifTypography";
import { Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface LandingCardProps {
  index: number;
  title: string;
  content: ReactNode;
}
const LandingCard: React.FC<LandingCardProps> = ({ index, title, content }) => {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      p={5}
      gap={2}
      sx={{
        background: (theme) => theme.palette.background.default,
        borderColor: "#E3E3E3",
        borderRadius: 3,
      }}
    >
      <SerifTypography fontSize={36} fontWeight={200}>
        {("" + index).padStart(2, "0")}
      </SerifTypography>
      <Typography fontSize={24} fontWeight={700}>
        {title}
      </Typography>
      <Typography color="textSecondary" fontWeight={100}>
        {content}
      </Typography>
    </Stack>
  );
};

export default LandingCard;
