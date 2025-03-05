import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

interface SampleImageProps {
  width: number;
  height: number;
}
const SampleImage: React.FC<SampleImageProps> = ({ width, height }) => {
  const [updated, setUpdated] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const boxWidth = useMemo(() => {
    const currentHeight =
      updated && boxRef.current ? boxRef.current.clientHeight : height;
    const currentWidth =
      updated && boxRef.current ? boxRef.current.clientWidth : width;
    return (Math.atan2(currentWidth, currentHeight) * 180) / Math.PI;
  }, [updated]);

  useEffect(() => {
    function handleResize() {
      setUpdated((updated) => !updated);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      ref={(instance) => {
        setUpdated((updated) => !updated);
        Object.assign(boxRef, { current: instance });
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: { xs: "auto", lg: width },
        minHeight: height,
        aspectRatio: {
          xs: 1 / 1,
          md: "auto",
        },
        textTransform: "uppercase",
        color: "#c3c3c3",
        overflow: "hidden",
        background: theme.palette.background.paper,
        position: "relative",
        textShadow: () => {
          const paper = theme.palette.background.paper;
          return `2px 2px 0px ${paper}, -2px -2px 0px ${paper},2px -2px 0px ${paper}, -2px 2px 0px ${paper}, 2px 0px 0px ${paper}, 0px 2px 0px ${paper}, 0px -2px 0px ${paper}, -2px 0px 0px ${paper}`;
        },
        ["&:before"]: {
          content: '""',
          transform: `translate(-50%, -50%) rotate(${boxWidth}deg)`,
          height: "200%",
          width: "1px",
          borderLeft: "1px solid #56565626",
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 0,
        },
        ["&:after"]: {
          content: '""',
          transform: `translate(-50%, -50%) rotate(${180 - boxWidth}deg)`,
          height: "200%",
          width: "1px",
          borderLeft: "1px solid #56565626",
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 0,
        },
      }}
    >
      <Typography fontSize={36} sx={{ zIndex: 1 }}>
        sample
      </Typography>
    </Box>
  );
};

export default SampleImage;
