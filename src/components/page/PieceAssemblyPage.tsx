"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import {
  Container,
  Stack,
  Paper,
  Toolbar,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Box,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useState, useRef } from "react"
import { FiSave, FiEye, FiPlus, FiMove, FiTrash2, FiEdit3, FiArrowUp, FiArrowDown, FiImage } from "react-icons/fi"
import { EmotionLabels, EmotionIcons } from "@/common/enums/emotions"
import { FailureTypeLabels } from "@/common/enums/failureTypes"
import { useMyPieces } from "@/hooks/queries/pieces"
import { useCreateBuild } from "@/hooks/queries/builds"
import { useNavigate } from "react-router-dom"
import type { Piece, EmotionTag } from "@/types/api"

interface AssembledPiece extends Piece {
  order: number
  connectionText?: string
}

interface PieceAssemblyPageProps {
  title: string
}

const PieceAssemblyPage: React.FC<PieceAssemblyPageProps> = ({ title }) => {
  const { data: availablePieces = [], isLoading } = useMyPieces()
  const [assembledPieces, setAssembledPieces] = useState<AssembledPiece[]>([])
  const [selectedPieces, setSelectedPieces] = useState<string[]>([])
  const [storyTitle, setStoryTitle] = useState("")
  const [storyDescription, setStoryDescription] = useState("")
  const [representativeEmotion, setRepresentativeEmotion] = useState("")
  const [thumbnailImage, setThumbnailImage] = useState<string>("")
  const [previewOpen, setPreviewOpen] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const navigate = useNavigate()
  const createBuildMutation = useCreateBuild()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 조각 선택/해제
  const handlePieceSelect = (pieceId: string) => {
    setSelectedPieces((prev) => {
      if (prev.includes(pieceId)) {
        return prev.filter((id) => id !== pieceId)
      } else {
        return [...prev, pieceId]
      }
    })
  }

  // 선택된 조각들을 조립 영역에 추가
  const handleAddSelectedPieces = () => {
    const newAssembledPieces = selectedPieces.map((pieceId, index) => {
      const piece = availablePieces.find((p) => p.id.toString() === pieceId)!
      return {
        ...piece,
        order: assembledPieces.length + index,
        connectionText: "",
      }
    })

    setAssembledPieces((prev) => [...prev, ...newAssembledPieces])
    setSelectedPieces([])
  }

  // 조각 제거
  const handleRemovePiece = (pieceId: number) => {
    const newAssembled = assembledPieces.filter((p) => p.id !== pieceId)
    newAssembled.forEach((p, index) => (p.order = index))
    setAssembledPieces(newAssembled)
  }

  // 조각 순서 변경 (위로)
  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newAssembled = [...assembledPieces]
    ;[newAssembled[index - 1], newAssembled[index]] = [newAssembled[index], newAssembled[index - 1]]
    newAssembled.forEach((p, i) => (p.order = i))
    setAssembledPieces(newAssembled)
  }

  // 조각 순서 변경 (아래로)
  const handleMoveDown = (index: number) => {
    if (index === assembledPieces.length - 1) return
    const newAssembled = [...assembledPieces]
    ;[newAssembled[index], newAssembled[index + 1]] = [newAssembled[index + 1], newAssembled[index]]
    newAssembled.forEach((p, i) => (p.order = i))
    setAssembledPieces(newAssembled)
  }

  // 연결 문장 업데이트
  const handleConnectionTextChange = (index: number, text: string) => {
    const newAssembled = [...assembledPieces]
    newAssembled[index].connectionText = text
    setAssembledPieces(newAssembled)
  }

  // 썸네일 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbnailImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 글 저장
  const handleSaveStory = async () => {
    try {
      await createBuildMutation.mutateAsync({
        title: storyTitle,
        pieceIds: assembledPieces.map((p) => p.id),
        representativeEmotion: representativeEmotion as EmotionTag,
        thumbnail: thumbnailImage || undefined,
        previewText: storyDescription,
      })

      // 성공 시 피드로 이동
      navigate("/stories")
    } catch (error) {
      console.error("Failed to create build:", error)
    }
  }

  // 미리보기 콘텐츠 생성
  const generatePreviewContent = () => {
    return assembledPieces
      .sort((a, b) => a.order - b.order)
      .map((piece, index) => {
        let content = piece.content
        if (index < assembledPieces.length - 1 && piece.connectionText) {
          content += "\n\n" + piece.connectionText
        }
        return content
      })
      .join("\n\n")
  }

  // 대표 감정 옵션 생성
  const getRepresentativeEmotionOptions = () => {
    const allEmotions = Array.from(new Set(assembledPieces.flatMap((piece) => piece.emotionTags)))
    return allEmotions
  }

  const isFormValid = storyTitle.trim().length > 0 && assembledPieces.length > 0 && representativeEmotion

  if (isLoading) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <CircularProgress />
            <NotoTypography variant="body1" color="textSecondary" mt={2}>
              조각을 불러오는 중...
            </NotoTypography>
          </Stack>
        </Container>
      </Stack>
    )
  }

  return (
    <Stack gap={5}>
      <SEOMetaTag
        title={title}
        description="조각들을 조립하여 완성된 리바운드 스토리를 만들어보세요."
        keywords="rebound,assembly,조각조립,스토리작성"
      />

      <Toolbar />

      <Container maxWidth="xl">
        <Stack gap={4}>
          {/* Header */}
          <Stack gap={2} alignItems="center" textAlign="center">
            <SerifTypography variant="h4" fontWeight={700}>
              새 글 쓰기
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary">
              작성한 조각들을 선택하고 조립하여 하나의 완성된 리바운드 스토리로 만들어보세요.
            </NotoTypography>
          </Stack>

          {/* Success Alert */}
          {createBuildMutation.isSuccess && (
            <Alert severity="success">리바운드 스토리가 성공적으로 게시되었습니다!</Alert>
          )}

          {/* Error Alert */}
          {createBuildMutation.isError && (
            <Alert severity="error">스토리 게시에 실패했습니다. 다시 시도해주세요.</Alert>
          )}

          <Grid container spacing={4}>
            {/* 조각 선택 영역 */}
            <Grid item xs={12} md={4}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: (theme) => theme.palette.background.default,
                  height: "fit-content",
                  position: "sticky",
                  top: 100,
                }}
              >
                <Stack gap={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <SerifTypography variant="h6" fontWeight={600}>
                      내 조각함
                    </SerifTypography>
                    <Chip label={`${selectedPieces.length}개 선택`} size="small" color="primary" />
                  </Stack>

                  <NotoTypography variant="body2" color="textSecondary">
                    조각을 선택하고 "추가하기" 버튼을 눌러 조립 영역에 추가하세요
                  </NotoTypography>

                  <Stack gap={2} sx={{ maxHeight: 400, overflowY: "auto" }}>
                    {availablePieces
                      .filter((piece) => !assembledPieces.find((ap) => ap.id === piece.id))
                      .map((piece) => (
                        <Card
                          key={piece.id}
                          variant="outlined"
                          sx={{
                            borderRadius: 2,
                            cursor: "pointer",
                            border: selectedPieces.includes(piece.id.toString())
                              ? "2px solid #5A67EE"
                              : "1px solid #E0E0E0",
                            backgroundColor: selectedPieces.includes(piece.id.toString())
                              ? "action.selected"
                              : "transparent",
                            "&:hover": {
                              borderColor: "#5A67EE",
                            },
                          }}
                          onClick={() => handlePieceSelect(piece.id.toString())}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Stack gap={1}>
                              <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Chip
                                  label={FailureTypeLabels[piece.failureType as keyof typeof FailureTypeLabels]}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1 }}
                                />
                                {selectedPieces.includes(piece.id.toString()) && (
                                  <Box
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      borderRadius: "50%",
                                      backgroundColor: "primary.main",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "12px",
                                    }}
                                  >
                                    ✓
                                  </Box>
                                )}
                              </Stack>
                              <NotoTypography
                                variant="body2"
                                sx={{
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {piece.content}
                              </NotoTypography>
                              <Stack direction="row" gap={0.5} flexWrap="wrap">
                                {piece.emotionTags.map((emotion) => (
                                  <span key={emotion} style={{ fontSize: "0.8rem" }}>
                                    {EmotionIcons[emotion as keyof typeof EmotionIcons]}
                                  </span>
                                ))}
                              </Stack>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                  </Stack>

                  <CTButton
                    variant="contained"
                    color="dark"
                    disabled={selectedPieces.length === 0}
                    onClick={handleAddSelectedPieces}
                    sx={{ borderRadius: 2 }}
                  >
                    <FiPlus style={{ marginRight: 4 }} />
                    선택한 조각 추가하기
                  </CTButton>
                </Stack>
              </Paper>
            </Grid>

            {/* 조립 영역 */}
            <Grid item xs={12} md={8}>
              <Stack gap={3}>
                {/* 글 정보 입력 */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: (theme) => theme.palette.background.default,
                  }}
                >
                  <Stack gap={3}>
                    <SerifTypography variant="h6" fontWeight={600}>
                      글 정보
                    </SerifTypography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="글 제목"
                          value={storyTitle}
                          onChange={(e) => setStoryTitle(e.target.value)}
                          required
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="글 소개"
                          value={storyDescription}
                          onChange={(e) => setStoryDescription(e.target.value)}
                          multiline
                          rows={2}
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>대표 감정</InputLabel>
                          <Select
                            value={representativeEmotion}
                            label="대표 감정"
                            onChange={(e) => setRepresentativeEmotion(e.target.value)}
                            sx={{ borderRadius: 2 }}
                          >
                            {getRepresentativeEmotionOptions().map((emotion) => (
                              <MenuItem key={emotion} value={emotion}>
                                {EmotionIcons[emotion as keyof typeof EmotionIcons]}{" "}
                                {EmotionLabels[emotion as keyof typeof EmotionLabels]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" gap={1} alignItems="center">
                          <CTButton
                            variant="outlined"
                            color="dark"
                            onClick={() => fileInputRef.current?.click()}
                            sx={{ borderRadius: 2 }}
                          >
                            <FiImage style={{ marginRight: 4 }} />
                            썸네일 선택
                          </CTButton>
                          {thumbnailImage && (
                            <Box
                              component="img"
                              src={thumbnailImage}
                              sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover" }}
                            />
                          )}
                        </Stack>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Paper>

                {/* 조각 조립 영역 */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: (theme) => theme.palette.background.default,
                  }}
                >
                  <Stack gap={3}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <SerifTypography variant="h6" fontWeight={600}>
                        조각 조립 영역
                      </SerifTypography>
                      <Stack direction="row" gap={1}>
                        <CTButton
                          variant="outlined"
                          color="dark"
                          size="small"
                          onClick={() => setPreviewOpen(true)}
                          disabled={assembledPieces.length === 0}
                          sx={{ borderRadius: 2 }}
                        >
                          <FiEye style={{ marginRight: 4 }} />
                          미리보기
                        </CTButton>
                      </Stack>
                    </Stack>

                    {assembledPieces.length === 0 ? (
                      <Stack alignItems="center" justifyContent="center" gap={2} sx={{ height: 300 }}>
                        <FiPlus size={48} color="#E0E0E0" />
                        <NotoTypography variant="body1" color="textDisabled" textAlign="center">
                          왼쪽에서 조각을 선택하여
                          <br />
                          글을 조립해보세요
                        </NotoTypography>
                      </Stack>
                    ) : (
                      <Stack gap={2}>
                        {assembledPieces.map((piece, index) => (
                          <Box key={piece.id}>
                            <Card
                              variant="outlined"
                              sx={{
                                borderRadius: 2,
                                transition: "all 0.2s ease",
                              }}
                            >
                              <CardContent sx={{ p: 3 }}>
                                <Stack gap={2}>
                                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" alignItems="center" gap={1}>
                                      <FiMove size={16} color="#999" />
                                      <Chip
                                        label={`${index + 1}번째 조각`}
                                        size="small"
                                        color="primary"
                                        variant="filled"
                                        sx={{ borderRadius: 1 }}
                                      />
                                      <Chip
                                        label={FailureTypeLabels[piece.failureType as keyof typeof FailureTypeLabels]}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderRadius: 1 }}
                                      />
                                    </Stack>
                                    <Stack direction="row" gap={1}>
                                      <IconButton
                                        size="small"
                                        onClick={() => handleMoveUp(index)}
                                        disabled={index === 0}
                                      >
                                        <FiArrowUp size={14} />
                                      </IconButton>
                                      <IconButton
                                        size="small"
                                        onClick={() => handleMoveDown(index)}
                                        disabled={index === assembledPieces.length - 1}
                                      >
                                        <FiArrowDown size={14} />
                                      </IconButton>
                                      <IconButton size="small" onClick={() => handleRemovePiece(piece.id)}>
                                        <FiTrash2 size={14} />
                                      </IconButton>
                                    </Stack>
                                  </Stack>
                                  <NotoTypography variant="body1">{piece.content}</NotoTypography>
                                  <Stack direction="row" gap={1} flexWrap="wrap">
                                    {piece.emotionTags.map((emotion) => (
                                      <Chip
                                        key={emotion}
                                        label={EmotionLabels[emotion as keyof typeof EmotionLabels]}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderRadius: 1 }}
                                      />
                                    ))}
                                  </Stack>
                                </Stack>
                              </CardContent>
                            </Card>

                            {/* 연결 문장 입력 (마지막 조각 제외) */}
                            {index < assembledPieces.length - 1 && (
                              <Box sx={{ py: 2, px: 1 }}>
                                <TextField
                                  placeholder="조각 사이에 연결할 문장을 입력하세요 (선택사항)"
                                  value={piece.connectionText || ""}
                                  onChange={(e) => handleConnectionTextChange(index, e.target.value)}
                                  fullWidth
                                  size="small"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                      backgroundColor: "action.hover",
                                    },
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
                        ))}
                      </Stack>
                    )}

                    {/* 저장 버튼 */}
                    <CTButton
                      size="large"
                      variant="contained"
                      color="dark"
                      disabled={!isFormValid || createBuildMutation.isPending}
                      onClick={handleSaveStory}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                      }}
                    >
                      <FiSave style={{ marginRight: 8 }} />
                      {createBuildMutation.isPending ? "게시 중..." : "리바운드 스토리 게시하기"}
                    </CTButton>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* 미리보기 Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <SerifTypography variant="h6" fontWeight={600}>
              글 미리보기
            </SerifTypography>
            <CTButton size="small" variant="outlined" color="dark" sx={{ borderRadius: 2 }}>
              <FiEdit3 style={{ marginRight: 4 }} />
              수정
            </CTButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack gap={3}>
            {/* 썸네일 이미지 */}
            {thumbnailImage && (
              <Box
                component="img"
                src={thumbnailImage}
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            )}

            {/* 제목과 설명 */}
            <Stack gap={1}>
              <SerifTypography variant="h5" fontWeight={700}>
                {storyTitle || "제목 없음"}
              </SerifTypography>
              {storyDescription && (
                <NotoTypography variant="body1" color="textSecondary">
                  {storyDescription}
                </NotoTypography>
              )}
              {representativeEmotion && (
                <Stack direction="row" alignItems="center" gap={1}>
                  <span>{EmotionIcons[representativeEmotion as keyof typeof EmotionIcons]}</span>
                  <NotoTypography variant="body2" color="textSecondary">
                    {EmotionLabels[representativeEmotion as keyof typeof EmotionLabels]}
                  </NotoTypography>
                </Stack>
              )}
            </Stack>

            <Divider />

            {/* 본문 내용 */}
            <Box
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              <NotoTypography variant="body1">{generatePreviewContent()}</NotoTypography>
            </Box>

            <Divider />

            {/* 메타 정보 */}
            <Stack gap={1}>
              <NotoTypography variant="caption" color="textDisabled">
                총 {assembledPieces.length}개의 조각으로 구성된 리바운드 스토리
              </NotoTypography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {Array.from(new Set(assembledPieces.flatMap((piece) => piece.emotionTags))).map((emotion) => (
                  <Chip
                    key={emotion}
                    label={EmotionLabels[emotion as keyof typeof EmotionLabels]}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <CTButton onClick={() => setPreviewOpen(false)} variant="outlined" color="dark" sx={{ borderRadius: 2 }}>
            닫기
          </CTButton>
          <CTButton
            onClick={handleSaveStory}
            variant="contained"
            color="dark"
            disabled={!isFormValid || createBuildMutation.isPending}
            sx={{ borderRadius: 2 }}
          >
            <FiSave style={{ marginRight: 4 }} />
            게시하기
          </CTButton>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default PieceAssemblyPage
