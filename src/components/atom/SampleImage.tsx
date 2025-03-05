import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

interface SampleImageProps {
  width?: number | string;
  height?: number | string;
  sx?: SxProps;
}
const SampleImage: React.FC<SampleImageProps> = ({ width, height, sx }) => {
  const [updated, setUpdated] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const currentHeight = useMemo(
    () => boxRef.current?.clientHeight ?? 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updated]
  );
  const currentWidth = useMemo(
    () => boxRef.current?.clientWidth ?? 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updated]
  );

  const boxAngle = useMemo(() => {
    return (Math.atan2(currentWidth, currentHeight) * 180) / Math.PI;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      minWidth={{ xs: "auto", md: width }}
      minHeight={{ xs: "auto", md: height }}
      textTransform="uppercase"
      color="#C3C3C3"
      overflow="hidden"
      position="relative"
      borderRadius={3}
      boxShadow="0px 0px 50px -10px #A3A3A376"
      flex={1}
      sx={{
        userSelect: "none",
        aspectRatio: {
          xs: 1 / 1,
          md: 16 / 7,
        },
        background: theme.palette.background.paper,
        textShadow: () => {
          const paper = theme.palette.background.paper;
          return `2px 2px 0px ${paper}, -2px -2px 0px ${paper},2px -2px 0px ${paper}, -2px 2px 0px ${paper}, 2px 0px 0px ${paper}, 0px 2px 0px ${paper}, 0px -2px 0px ${paper}, -2px 0px 0px ${paper}`;
        },
        ...sx,
      }}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        height="200%"
        zIndex={0}
        borderLeft="1px solid #56565626"
        sx={{
          transform: `translate(-50%, -50%) rotate(${180 - boxAngle}deg)`,
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        height="200%"
        zIndex={0}
        borderLeft="1px solid #56565626"
        sx={{
          transform: `translate(-50%, -50%) rotate(${boxAngle}deg)`,
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        height="200%"
        zIndex={0}
        borderLeft="1px solid #56565626"
        sx={{
          transform: `translate(-50%, -50%)`,
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        height="200%"
        zIndex={0}
        borderLeft="1px solid #56565626"
        sx={{
          transform: `translate(-50%, -50%) rotate(90deg)`,
        }}
      />
      <Box
        position="absolute"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: `inset 0 0 100px ${
            Math.min(currentHeight, currentWidth) / 5
          }px ${theme.palette.background.paper}`,
          zIndex: 1,
        }}
      />
      <Typography
        position="absolute"
        fontSize={36}
        zIndex={1}
        color="textDisabled"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={100}
        width={80}
        height={80}
        border="5px solid #ffffff"
        sx={{
          backgroundColor: "#E2E2E2",
          boxShadow: "inset 0 0 10px 0 #959595, 0 0 10px 0 #A3A3A3",
        }}
      >
        <FiCamera />
      </Typography>
    </Box>
  );
};

export default SampleImage;
