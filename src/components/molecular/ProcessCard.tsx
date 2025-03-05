import { NotoTypography } from "@components/atom/NotoTypography";
import SampleImage from "@components/atom/SampleImage";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Box, Chip, Stack } from "@mui/material";

interface ProcessCardProps {
  reverse?: boolean;
  step: number;
  title: string;
  content: string;
  src?: string;
  width?: number | string;
  height?: number | string;
}
const ProcessCard: React.FC<ProcessCardProps> = ({
  reverse = false,
  step,
  title,
  content,
  src,
  width,
  height,
}) => {
  return (
    <Stack
      direction={{
        xs: reverse ? "column-reverse" : "column",
        md: reverse ? "row-reverse" : "row",
      }}
      gap={10}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack flex={1} gap={2}>
        <Box>
          <Chip label={`단계 ${("" + step).padStart(2, "0")}`} />
        </Box>
        <SerifTypography variant="h5" fontWeight={700}>
          {title}
        </SerifTypography>
        <NotoTypography variant="body1" color="textSecondary">
          {content}
        </NotoTypography>
      </Stack>
      {src && (
        <Box
          flex={1}
          component="img"
          src={src}
          alt={title}
          width={width}
          height={height ?? "auto"}
        />
      )}
      {!src && <SampleImage width={width ?? 500} height={height ?? "auto"} />}
    </Stack>
  );
};

export default ProcessCard;
