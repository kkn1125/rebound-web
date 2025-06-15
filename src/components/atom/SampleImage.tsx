import { Box, Stack, SxProps, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

interface SampleImageProps {
  width: number | string;
  height: number | string;
  src?: string; // 이미지 src 추가
  alt?: string; // 접근성을 위한 alt 텍스트
  sx?: SxProps;
}

const SampleImage: React.FC<SampleImageProps> = ({
  width = "auto",
  height = "auto",
  src,
  alt = "Sample image",
  sx,
}) => {
  const [updated, setUpdated] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [axis, setAxis] = useState({ x: 0, y: 0 });

  // src가 있으면 실제 이미지 모드, 없으면 샘플 이미지 모드
  const isImageMode = Boolean(src);

  // 샘플 이미지 모드일 때만 크기 계산 (리소스 최적화)
  const currentHeight = useMemo(
    () => (isImageMode ? 0 : boxRef.current?.clientHeight ?? 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updated, isImageMode]
  );

  const currentWidth = useMemo(
    () => (isImageMode ? 0 : boxRef.current?.clientWidth ?? 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updated, isImageMode]
  );

  const boxAngle = useMemo(() => {
    if (isImageMode) return 0; // 이미지 모드에서는 각도 계산 불필요
    return (Math.atan2(currentWidth, currentHeight) * 180) / Math.PI;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated, isImageMode]);

  useEffect(() => {
    function handleResize() {
      // 샘플 이미지 모드일 때만 리사이징 이벤트 처리
      if (!isImageMode) {
        setUpdated((updated) => !updated);
      }
    }

    function handleInteractiveImage(e: MouseEvent) {
      const interactive = boxRef.current?.closest(".interactive");
      if (!interactive) {
        setAxis({ x: 0, y: 0 });
        return;
      }

      const rect = interactive.getBoundingClientRect();
      const { top, left, right, bottom, width, height } = rect;
      const x = e.clientX;
      const y = e.clientY;

      if (top < y && y < bottom && left < x && x < right) {
        const angleX = (360 * (x - left - width / 2)) / width;
        const angleY = (360 * (y - top - height / 2)) / height;
        setAxis({ x: angleX, y: -angleY });
      } else {
        setAxis({ x: 0, y: 0 });
      }
    }

    // 샘플 이미지 모드일 때만 리사이즈 이벤트 리스너 등록
    if (!isImageMode) {
      window.addEventListener("resize", handleResize);
    }

    // 인터렙티브 효과는 이미지 모드에서도 유지
    window.addEventListener("mousemove", handleInteractiveImage);

    return () => {
      if (!isImageMode) {
        window.removeEventListener("resize", handleResize);
      }
      window.removeEventListener("mousemove", handleInteractiveImage);
    };
  }, [isImageMode]);

  return (
    <Stack
      className="interactive"
      borderRadius={3}
      minWidth={{ xs: "auto", md: width }}
      minHeight={{ xs: "auto", md: height }}
      width={width}
      height={height}
      sx={{ perspective: 700 }}
    >
      <Box
        className="interactive-image"
        ref={(instance) => {
          // 샘플 이미지 모드일 때만 updated 상태 변경
          if (!isImageMode) {
            setUpdated((updated) => !updated);
          }
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
        flex={1}
        sx={{
          pointerEvents: "none",
          userSelect: "none",
          aspectRatio: {
            xs:
              (height === "auto" || width === "auto") && height > width
                ? 1 / 1
                : 16 / 9,
            md: 16 / 7,
          },
          background: isImageMode
            ? "transparent"
            : theme.palette.background.paper,
          textShadow: isImageMode
            ? "none"
            : () => {
                const paper = theme.palette.background.paper;
                return `2px 2px 0px ${paper}, -2px -2px 0px ${paper},2px -2px 0px ${paper}, -2px 2px 0px ${paper}, 2px 0px 0px ${paper}, 0px 2px 0px ${paper}, 0px -2px 0px ${paper}, -2px 0px 0px ${paper}`;
              },
          ...sx,
        }}
        style={{
          transition: "scale 150ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          scale: Math.max(axis.x, axis.y) !== 0 ? 0.97 : 1,
          transform: `translate3D(0px, 0px, 0px) rotateX(${
            axis.y / (Math.PI * 10)
          }deg) rotateY(${axis.x / (Math.PI * 10)}deg)`,
          boxShadow:
            (axis.x || axis.y) !== 0
              ? `${-axis.x / 10}px ${axis.y / 10}px 10px -5px #A3A3A376`
              : "none",
        }}
      >
        {/* 이미지 모드일 때 실제 이미지 표시 */}
        {isImageMode ? (
          <Box
            component="img"
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "inherit",
            }}
          />
        ) : (
          <>
            {/* 샘플 이미지 모드일 때만 격자 라인과 카메라 아이콘 표시 */}
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
          </>
        )}
      </Box>
    </Stack>
  );
};

export default SampleImage;
