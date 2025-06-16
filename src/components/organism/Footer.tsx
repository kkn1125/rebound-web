import type React from "react";
import { NotoTypography } from "@components/atom/NotoTypography";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Box, Container, Stack, SvgIcon } from "@mui/material";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
  { icon: FaXTwitter, url: "https://twitter.com", label: "Twitter" },
  { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
  { icon: FaLinkedinIn, url: "https://linkedin.com", label: "LinkedIn" },
];

type FooterProps = {};
const Footer: React.FC<FooterProps> = () => {
  return (
    <Stack gap={5} my={10}>
      <Container maxWidth="xl">
        <Box
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            columnGap: 5,
            rowGap: 5,
          }}
        >
          <Stack gap={3}>
            <SerifTypography variant="h6">REBOUND</SerifTypography>
            <NotoTypography color="textDisabled">
              실패를 성장으로 바꾸는 플랫폼. 당신의 경험이 누군가에게 용기가 될
              수 있습니다.
            </NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>서비스</SerifTypography>
            <NotoTypography
              component={Link}
              to="/write"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              조각 작성
            </NotoTypography>
            <NotoTypography
              component={Link}
              to="/my-pieces"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              내 조각들
            </NotoTypography>
            <NotoTypography
              component={Link}
              to="/profile"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              프로필
            </NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>지원</SerifTypography>
            <NotoTypography
              component="a"
              to="mailto:support@rebound.com"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              고객지원
            </NotoTypography>
            <NotoTypography
              component="a"
              to="/privacy"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              개인정보처리방침
            </NotoTypography>
            <NotoTypography
              component="a"
              to="/terms"
              color="textDisabled"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              이용약관
            </NotoTypography>
          </Stack>

          <Stack gap={2}>
            <SerifTypography>소셜</SerifTypography>
            <Stack direction="row" gap={2}>
              {socialLinks.map((social) => (
                <SvgIcon
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize="medium"
                  sx={{
                    color: (theme) => theme.palette.text.disabled,
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <social.icon />
                </SvgIcon>
              ))}
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
          &copy; 2025 Rebound. All rights reserved.
        </NotoTypography>
      </Stack>
    </Stack>
  );
};

export default Footer;
