"use client";

import type React from "react";

import { COVER_IMAGE, ProcessList, ShoesImage } from "@/common/constants";
import { NotoTypography } from "@components/atom/NotoTypography";
import SEOMetaTag from "@components/atom/SEOMetaTag";
import { SerifTypography } from "@components/atom/SerifTypography";
import ThemeAwareIcon from "@components/atom/ThemeAwareIcon";
import InvertedSection from "@components/molecular/InvertedSection";
import ProcessCard from "@components/molecular/ProcessCard";
import ReviewCard from "@components/molecular/ReviewCard";
import StepCard from "@components/molecular/StepCard";
import { useGSAP } from "@gsap/react";
import { Box, Container, Stack, Toolbar, useTheme } from "@mui/material";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import CTButton from "../atom/CTButton";
import SampleImage from "../atom/SampleImage";

gsap.registerPlugin(ScrollToPlugin);

const stepCardList = [
  {
    title: "실패에서 배우는 인사이트",
    content:
      "모든 실패는 의미를 가지며, 그 안에서 인사이트를 발견하고 더 나은 방향을 설계할 수 있습니다.",
  },
  {
    title: "자연스러운 피드백 흐름",
    content:
      "우리는 실패를 공유하고 공감을 주고받으며, 성장의 과정이 자연스럽게 이어지는 환경을 만듭니다.",
  },
  {
    title: "성장을 위한 도구",
    content:
      "우리는 단순한 실패 공유를 넘어, 전문가 피드백과 Time Coin 시스템을 통해 지속적으로 성장할 수 있도록 돕습니다.",
  },
];

const reviewCardList = [
  {
    name: "반나린",
    role: "Corporate Branding Associate, 주식회사 한율",
    content:
      "처음엔 그냥 가볍게 써보자는 생각이었어요. 근데 조각 하나하나 쓰다 보니까 제 감정이 명확히 정리되는 걸 느꼈고, 어느새 제 실패가 저에게 의미 있는 이야기로 바뀌고 있더라고요.",
  },
  {
    name: "라이준",
    role: "Future Accountability Engineer, 우영 게임즈",
    content:
      "실패를 기록하고 공유하는 게 부끄러운 줄 알았는데, 오히려 나와 비슷한 고민을 한 사람들의 이야기를 보면서 위로가 되었어요. 덕분에 나도 조금은 괜찮은 사람이란 생각이 들었죠.",
  },
  {
    name: "황대민",
    role: "Dynamic Program Supervisor, 한국 세린",
    content:
      "리바운드는 감정을 감추지 않아도 되는 공간이에요. 가볍게 한 줄 남기고 나면 그날의 마음을 내려놓은 것처럼 편안해져요. 저에게 꼭 필요한 작은 루틴이 되었어요.",
  },
];

const processList = [
  {
    title: "실패의 조각 기록하기",
    content:
      "Rebound에서는 먼저 실패 경험을 조각으로 기록합니다. 각각의 조각은 하나의 실패 경험과 그때의 감정을 담고 있어, 나중에 완성된 스토리로 조립할 수 있습니다.",
    src: ProcessList[0],
    width: 500,
    height: 250,
    img: {
      width: 500,
      height: 200,
    },
  },
  {
    title: "조각들을 조립하여 스토리 완성",
    content:
      "기록한 조각들을 드래그앤드롭으로 순서를 정하고 연결하여 하나의 완성된 리바운드 스토리를 만듭니다. 각 조각이 모여 더 큰 의미의 성장 이야기가 됩니다.",
    src: ProcessList[1],
    width: 500,
    height: 250,
    img: {
      width: 500,
      height: 200,
    },
  },
  {
    title: "공감과 피드백으로 성장",
    content:
      "완성된 리바운드 스토리를 커뮤니티와 공유하고 공감을 얻을 수 있습니다. 다른 리바운더들의 피드백을 통해 더 깊은 인사이트를 얻고 지속적으로 성장해나갑니다.",
    src: ProcessList[2],
    width: 500,
    height: 250,
    img: {
      width: 500,
      height: 200,
    },
  },
];

