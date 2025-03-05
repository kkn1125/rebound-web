import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Paper, Stack } from "@mui/material";
import { ReactNode } from "react";

interface StepCardProps {
  index: number;
  title: string;
  content: ReactNode;
}
const StepCard: React.FC<StepCardProps> = ({ index, title, content }) => {
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
        transition: "border-color 300ms ease",
        ["&:hover"]: {
          borderColor: "#121212",
        },
      }}
    >
      <SerifTypography fontSize={36} fontWeight={200}>
        {("" + index).padStart(2, "0")}
      </SerifTypography>
      <SerifTypography fontSize={24} fontWeight={700}>
        {title}
      </SerifTypography>
      <NotoTypography color="textSecondary" fontWeight={100}>
        {content}
      </NotoTypography>
    </Stack>
  );
};

export default StepCard;
