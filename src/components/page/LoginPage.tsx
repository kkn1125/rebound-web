"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import Logo from "@components/atom/Logo"
import { Container, Stack, TextField, Paper, Divider } from "@mui/material"
import { useState } from "react"
import { FiLogIn } from "react-icons/fi"
import { Link } from "react-router-dom"

interface LoginPageProps {
  title: string
}

const LoginPage: React.FC<LoginPageProps> = ({ title }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login functionality
    console.log({ email, password })
  }

  const isFormValid = email.trim().length > 0 && password.trim().length > 0

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
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
            <NotoTypography variant="body1" color="textSecondary" textAlign="center">
              실패를 성장으로 바꾸는 여정을 계속하세요
            </NotoTypography>
          </Stack>
        </Stack>

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
              disabled={!isFormValid}
              sx={{
                borderRadius: 3,
                py: 1.5,
              }}
            >
              <FiLogIn style={{ marginRight: 8 }} />
              로그인
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
  )
}

export default LoginPage