interface LandingPageProps {
  title: string;
}
const LandingPage: React.FC<LandingPageProps> = ({ title }) => {
  const svgContainer = useRef<SVGElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  /* on event에 적용 */
  const { contextSafe } = useGSAP({ scope: "html" }); // we can pass in a config object as the 1st parameter to make scoping simple

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.
  const handleScrollDownSmoothly = contextSafe(() => {
    const container = scrollContainer.current;
    gsap.to(window, {
      duration: 1,
      delay: 0,
      scrollTo: container as HTMLDivElement,
      ease: "power2.out",
    });
  });

  useGSAP(
    () => {
      // ✅ safe, created during execution, selector text scoped
      gsap.to(svgContainer.current, { y: 10, repeat: -1, yoyo: true });
    },
    { scope: svgContainer }
  );

  // 다른 페이지에서 메인페이지로 이동했을 때 특정 섹션으로 스크롤
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const targetElement = document.querySelector(sectionId);

      if (targetElement) {
        // 페이지 로드 후 약간의 지연을 두고 스크롤
        setTimeout(() => {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80, // 헤더 높이만큼 오프셋
            },
            ease: "power2.out",
          });
        }, 100);
      }

      // state 정리
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <Stack gap={10}>
      <SEOMetaTag
        title={title}
        description="리바운드는 실패의 순간을 기록하고, 공감과 피드백을 통해 새로운
            가능성을 발견하는 플랫폼입니다. 당신의 이야기가 누군가에게 용기가 될
            수 있습니다."
        keywords="rebound,failgram,실패경험,time-coin"
      />
      <Toolbar sx={{ my: { xs: 0, md: 5 } }} />
      {/* Main Section */}
      <Container
        maxWidth="xl"
        component="section"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: 10,
        }}
      >
        {/* Text */}
        <Stack gap={1} flex={1}>
          <NotoTypography
            variant="subtitle1"
            fontWeight={700}
            color="textCaption"
          >
            실패에서 리바운드하다
          </NotoTypography>
          <SerifTypography variant="h2" fontWeight={900}>
            조각을 모아 완성하는 성장 스토리
          </SerifTypography>
          <NotoTypography variant="h6" maxWidth="80%" color="textDisabled">
            리바운드는 실패의 조각들을 기록하고, 이를 조립하여 완성된 성장
            스토리로 만드는 플랫폼입니다. 당신의 리바운드 여정이 누군가에게
            용기가 될 수 있습니다.
          </NotoTypography>
          <Stack direction="row" gap={1} mt={2}>
            <CTButton
              component={Link}
              to="/signup"
              size="large"
              color="dark"
              variant="contained"
              rounded
              sx={{
                borderRadius: 50,
              }}
            >
              Rebound 시작하기{" "}
              <ThemeAwareIcon size={20} color={"contrast"}>
                <FiArrowRight />
              </ThemeAwareIcon>
            </CTButton>
            <CTButton
              component={Link}
              to="/stories"
              size="large"
              color="dark"
              variant="outlined"
              rounded
              sx={{
                borderRadius: 50,
              }}
            >
              이야기 보기
            </CTButton>
          </Stack>
        </Stack>

        {/* Image */}
        <SampleImage width={500} height={"auto"} src={COVER_IMAGE} />
      </Container>

      {/* Scroll down */}
      <Container maxWidth="xl" component={Stack} alignItems="center" my={2}>
        <CTButton color="dark" onClick={handleScrollDownSmoothly}>
          스크롤하여 탐색
        </CTButton>
        <ThemeAwareIcon ref={svgContainer}>
          <FiArrowDown />
        </ThemeAwareIcon>
      </Container>

      {/* Explain Section */}
      <Container
        id="intro"
        ref={scrollContainer}
        maxWidth="xl"
        component={Stack}
        gap={5}
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.background.paper}`,
        }}
      >
        <Stack alignItems="center" gap={2} py={15}>
          <NotoTypography variant="body1" color="textDisabled">
            우리의 접근 방식
          </NotoTypography>
          <SerifTypography variant="h4" fontWeight={700}>
            실패에서 배우고, 성장으로 나아가다
          </SerifTypography>
          <NotoTypography variant="h6" color="textDisabled">
            우리는 실패의 경험을 공유하고, 이를 통해 배움을 나누며 성장할 수
            있는 기회를 제공합니다.
          </NotoTypography>
        </Stack>

        <Box
          width="100%"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            columnGap: 5,
            rowGap: 5,
          }}
        >
          {stepCardList.map(({ title, content }, index) => (
            <StepCard
              key={index + 1 + title}
              index={index + 1}
              title={title}
              content={content}
            />
          ))}
        </Box>
      </Container>

      {/* Customer Review Section - Theme Aware */}
      <InvertedSection id="failgram">
        <Container maxWidth="xl">
          <Stack gap={5} py={15}>
            <Stack gap={1} alignItems="center">
              <NotoTypography
                variant="body1"
                sx={{
                  color: isDark
                    ? theme.palette.text.disabled
                    : theme.palette.text.caption,
                }}
              >
                이용 후기
              </NotoTypography>
              <SerifTypography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: isDark
                    ? theme.palette.text.primary
                    : theme.palette.dark.contrastText,
                }}
              >
                리바운더들의 이야기
              </SerifTypography>
            </Stack>

            <Box
              gap={5}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
              }}
            >
              {reviewCardList.map(({ name, role, content }, index) => (
                <ReviewCard
                  key={index + name}
                  name={name}
                  role={role}
                  content={content}
                />
              ))}
            </Box>
          </Stack>
        </Container>
      </InvertedSection>

      {/* Process */}
      <Container id="growth" maxWidth="xl" component={Stack} gap={5}>
        <Stack alignItems="center" gap={2} py={15}>
          <NotoTypography variant="body1" color="textDisabled">
            우리의 프로세스
          </NotoTypography>
          <SerifTypography variant="h4" fontWeight={700}>
            실패를 기록하고, 성장의 기회를 만들다
          </SerifTypography>
          <NotoTypography variant="h6" color="textDisabled">
            Rebound를 통해 실패를 공유하고, 피드백을 받아 더 나은 방향으로
            나아가는 과정을 경험해보세요.
          </NotoTypography>
        </Stack>

        <Stack gap={15}>
          {processList.map(({ title, content, src, width, height }, index) => (
            <ProcessCard
              reverse={index % 2 === 0}
              key={index + title}
              step={index + 1}
              title={title}
              content={content}
              src={src}
              width={width}
              height={height}
            />
          ))}
        </Stack>
      </Container>

      {/* Contact - Theme Aware */}
      <InvertedSection id="community">
        <Container maxWidth="xl">
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            gap={10}
            py={15}
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack flex={1} gap={3}>
              <SerifTypography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: isDark
                    ? theme.palette.text.primary
                    : theme.palette.dark.contrastText,
                }}
              >
                실패를 성장으로 바꿀 준비가 되셨나요?
              </SerifTypography>
              <NotoTypography
                variant="h6"
                sx={{
                  color: isDark
                    ? theme.palette.text.disabled
                    : theme.palette.text.caption,
                }}
              >
                이제 당신의 실패 경험을 공유하고, 피드백을 받아 성장해 보세요.
                리바운드와 함께 새로운 시작을 만들어 가세요.
              </NotoTypography>
              <Stack direction="row" gap={2}>
                <CTButton
                  component={Link}
                  to="/signup"
                  rounded
                  color="white"
                  variant="contained"
                  size="large"
                >
                  Rebound 시작하기{" "}
                  <ThemeAwareIcon size={20}>
                    <FiArrowRight />
                  </ThemeAwareIcon>
                </CTButton>
              </Stack>
            </Stack>
            <SampleImage src={ShoesImage} width={500} height={"auto"} />
          </Stack>
        </Container>
      </InvertedSection>
    </Stack>
  );
};

export default LandingPage;
