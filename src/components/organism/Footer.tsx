import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Box, Container, Stack, SvgIcon } from "@mui/material";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";

interface FooterProps {}
const Footer: React.FC<FooterProps> = () => {
  return (
    <Stack gap={5} my={10}>
      <Container maxWidth="xl">
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: 5,
          }}
        >
          <Stack gap={3}>
            <SerifTypography variant="h6">REBOUND</SerifTypography>
            <NotoTypography color="textDisabled">
              세련미와 기능성이 조화를 이루는 디지털 경험을 만들어 브랜드를
              새로운 차원으로 끌어올리세요.
            </NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>Navigation</SerifTypography>
            <NotoTypography color="textDisabled">Home</NotoTypography>
            <NotoTypography color="textDisabled">Intro</NotoTypography>
            <NotoTypography color="textDisabled">Failgram</NotoTypography>
            <NotoTypography color="textDisabled">Community</NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>Legal</SerifTypography>
            <NotoTypography color="textDisabled">Privacy Policy</NotoTypography>
            <NotoTypography color="textDisabled">
              Terms of Service
            </NotoTypography>
            <NotoTypography color="textDisabled">Cookie Policy</NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>Connect</SerifTypography>
            <Stack direction="row" gap={2}>
              <SvgIcon
                fontSize="medium"
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                <FaInstagram />
              </SvgIcon>
              <SvgIcon
                fontSize="medium"
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                <FaXTwitter />
              </SvgIcon>
              <SvgIcon
                fontSize="medium"
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                <FaFacebookF />
              </SvgIcon>
              <SvgIcon
                fontSize="medium"
                sx={{ color: (theme) => theme.palette.text.disabled }}
              >
                <FaLinkedinIn />
              </SvgIcon>
            </Stack>
          </Stack>
        </Box>
      </Container>
      <Stack
        pt={5}
        alignItems="center"
        justifyContent="center"
        borderTop={(theme) => `1px solid ${theme.palette.background.paper}`}
      >
        <NotoTypography color="textDisabled">
          &copy; 2025 Rebound. ALl rights reserved.
        </NotoTypography>
      </Stack>
    </Stack>
  );
};

export default Footer;
