"use client";

import type React from "react";

import { useAppState } from "@/contexts/APpStateContext";
import { useDeletePiece, useMyPieces } from "@/hooks/queries/pieces";
import type { EmotionTag, FailureType } from "@/types/api";
import CTButton from "@components/atom/CTButton";
import { NotoTypography } from "@components/atom/NotoTypography";
import PieceCard from "@components/atom/PieceCard";
import SEOMetaTag from "@components/atom/SEOMetaTag";
import { SerifTypography } from "@components/atom/SerifTypography";
import PieceFilters from "@components/molecular/PieceFilters";
import {
  Box,
  CircularProgress,
  Container,
  Grid2,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface MyPiecesPageProps {
  title: string;
}

const MyPiecesPage: React.FC<MyPiecesPageProps> = ({ title }) => {
  const { pieceFilters, setPieceFilters } = useAppState();

  const {
    data: pieces = [],
    isLoading,
    error,
  } = useMyPieces({
    emotionTag: pieceFilters.emotionTag,
    failureType: pieceFilters.failureType,
    visibility: pieceFilters.visibility,
    search: pieceFilters.search || undefined,
  });

  const deletePieceMutation = useDeletePiece();

  const handleEmotionToggle = (emotion: string) => {
    setPieceFilters((prev) => ({
      ...prev,
      emotionTag:
        prev.emotionTag === emotion ? undefined : (emotion as EmotionTag),
    }));
  };

  const handleTypeChange = (type: string) => {
    setPieceFilters((prev) => ({
      ...prev,
      failureType: (type as FailureType) || undefined,
    }));
  };

  const handleClearFilters = () => {
    setPieceFilters({
      emotionTag: undefined,
      failureType: undefined,
      visibility: undefined,
      search: "",
    });
  };

  const handleEdit = (id: string) => {
    // TODO: Navigate to edit page
    console.log("Edit piece:", id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("정말로 이 조각을 삭제하시겠습니까?")) {
      try {
        await deletePieceMutation.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete piece:", error);
      }
    }
  };

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
    );
  }

  if (error) {
    return (
      <Stack gap={5}>
        <Toolbar />
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center" minHeight="50vh">
            <NotoTypography variant="h6" color="error">
              조각을 불러오는데 실패했습니다.
            </NotoTypography>
          </Stack>
        </Container>
      </Stack>
    );
  }

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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack gap={1}>
              <SerifTypography variant="h4" fontWeight={700}>
                내 조각함
              </SerifTypography>
              <NotoTypography variant="body1" color="textSecondary">
                총 {pieces.length}개의 실패 조각이 있습니다
              </NotoTypography>
            </Stack>
            <CTButton
              component={Link}
              to="/write"
              variant="contained"
              color="dark"
              sx={{ borderRadius: 3 }}
            >
              <FiPlus style={{ marginRight: 8 }} />새 조각 작성
            </CTButton>
          </Stack>

          <Grid2 container spacing={4}>
            {/* Filters Sidebar */}
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <PieceFilters
                  selectedType={pieceFilters.failureType || ""}
                  selectedEmotions={
                    pieceFilters.emotionTag ? [pieceFilters.emotionTag] : []
                  }
                  onTypeChange={handleTypeChange}
                  onEmotionToggle={handleEmotionToggle}
                  onClearFilters={handleClearFilters}
                />
              </Box>
            </Grid2>

            {/* Pieces List */}
            <Grid2 size={{ xs: 12, md: 9 }}>
              {pieces.length > 0 ? (
                <Grid2 container spacing={3}>
                  {pieces.map((piece) => (
                    <Grid2 size={{ xs: 12, sm: 6, lg: 4 }} key={piece.id}>
                      <PieceCard
                        id={piece.id.toString()}
                        content={piece.content}
                        emotions={piece.emotionTags}
                        type={piece.failureType}
                        isPublic={piece.visibility === "public"}
                        createdAt={piece.createdAt}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              ) : (
                <Stack alignItems="center" gap={2} py={8}>
                  <Typography variant="h6" color="textSecondary">
                    아직 기록된 조각이 없습니다
                  </Typography>
                  <CTButton
                    component={Link}
                    to="/write"
                    variant="outlined"
                    color="dark"
                    sx={{ borderRadius: 3 }}
                  >
                    첫 번째 조각 기록하기
                  </CTButton>
                </Stack>
              )}
            </Grid2>
          </Grid2>
        </Stack>
      </Container>
    </Stack>
  );
};

export default MyPiecesPage;
