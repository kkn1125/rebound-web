"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import EmotionSelector from "@components/molecular/EmotionSelector"
import {
  Container,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Toolbar,
  Alert,
} from "@mui/material"
import { useState } from "react"
import { FiSave } from "react-icons/fi"
import { FailureTypeLabels, FailureTypesList } from "@/common/enums/failureTypes"
import { useCreatePiece } from "@/hooks/queries/pieces"
import { useNavigate } from "react-router-dom"
import type { EmotionTag, FailureType } from "@/types/api"

interface PieceWritingPageProps {
  title: string
}

const PieceWritingPage: React.FC<PieceWritingPageProps> = ({ title }) => {
  const [content, setContent] = useState("")
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [failureType, setFailureType] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const navigate = useNavigate()

  const createPieceMutation = useCreatePiece()

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleSubmit = async () => {
    try {
      await createPieceMutation.mutateAsync({
        content,
        emotionTags: selectedEmotions as EmotionTag[],
        failureType: failureType as FailureType,
        visibility: isPublic ? "public" : "private",
      })

      // 성공 시 내 조각함으로 이동
      navigate("/my-pieces")
    } catch (error) {
      console.error("Failed to create piece:", error)
    }
  }

  const isFormValid = content.trim().length > 0 && failureType && selectedEmotions.length > 0

  return (
    <Stack gap={5}>
      <SEOMetaTag
        title={title}
        description="실패의 순간을 기록하고 감정을 표현해보세요."
        keywords="rebound,piece,실패기록,감정표현"
      />

      <Toolbar />

      <Container maxWidth="md">
        <Stack gap={4}>
          {/* Header */}
          <Stack gap={2} alignItems="center" textAlign="center">
            <SerifTypography variant="h4" fontWeight={700}>
              실패 조각 기록하기
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary">
              실패의 순간을 하나의 조각으로 기록해보세요. 나중에 여러 조각을 조립하여 완성된 리바운드 스토리를 만들 수
              있습니다.
            </NotoTypography>
          </Stack>

          {/* Success Alert */}
          {createPieceMutation.isSuccess && <Alert severity="success">조각이 성공적으로 저장되었습니다!</Alert>}

          {/* Error Alert */}
          {createPieceMutation.isError && <Alert severity="error">조각 저장에 실패했습니다. 다시 시도해주세요.</Alert>}

          {/* Form */}
          <Paper
            variant="outlined"
            sx={{
              p: 4,
              borderRadius: 3,
              background: (theme) => theme.palette.background.default,
            }}
          >
            <Stack gap={4}>
              {/* Content Input */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  내용 <span style={{ color: "#E3263E" }}>*</span>
                </NotoTypography>
                <TextField
                  multiline
                  rows={6}
                  placeholder="실패했던 순간이나 경험을 자유롭게 적어보세요..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  inputProps={{ maxLength: 300 }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <NotoTypography variant="caption" color="textDisabled" textAlign="right">
                  {content.length}/300
                </NotoTypography>
              </Stack>

              {/* Emotion Selector */}
              <EmotionSelector selectedEmotions={selectedEmotions} onEmotionToggle={handleEmotionToggle} />

              {/* Failure Type */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  실패 유형 <span style={{ color: "#E3263E" }}>*</span>
                </NotoTypography>
                <FormControl>
                  <InputLabel>실패 유형을 선택해주세요</InputLabel>
                  <Select
                    value={failureType}
                    label="실패 유형을 선택해주세요"
                    onChange={(e) => setFailureType(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {FailureTypesList.map((type) => (
                      <MenuItem key={type} value={type}>
                        {FailureTypeLabels[type]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Privacy Toggle */}
              <Stack gap={1}>
                <NotoTypography variant="subtitle2" fontWeight={600}>
                  공개 설정
                </NotoTypography>
                <FormControlLabel
                  control={<Switch checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />}
                  label={
                    <NotoTypography variant="body2" color="textSecondary">
                      {isPublic ? "공개 - 다른 사용자들이 볼 수 있습니다" : "비공개 - 나만 볼 수 있습니다"}
                    </NotoTypography>
                  }
                />
              </Stack>

              {/* Submit Button */}
              <CTButton
                size="large"
                variant="contained"
                color="dark"
                disabled={!isFormValid || createPieceMutation.isPending}
                onClick={handleSubmit}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                }}
              >
                <FiSave style={{ marginRight: 8 }} />
                {createPieceMutation.isPending ? "저장 중..." : "실패 조각 저장하기"}
              </CTButton>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default PieceWritingPage
