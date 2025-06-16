"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import PieceCard from "@components/atom/PieceCard"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import { SerifTypography } from "@components/atom/SerifTypography"
import StatCard from "@components/atom/StatCard"
import { Avatar, Box, Container, Grid2, Stack, Tab, Tabs, Toolbar } from "@mui/material"
import { useState } from "react"

// Mock data - replace with actual data fetching
const mockUser = {
  id: "1",
  nickname: "실패왕",
  email: "user@example.com",
  bio: "실패를 통해 성장하는 중입니다. 매일 조금씩 나아지고 있어요.",
  avatar: "/placeholder.svg?height=120&width=120",
  stats: {
    posts: 12,
    pieces: 8,
  },
}

const mockPieces = [
  {
    id: "1",
    content: "프로젝트 발표에서 완전히 망했다. 준비를 충분히 했다고 생각했는데 실제로는 부족했던 것 같다.",
    emotions: ["disappointment", "shame"],
    type: "work",
    isPublic: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    content: "친구와의 약속을 또 깜빡했다. 이런 일이 반복되면서 관계가 소원해지는 것 같아서 걱정이다.",
    emotions: ["regret", "anxiety"],
    type: "relationship",
    isPublic: false,
    createdAt: "2024-01-10",
  },
]

const mockPosts = [
  {
    id: "1",
    title: "첫 번째 실패 이야기",
    content: "창업을 시도했다가 실패한 경험을 공유합니다...",
    emotions: ["disappointment", "frustration"],
    type: "work",
    isPublic: true,
    createdAt: "2024-01-20",
  },
]

interface UserProfilePageProps {
  title: string
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ title }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleEdit = (id: string) => {
    console.log("Edit:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete:", id)
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
            <Avatar src={mockUser.avatar} sx={{ width: 120, height: 120 }} />
            <Stack gap={1}>
              <SerifTypography variant="h4" fontWeight={700}>
                {mockUser.nickname}
              </SerifTypography>
              <NotoTypography variant="body1" color="textSecondary" maxWidth={400}>
                {mockUser.bio}
              </NotoTypography>
            </Stack>
          </Stack>

          {/* Statistics */}
          <Grid2 container spacing={3} justifyContent="center">
            <Grid2 size={{ xs: 6, sm: 3 }}>
              <StatCard label="Posts" value={mockUser.stats.posts} />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 3 }}>
              <StatCard label="Pieces" value={mockUser.stats.pieces} />
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
                    내 이야기 ({mockPosts.length})
                  </NotoTypography>
                  {mockPosts.length > 0 ? (
                    <Grid2 container spacing={3}>
                      {mockPosts.map((post) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
                          <PieceCard {...post} onEdit={handleEdit} onDelete={handleDelete} />
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
                    내 Pieces ({mockPieces.length})
                  </NotoTypography>
                  {mockPieces.length > 0 ? (
                    <Grid2 container spacing={3}>
                      {mockPieces.map((piece) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={piece.id}>
                          <PieceCard {...piece} onEdit={handleEdit} onDelete={handleDelete} />
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
