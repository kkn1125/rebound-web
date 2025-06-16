"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import StatCard from "@components/atom/StatCard"
import PieceCard from "@components/atom/PieceCard"
import { Container, Stack, Avatar, Tabs, Tab, Toolbar, Box, Grid2, CircularProgress } from "@mui/material"
import { useState } from "react"
import { useUserMe } from "@/hooks/queries/users"
import { useMyPieces, useDeletePiece } from "@/hooks/queries/pieces"
import { useMyBuilds, useDeleteBuild } from "@/hooks/queries/builds"

interface UserProfilePageProps {
  title: string
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ title }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const { data: user, isLoading: userLoading } = useUserMe()
  const { data: pieces = [], isLoading: piecesLoading } = useMyPieces()
  const { data: builds = [], isLoading: buildsLoading } = useMyBuilds()

  const deletePieceMutation = useDeletePiece()
  const deleteBuildMutation = useDeleteBuild()

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleEditPiece = (id: string) => {
    console.log("Edit piece:", id)
  }

  const handleDeletePiece = async (id: string) => {
    if (window.confirm("정말로 이 조각을 삭제하시겠습니까?")) {
      try {
        await deletePieceMutation.mutateAsync(id)
      } catch (error) {
        console.error("Failed to delete piece:", error)
      }
    }
  }

  const handleEditBuild = (id: string) => {
    console.log("Edit build:", id)
  }

  const handleDeleteBuild = async (id: string) => {
    if (window.confirm("정말로 이 스토리를 삭제하시겠습니까?")) {
      try {
        await deleteBuildMutation.mutateAsync(id)
      } catch (error) {
        console.error("Failed to delete build:", error)
      }
    }
  }

  if (userLoading) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="lg">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <CircularProgress />
            <NotoTypography variant="body1" color="textSecondary" mt={2}>
              프로필을 불러오는 중...
            </NotoTypography>
          </Stack>
        </Container>
      </Stack>
    )
  }

  if (!user) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="lg">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <NotoTypography variant="h6" color="error">
              사용자 정보를 불러올 수 없습니다.
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
        description="내 프로필과 작성한 글들을 확인해보세요."
        keywords="rebound,profile,마이페이지"
      />

      <Toolbar />

      <Container maxWidth="lg">
        <Stack gap={4}>
          {/* Profile Header */}
          <Stack alignItems="center" gap={3} textAlign="center">
            <Avatar sx={{ width: 120, height: 120 }}>{user.nickname.charAt(0)}</Avatar>
            <Stack gap={1}>
              <SerifTypography variant="h4" fontWeight={700}>
                {user.nickname}
              </SerifTypography>
              <NotoTypography variant="body1" color="textSecondary" maxWidth={400}>
                {user.email}
              </NotoTypography>
            </Stack>
          </Stack>

          {/* Statistics */}
          <Grid2 container spacing={3} justifyContent="center">
            <Grid2 size={{ xs: 6, sm: 3 }}>
              <StatCard label="Stories" value={builds.length} />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 3 }}>
              <StatCard label="Pieces" value={pieces.length} />
            </Grid2>
          </Grid2>

          {/* Content Tabs */}
          <Stack gap={3}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              sx={{
                "& .MuiTab-root": {
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="내 이야기" />
              <Tab label="내 조각들" />
            </Tabs>

            {/* Tab Content */}
            <Box>
              {currentTab === 0 && (
                <Stack gap={3}>
                  <NotoTypography variant="h6" fontWeight={600}>
                    내 이야기 ({builds.length})
                  </NotoTypography>
                  {buildsLoading ? (
                    <Stack alignItems="center" py={4}>
                      <CircularProgress size={24} />
                    </Stack>
                  ) : builds.length > 0 ? (
                    <Grid2 container spacing={3}>
                      {builds.map((build) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={build.id}>
                          <PieceCard
                            id={build.id.toString()}
                            content={build.previewText}
                            emotions={[build.representativeEmotion]}
                            type="story" // 임시 타입
                            isPublic={true} // 임시로 모든 빌드를 공개로 설정
                            createdAt={build.createdAt}
                            onEdit={handleEditBuild}
                            onDelete={handleDeleteBuild}
                          />
                        </Grid2>
                      ))}
                    </Grid2>
                  ) : (
                    <Stack alignItems="center" gap={2} py={8}>
                      <NotoTypography variant="h6" color="textSecondary">
                        아직 작성한 이야기가 없습니다
                      </NotoTypography>
                    </Stack>
                  )}
                </Stack>
              )}

              {currentTab === 1 && (
                <Stack gap={3}>
                  <NotoTypography variant="h6" fontWeight={600}>
                    내 Pieces ({pieces.length})
                  </NotoTypography>
                  {piecesLoading ? (
                    <Stack alignItems="center" py={4}>
                      <CircularProgress size={24} />
                    </Stack>
                  ) : pieces.length > 0 ? (
                    <Grid2 container spacing={3}>
                      {pieces.map((piece) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={piece.id}>
                          <PieceCard
                            id={piece.id.toString()}
                            content={piece.content}
                            emotions={piece.emotionTags}
                            type={piece.failureType}
                            isPublic={piece.visibility === "public"}
                            createdAt={piece.createdAt}
                            onEdit={handleEditPiece}
                            onDelete={handleDeletePiece}
                          />
                        </Grid2>
                      ))}
                    </Grid2>
                  ) : (
                    <Stack alignItems="center" gap={2} py={8}>
                      <NotoTypography variant="h6" color="textSecondary">
                        아직 작성한 조각이 없습니다
                      </NotoTypography>
                    </Stack>
                  )}
                </Stack>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  )
}

export default UserProfilePage
