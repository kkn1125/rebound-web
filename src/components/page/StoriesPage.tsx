"use client"

import type React from "react"
import CTButton from "@components/atom/CTButton"
import { NotoTypography } from "@components/atom/NotoTypography"
import SampleImage from "@components/atom/SampleImage"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import { SerifTypography } from "@components/atom/SerifTypography"
import { Avatar, Box, Card, CardContent, Chip, Container, Grid2, Stack, Toolbar, CircularProgress } from "@mui/material"
import { useState } from "react"
import { FiClock, FiHeart, FiMessageCircle } from "react-icons/fi"
import { useBuildsFeed } from "@/hooks/queries/builds"
import { EmotionLabels, EmotionIcons } from "@/common/enums/emotions"

interface StoriesPageProps {
  title: string
}

const StoriesPage: React.FC<StoriesPageProps> = ({ title }) => {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest")

  const {
    data: stories = [],
    isLoading,
    error,
  } = useBuildsFeed({
    page: 1,
    limit: 20,
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "방금 전"
    if (diffInHours < 24) return `${diffInHours}시간 전`
    return `${Math.floor(diffInHours / 24)}일 전`
  }

  // 클라이언트 사이드 정렬 (실제로는 API에서 정렬된 데이터를 받아와야 함)
  const sortedStories = [...stories].sort((a, b) => {
    if (sortBy === "popular") {
      // 임시로 ID 기준 정렬 (실제로는 좋아요 수 등으로 정렬)
      return b.id - a.id
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  if (isLoading) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <CircularProgress />
            <NotoTypography variant="body1" color="textSecondary" mt={2}>
              스토리를 불러오는 중...
            </NotoTypography>
          </Stack>
        </Container>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <NotoTypography variant="h6" color="error">
              스토리를 불러오는데 실패했습니다.
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
        description="리바운더들의 실패와 성장 이야기를 만나보세요."
        keywords="rebound,stories,이야기,실패경험,성장스토리"
      />

      <Toolbar />

      <Container maxWidth="xl">
        <Stack gap={6}>
          {/* Header */}
          <Stack alignItems="center" gap={2} textAlign="center">
            <SerifTypography variant="h3" fontWeight={700}>
              피드
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary">
              리바운더들의 조각으로 만든 성장 스토리
            </NotoTypography>
          </Stack>

          {/* Sort Options */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" gap={2} alignItems="center">
              <CTButton
                variant={sortBy === "latest" ? "contained" : "outlined"}
                color="dark"
                size="small"
                onClick={() => setSortBy("latest")}
                sx={{ borderRadius: 2 }}
              >
                최신순
              </CTButton>
              <CTButton
                variant={sortBy === "popular" ? "contained" : "outlined"}
                color="dark"
                size="small"
                onClick={() => setSortBy("popular")}
                sx={{ borderRadius: 2 }}
              >
                인기순
              </CTButton>
            </Stack>
            <NotoTypography variant="body2" color="textSecondary">
              총 {stories.length}개의 스토리
            </NotoTypography>
          </Stack>

          {/* Stories List */}
          {sortedStories.length > 0 ? (
            <Grid2 container spacing={4}>
              {sortedStories.map((story) => (
                <Grid2 size={{ xs: 12, sm: 6, lg: 6 }} key={story.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "all 300ms ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 2,
                        transform: "translateY(-2px)",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <Grid2 container>
                      <Grid2 size={{ xs: 12, md: 7 }}>
                        <CardContent sx={{ p: 3, height: "100%" }}>
                          <Stack gap={2} height="100%">
                            {/* Category & Time */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Chip
                                label={EmotionLabels[story.representativeEmotion as keyof typeof EmotionLabels]}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                                icon={
                                  <span>{EmotionIcons[story.representativeEmotion as keyof typeof EmotionIcons]}</span>
                                }
                              />
                              <Stack direction="row" alignItems="center" gap={0.5}>
                                <FiClock size={14} />
                                <NotoTypography variant="caption" color="textDisabled">
                                  {formatTimeAgo(story.createdAt)}
                                </NotoTypography>
                              </Stack>
                            </Stack>

                            {/* Title */}
                            <SerifTypography variant="h6" fontWeight={600} sx={{ lineHeight: 1.3 }}>
                              {story.title}
                            </SerifTypography>

                            {/* Content Preview */}
                            <NotoTypography
                              variant="body2"
                              color="textSecondary"
                              sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                flex: 1,
                              }}
                            >
                              {story.previewText}
                            </NotoTypography>

                            {/* Piece Count */}
                            <Chip
                              label={`${story.pieceIds.length}개 조각으로 구성`}
                              size="small"
                              color="primary"
                              variant="filled"
                              sx={{ borderRadius: 2, alignSelf: "flex-start" }}
                            />

                            {/* Author & Stats */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mt="auto">
                              <Stack direction="row" alignItems="center" gap={1}>
                                <Avatar sx={{ width: 24, height: 24 }}>{story.userId.toString().charAt(0)}</Avatar>
                                <NotoTypography variant="caption" color="textSecondary">
                                  by User {story.userId}
                                </NotoTypography>
                              </Stack>

                              <Stack direction="row" gap={2} alignItems="center">
                                <Stack direction="row" alignItems="center" gap={0.5}>
                                  <FiHeart size={14} />
                                  <NotoTypography variant="caption">0</NotoTypography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={0.5}>
                                  <FiMessageCircle size={14} />
                                  <NotoTypography variant="caption">0</NotoTypography>
                                </Stack>
                              </Stack>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Grid2>
                      <Grid2 size={{ xs: 12, md: 5 }}>
                        <Box
                          sx={{
                            height: { xs: 200, md: "100%" },
                            minHeight: 200,
                          }}
                        >
                          <SampleImage width="100%" height="100%" src={story.thumbnail} />
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Stack alignItems="center" gap={2} py={8}>
              <NotoTypography variant="h6" color="textSecondary">
                아직 게시된 스토리가 없습니다
              </NotoTypography>
              <NotoTypography variant="body2" color="textSecondary">
                첫 번째 리바운드 스토리를 작성해보세요!
              </NotoTypography>
            </Stack>
          )}

          {/* Load More */}
          {stories.length > 0 && (
            <Stack alignItems="center" pt={4}>
              <CTButton variant="outlined" color="dark" sx={{ borderRadius: 3, px: 4 }}>
                더 많은 스토리 보기
              </CTButton>
            </Stack>
          )}
        </Stack>
      </Container>
    </Stack>
  )
}

export default StoriesPage
