import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import ProcessCard from "@components/molecular/ProcessCard";
import ReviewCard from "@components/molecular/ReviewCard";
import StepCard from "@components/molecular/StepCard";
import { useGSAP } from "@gsap/react";
import { Box, Container, Stack, Toolbar } from "@mui/material";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef } from "react";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
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

const processList = [
  {
    title: "실패 공유, 배움의 시작",
    content:
      "Rebound에서는 먼저 실패 경험을 기록합니다. 이 과정에서 실수를 정리하고, 배울 점을 발견하며, 이를 통해 성장의 첫걸음을 내딛을 수 있습니다.",
    src: "",
    width: 500,
    height: "auto",
  },
  {
    title: "공감과 피드백",
    content:
      "다른 사용자들과 실패 경험을 공유하고 공감을 얻을 수 있습니다. 또한, 전문가 및 커뮤니티 피드백을 통해 더 나은 방향성을 모색할 수 있습니다.",
    src: "",
    width: 500,
    height: "auto",
  },
  {
    title: "성장과 보상",
    content:
      "Time Coin을 활용하여 추가 피드백을 받거나, 자신의 경험을 바탕으로 더 깊은 인사이트를 얻을 수 있습니다. 실패를 성장으로 전환하는 과정에서 지속적인 동기 부여를 경험하세요.",
    src: "",
    width: 500,
    height: "auto",
  },
];

interface LandingPageProps {}
const LandingPage: React.FC<LandingPageProps> = () => {
  const svgContainer = useRef<SVGElement>(null);
  const scrollContainer = useRef<HTMLDivElement>(null);

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

  return (
    <Stack gap={10}>
      <Toolbar sx={{ my: 5 }} />
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
            실패의 가치를 재발견하다
          </NotoTypography>
          <SerifTypography variant="h2" fontWeight={900}>
            실패를 공유하고, 함께 성장하는 공간
          </SerifTypography>
          <NotoTypography variant="h6" maxWidth="80%" color="textDisabled">
            리바운드는 실패의 순간을 기록하고, 공감과 피드백을 통해 새로운
            가능성을 발견하는 플랫폼입니다. 당신의 이야기가 누군가에게 용기가 될
            수 있습니다.
          </NotoTypography>
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
        <SampleImage width={500} height={"auto"} />
      </Container>

      {/* Scroll down */}
      <Container maxWidth="xl" component={Stack} alignItems="center" my={2}>
        <CTButton color="dark" onClick={handleScrollDownSmoothly}>
          스크롤하여 탐색
        </CTButton>
        <Box component={FiArrowDown} ref={svgContainer} />
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

      {/* Customer Review Section */}
      <Stack
        id="failgram"
        sx={{ background: (theme) => theme.palette.dark.main }}
      >
        <Container maxWidth="xl">
          <Stack gap={5} py={15}>
            <Stack gap={1} alignItems="center">
              <NotoTypography mode="dark" color="textCaption" variant="body1">
                이용 후기
              </NotoTypography>
              <SerifTypography mode="dark" variant="h4" fontWeight={700}>
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
      </Stack>

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

      {/* Contact */}
      <Stack
        id="community"
        sx={{ background: (theme) => theme.palette.dark.main }}
      >
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
              <SerifTypography mode="dark" variant="h4" fontWeight={700}>
                실패를 성장으로 바꿀 준비가 되셨나요?
              </SerifTypography>
              <NotoTypography mode="dark" variant="h6" color="textCaption">
                이제 당신의 실패 경험을 공유하고, 피드백을 받아 성장해 보세요.
                리바운드와 함께 새로운 시작을 만들어 가세요.
              </NotoTypography>
              <Stack direction="row" gap={2}>
                <CTButton
                  rounded
                  color="white"
                  variant="contained"
                  size="large"
                >
                  Rebound 시작하기 <FiArrowRight />
                </CTButton>
              </Stack>
            </Stack>
            <SampleImage width={500} height={"auto"} />
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default LandingPage;
