import { SerifTypography } from "@components/atom/SerifTypography";
import LandingCard from "@components/molecular/LandingCard";
import { useGSAP } from "@gsap/react";
import { Box, Container, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import CTButton from "../atom/CTButton";
import SampleImage from "../atom/SampleImage";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ReviewCard from "@components/molecular/ReviewCard";
import { NotoTypography } from "@components/atom/NotoTypography";

gsap.registerPlugin(ScrollToPlugin);

interface LandingCard {
  title: string;
  content: string;
}

const cardList = [
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
      "확정될 정하는 정하는 모든 국제법규는 3년 죄를 침해받지 염려가 범하고.",
  },
  {
    name: "라이준",
    role: "Future Accountability Engineer, 우영 게임즈",
    content:
      "유죄의 시설기준과 예술가의 확정될 아니한다. 장기 경우와 범죄를 거듭 범죄에.",
  },
  {
    name: "황재민",
    role: "Dynamic Program Supervisor, 한국 세린",
    content:
      "진흥하여야 아니한다. 아니한다. 증거인멸의 정하는 기능을 법률로 유죄의 형에 때까지는.",
  },
];

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
  const svgContainer = useRef<SVGElement>(null);

  /* on event에 적용 */
  const { contextSafe } = useGSAP({ scope: "html" }); // we can pass in a config object as the 1st parameter to make scoping simple

  // ✅ wrapped in contextSafe() - animation will be cleaned up correctly
  // selector text is scoped properly to the container.
  const handleScrollDownSmoothly = contextSafe(() => {
    const totalHeight = window.document.documentElement.scrollHeight;
    const scrollheight = totalHeight - window.innerHeight;
    gsap.to(window, {
      duration: 1,
      scrollTo: scrollheight,
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

  return (
    <Stack gap={10} pt={10}>
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
          <Typography variant="subtitle2" fontWeight={700} color="textDisabled">
            실패의 가치를 재발견하다
          </Typography>
          <SerifTypography variant="h3" fontWeight={900}>
            실패를 공유하고, 함께 성장하는 공간
          </SerifTypography>
          <Typography maxWidth="60%">
            리바운드는 실패의 순간을 기록하고, 공감과 피드백을 통해 새로운
            가능성을 발견하는 플랫폼입니다. 당신의 이야기가 누군가에게 용기가 될
            수 있습니다.
          </Typography>
          <Stack direction="row" gap={1} mt={2}>
            <CTButton
              size="large"
              color="dark"
              variant="contained"
              sx={{
                borderRadius: 50,
              }}
            >
              Rebound 시작하기 <FiArrowRight />
            </CTButton>
            <CTButton
              size="large"
              color="dark"
              variant="outlined"
              sx={{
                borderRadius: 50,
              }}
            >
              이야기 보기
            </CTButton>
          </Stack>
        </Stack>

        {/* Image */}
        <SampleImage width={500} height={500} />
      </Container>

      <Container maxWidth="lg" component={Stack} alignItems="center" my={2}>
        <CTButton color="dark" onClick={handleScrollDownSmoothly}>
          스크롤하여 탐색
        </CTButton>
        <Box component={FiArrowDown} ref={svgContainer} />
      </Container>

      <Container maxWidth="lg" component={Stack} gap={5}>
        <Stack alignItems="center" gap={2}>
          <Typography variant="subtitle2" color="textDisabled">
            우리의 접근 방식
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            실패에서 배우고, 성장으로 나아가다
          </Typography>
          <Typography variant="h6" color="textDisabled">
            우리는 실패의 경험을 공유하고, 이를 통해 배움을 나누며 성장할 수
            있는 기회를 제공합니다.
          </Typography>
        </Stack>

        <Box
          width="100%"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", lg: "1fr 1fr 1fr" },
            columnGap: 5,
            rowGap: 5,
          }}
        >
          {cardList.map(({ title, content }, index) => (
            <LandingCard
              key={index + 1 + title}
              index={index + 1}
              title={title}
              content={content}
            />
          ))}
        </Box>
      </Container>

      <Stack sx={{ background: (theme) => theme.palette.dark.main }}>
        <Container maxWidth="lg">
          <Stack gap={5} py={10}>
            <Stack gap={1} alignItems="center">
              <NotoTypography mode="dark" color="caption" variant="subtitle1">
                이용 후기
              </NotoTypography>
              <NotoTypography mode="dark" variant="h4" fontWeight={700}>
                리바운더들의 이야기
              </NotoTypography>
            </Stack>

            <Box
              gap={5}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
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
      </Stack>
    </Stack>
  );
};

export default LandingPage;
