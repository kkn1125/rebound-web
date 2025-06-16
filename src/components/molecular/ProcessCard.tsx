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
  img?: {
    width: number;
    height: number;
  };
}
const ProcessCard: React.FC<ProcessCardProps> = ({
  reverse = false,
  step,
  title,
  content,
  src,
  width,
  height,
  img,
}) => {
  return (
    <Stack
      direction={{
        xs: reverse ? "column" : "column",
        md: reverse ? "row-reverse" : "row",
      }}
      gap={10}
      justifyContent="space-between"
      alignItems={{ xs: "auto", md: "center" }}
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
      {/* {src && (
        <Box
          flex={1}
          component="img"
          src={src}
          alt={title}
          width={img?.width ?? width ?? 500}
          height={img?.height ?? height ?? "auto"}
        />
      )} */}
      {/* {!src && ( */}
        <SampleImage
          src={src}
          width={img?.width ?? width ?? 500}
          height={img?.height ?? height ?? "auto"}
        />
      {/* // )} */}
    </Stack>
  );
};

export default ProcessCard;
