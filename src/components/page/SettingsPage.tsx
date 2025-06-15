"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import DarkModeButton from "@components/atom/DarkModeButton"
import {
  Container,
  Stack,
  Paper,
  Toolbar,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material"
import { useState } from "react"
import { FiSave, FiCamera, FiTrash2 } from "react-icons/fi"

interface SettingsPageProps {
  title: string
}

const SettingsPage: React.FC<SettingsPageProps> = ({ title }) => {
  const [nickname, setNickname] = useState("UserName")
  const [bio, setBio] = useState("실패를 통해 성장하는 중입니다. 매일 조금씩 나아지고 있어요.")
  const [email, setEmail] = useState("user@example.com")
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    community: true,
  })

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Settings saved:", { nickname, bio, email, notifications })
  }

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    if (window.confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      console.log("Account deletion requested")
    }
  }

  return (
    <Stack gap={5}>
      <SEOMetaTag
        title={title}
        description="계정 설정을 관리하고 개인정보를 수정하세요."
        keywords="rebound,settings,설정,계정관리"
      />

      <Toolbar />

      <Container maxWidth="md">
        <Stack gap={4}>
          {/* Header */}
          <Stack gap={2}>
            <SerifTypography variant="h4" fontWeight={700}>
              설정
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary">
              계정 정보와 알림 설정을 관리하세요.
            </NotoTypography>
          </Stack>

          {/* Profile Settings */}
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              background: (theme) => theme.palette.background.default,
            }}
          >
            <Stack gap={3}>
              <SerifTypography variant="h6" fontWeight={600}>
                프로필 설정
              </SerifTypography>

              {/* Profile Image */}
              <Stack direction="row" alignItems="center" gap={3}>
                <Stack position="relative">
                  <Avatar src="/placeholder.svg?height=80&width=80" sx={{ width: 80, height: 80 }} />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -5,
                      backgroundColor: "primary.main",
                      color: "white",
                      width: 32,
                      height: 32,
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    <FiCamera size={16} />
                  </IconButton>
                </Stack>
                <Stack gap={1}>
                  <NotoTypography variant="subtitle2" fontWeight={600}>
                    프로필 사진
                  </NotoTypography>
                  <NotoTypography variant="body2" color="textSecondary">
                    JPG, PNG 파일을 업로드하세요 (최대 5MB)
                  </NotoTypography>
                </Stack>
              </Stack>

              {/* Nickname */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  닉네임
                </NotoTypography>
                <TextField
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  inputProps={{ maxLength: 20 }}
                  helperText={`${nickname.length}/20`}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>

              {/* Bio */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  소개
                </NotoTypography>
                <TextField
                  multiline
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  inputProps={{ maxLength: 150 }}
                  helperText={`${bio.length}/150`}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>

              {/* Email */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  이메일
                </NotoTypography>
                <TextField
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Paper>

          {/* Notification Settings */}
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              background: (theme) => theme.palette.background.default,
            }}
          >
            <Stack gap={3}>
              <SerifTypography variant="h6" fontWeight={600}>
                알림 설정
              </SerifTypography>

              <Stack gap={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.email}
                      onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <NotoTypography variant="body1" fontWeight={500}>
                        이메일 알림
                      </NotoTypography>
                      <NotoTypography variant="body2" color="textSecondary">
                        새로운 피드백이나 댓글이 달렸을 때 이메일로 알림을 받습니다.
                      </NotoTypography>
                    </Stack>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.push}
                      onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <NotoTypography variant="body1" fontWeight={500}>
                        푸시 알림
                      </NotoTypography>
                      <NotoTypography variant="body2" color="textSecondary">
                        브라우저 푸시 알림을 통해 실시간으로 알림을 받습니다.
                      </NotoTypography>
                    </Stack>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.community}
                      onChange={(e) => setNotifications({ ...notifications, community: e.target.checked })}
                    />
                  }
                  label={
                    <Stack>
                      <NotoTypography variant="body1" fontWeight={500}>
                        커뮤니티 알림
                      </NotoTypography>
                      <NotoTypography variant="body2" color="textSecondary">
                        커뮤니티 활동과 관련된 알림을 받습니다.
                      </NotoTypography>
                    </Stack>
                  }
                />
              </Stack>
            </Stack>
          </Paper>

          {/* Theme Settings */}
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              background: (theme) => theme.palette.background.default,
            }}
          >
            <Stack gap={3}>
              <SerifTypography variant="h6" fontWeight={600}>
                테마 설정
              </SerifTypography>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack>
                  <NotoTypography variant="body1" fontWeight={500}>
                    다크 모드
                  </NotoTypography>
                  <NotoTypography variant="body2" color="textSecondary">
                    어두운 테마로 변경합니다.
                  </NotoTypography>
                </Stack>
                <DarkModeButton />
              </Stack>
            </Stack>
          </Paper>

          {/* Save Button */}
          <CTButton
            size="large"
            variant="contained"
            color="dark"
            onClick={handleSave}
            sx={{
              borderRadius: 3,
              py: 1.5,
            }}
          >
            <FiSave style={{ marginRight: 8 }} />
            설정 저장
          </CTButton>

          <Divider />

          {/* Danger Zone */}
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              background: (theme) => theme.palette.background.default,
              borderColor: "error.main",
            }}
          >
            <Stack gap={3}>
              <SerifTypography variant="h6" fontWeight={600} color="error">
                위험 구역
              </SerifTypography>

              <Stack gap={2}>
                <NotoTypography variant="body1">
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                </NotoTypography>

                <CTButton
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteAccount}
                  sx={{
                    borderRadius: 3,
                    alignSelf: "flex-start",
                  }}
                >
                  <FiTrash2 style={{ marginRight: 8 }} />
                  계정 삭제
                </CTButton>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default SettingsPage
