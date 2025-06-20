"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import Logo from "@components/atom/Logo"
import { Container, Stack, TextField, Paper, Divider, Alert } from "@mui/material"
import { useState } from "react"
import { FiUserPlus } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUser } from "@/hooks/queries/users"

interface SignupPageProps {
  title: string
}

const SignupPage: React.FC<SignupPageProps> = ({ title }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const navigate = useNavigate()

  const createUserMutation = useCreateUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createUserMutation.mutateAsync({
        email,
        username: nickname, // nickname을 username으로 사용
        nickname,
        password,
        role: 1, // 일반 사용자
      })

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login")
    } catch (error) {
      console.error("Signup failed:", error)
    }
  }

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    nickname.trim().length > 0 &&
    password === confirmPassword

  const passwordsMatch = password === confirmPassword

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}>
      <Stack gap={4} width="100%">
        <SEOMetaTag
          title={title}
          description="Rebound에 가입하여 실패를 성장으로 바꾸는 커뮤니티에 참여하세요."
          keywords="rebound,signup,회원가입"
        />

        {/* Header */}
        <Stack alignItems="center" gap={3}>
          <Logo />
          <Stack alignItems="center" gap={1}>
            <SerifTypography variant="h4" fontWeight={700}>
              회원가입
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary" textAlign="center">
              실패를 성장으로 바꾸는 여정을 시작하세요
            </NotoTypography>
          </Stack>
        </Stack>

        {/* Success Alert */}
        {createUserMutation.isSuccess && (
          <Alert severity="success">회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.</Alert>
        )}

        {/* Error Alert */}
        {createUserMutation.isError && (
          <Alert severity="error">회원가입에 실패했습니다. 입력 정보를 확인해주세요.</Alert>
        )}

        {/* Signup Form */}
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
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              inputProps={{ maxLength: 20 }}
              helperText={`${nickname.length}/20`}
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
              helperText="8자 이상 입력해주세요"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPassword.length > 0 && !passwordsMatch}
              helperText={confirmPassword.length > 0 && !passwordsMatch ? "비밀번호가 일치하지 않습니다" : ""}
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
              disabled={!isFormValid || createUserMutation.isPending}
              sx={{
                borderRadius: 3,
                py: 1.5,
              }}
            >
              <FiUserPlus style={{ marginRight: 8 }} />
              {createUserMutation.isPending ? "가입 중..." : "회원가입"}
            </CTButton>
          </Stack>
        </Paper>

        {/* Login link */}
        <Stack alignItems="center" gap={2}>
          <Divider sx={{ width: "100%" }}>
            <NotoTypography variant="body2" color="textDisabled">
              또는
            </NotoTypography>
          </Divider>
          <Stack direction="row" gap={1} alignItems="center">
            <NotoTypography variant="body2" color="textSecondary">
              이미 계정이 있으신가요?
            </NotoTypography>
            <NotoTypography
              component={Link}
              to="/login"
              variant="body2"
              color="primary"
              sx={{ textDecoration: "none", fontWeight: 600 }}
            >
              로그인
            </NotoTypography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default SignupPage
