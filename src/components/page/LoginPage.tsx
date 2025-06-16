"use client";

import type React from "react";

import { useLogin } from "@/hooks/queries/auth";
import CTButton from "@components/atom/CTButton";
import Logo from "@components/atom/Logo";
import { NotoTypography } from "@components/atom/NotoTypography";
import SEOMetaTag from "@components/atom/SEOMetaTag";
import { SerifTypography } from "@components/atom/SerifTypography";
import {
  Alert,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useAuth } from "@provider/AppStateProvider";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

interface LoginPageProps {
  title: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setAccessToken, setRefreshToken } = useAuth();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tokens = await loginMutation.mutateAsync({ email, password });
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  return (
    <Container
      maxWidth="sm"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Stack gap={4} width="100%">
        <SEOMetaTag
          title={title}
          description="Rebound에 로그인하여 실패를 성장으로 바꾸는 여정을 시작하세요."
          keywords="rebound,login,로그인"
        />

        {/* Header */}
        <Stack alignItems="center" gap={3}>
          <Logo />
          <Stack alignItems="center" gap={1}>
            <SerifTypography variant="h4" fontWeight={700}>
              로그인
            </SerifTypography>
            <NotoTypography
              variant="body1"
              color="textSecondary"
              textAlign="center"
            >
              실패를 성장으로 바꾸는 여정을 계속하세요
            </NotoTypography>
          </Stack>
        </Stack>

        {/* Error Alert */}
        {loginMutation.isError && (
          <Alert severity="error">
            로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
          </Alert>
        )}

        {/* Login Form */}
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 3,
            background: (theme) => theme.palette.background.default,
          }}
        >
          <Stack component="form" onSubmit={handleSubmit} gap={3}>
            <TextField
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <CTButton
              type="submit"
              size="large"
              variant="contained"
              color="dark"
              disabled={!isFormValid || loginMutation.isPending}
              sx={{
                borderRadius: 3,
                py: 1.5,
              }}
            >
              <FiLogIn style={{ marginRight: 8 }} />
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </CTButton>
          </Stack>
        </Paper>

        {/* Sign up link */}
        <Stack alignItems="center" gap={2}>
          <Divider sx={{ width: "100%" }}>
            <NotoTypography variant="body2" color="textDisabled">
              또는
            </NotoTypography>
          </Divider>
          <Stack direction="row" gap={1} alignItems="center">
            <NotoTypography variant="body2" color="textSecondary">
              아직 계정이 없으신가요?
            </NotoTypography>
            <NotoTypography
              component={Link}
              to="/signup"
              variant="body2"
              color="primary"
              sx={{ textDecoration: "none", fontWeight: 600 }}
            >
              회원가입
            </NotoTypography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginPage;
