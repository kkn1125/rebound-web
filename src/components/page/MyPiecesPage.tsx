"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import SEOMetaTag from "@components/atom/SEOMetaTag"
import CTButton from "@components/atom/CTButton"
import PieceCard from "@components/atom/PieceCard"
import PieceFilters from "@components/molecular/PieceFilters"
import { Container, Stack, Grid, Toolbar, Box, Typography } from "@mui/material"
import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom"

// Mock data - replace with actual data fetching
const mockPieces = [
  {
    id: "1",
    content:
      "프로젝트 발표에서 완전히 망했다. 준비를 충분히 했다고 생각했는데 실제로는 부족했던 것 같다. 팀원들에게 미안하고 나 자신이 실망스럽다.",
    emotions: ["disappointment", "shame"],
    type: "work",
    isPublic: true,
    createdAt: "2024-01-15T14:30:00",
  },
  {
    id: "2",
    content: "친구와의 약속을 또 깜빡했다. 이런 일이 반복되면서 관계가 소원해지는 것 같아서 걱정이다.",
    emotions: ["regret", "anxiety"],
    type: "relationship",
    isPublic: false,
    createdAt: "2024-01-10T12:15:00",
  },
  {
    id: "3",
    content: "운동을 꾸준히 하겠다고 다짐했지만 일주일도 못 버텼다. 의지력이 부족한 나 자신이 한심하다.",
    emotions: ["frustration", "disappointment"],
    type: "health",
    isPublic: true,
    createdAt: "2024-01-05T16:45:00",
  },
]

interface MyPiecesPageProps {
  title: string
}

const MyPiecesPage: React.FC<MyPiecesPageProps> = ({ title }) => {
  const [pieces] = useState(mockPieces)
  const [selectedType, setSelectedType] = useState("")
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleClearFilters = () => {
    setSelectedType("")
    setSelectedEmotions([])
  }

  const handleEdit = (id: string) => {
    // TODO: Navigate to edit page
    console.log("Edit piece:", id)
  }

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete piece:", id)
  }

  // Filter pieces based on selected filters
  const filteredPieces = pieces.filter((piece) => {
    const typeMatch = !selectedType || piece.type === selectedType
    const emotionMatch =
      selectedEmotions.length === 0 || selectedEmotions.some((emotion) => piece.emotions.includes(emotion))
    return typeMatch && emotionMatch
  })

  return (
    <Stack gap={5}>
      <SEOMetaTag
        title={title}
        description="내가 작성한 조각들을 확인하고 관리해보세요."
        keywords="rebound,my-pieces,내글관리"
      />

      <Toolbar />

      <Container maxWidth="xl">
        <Stack gap={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack gap={1}>
              <SerifTypography variant="h4" fontWeight={700}>
                내 조각들
              </SerifTypography>
              <NotoTypography variant="body1" color="textSecondary">
                총 {pieces.length}개의 조각이 있습니다
              </NotoTypography>
            </Stack>
            <CTButton component={Link} to="/write" variant="contained" color="dark" sx={{ borderRadius: 3 }}>
              <FiPlus style={{ marginRight: 8 }} />새 조각 작성
            </CTButton>
          </Stack>

          <Grid container spacing={4}>
            {/* Filters Sidebar */}
            <Grid item xs={12} md={3}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <PieceFilters
                  selectedType={selectedType}
                  selectedEmotions={selectedEmotions}
                  onTypeChange={setSelectedType}
                  onEmotionToggle={handleEmotionToggle}
                  onClearFilters={handleClearFilters}
                />
              </Box>
            </Grid>

            {/* Pieces List */}
            <Grid item xs={12} md={9}>
              {filteredPieces.length > 0 ? (
                <Grid container spacing={3}>
                  {filteredPieces.map((piece) => (
                    <Grid item xs={12} sm={6} lg={4} key={piece.id}>
                      <PieceCard {...piece} onEdit={handleEdit} onDelete={handleDelete} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Stack alignItems="center" gap={2} py={8}>
                  <Typography variant="h6" color="textSecondary">
                    조건에 맞는 조각이 없습니다
                  </Typography>
                  <CTButton component={Link} to="/write" variant="outlined" color="dark" sx={{ borderRadius: 3 }}>
                    첫 번째 조각 작성하기
                  </CTButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Stack>
  )
}

export default MyPiecesPage
