"use client";

import type React from "react";

import { FailureTypeLabels } from "@/common/enums/failureTypes";
import CTButton from "@components/atom/CTButton";
import { NotoTypography } from "@components/atom/NotoTypography";
import SampleImage from "@components/atom/SampleImage";
import SEOMetaTag from "@components/atom/SEOMetaTag";
import { SerifTypography } from "@components/atom/SerifTypography";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid2,
  Stack,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { FiClock, FiHeart, FiMessageCircle } from "react-icons/fi";

// Mock data for recent stories
const recentStories = [
  {
    id: "1",
    title: "스타트업 창업 실패 후 얻은 값진 교훈",
    content:
      "2년간 준비한 스타트업이 결국 문을 닫게 되었습니다. 하지만 이 과정에서 배운 것들이 더 소중했어요...",
    author: {
      name: "김창업",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "work",
    emotions: ["disappointment", "frustration"],
    likes: 24,
    comments: 8,
    createdAt: "2024-01-15T14:30:00",
    image: "/placeholder.svg?height=200&width=300",
    representativeEmotion: "disappointment",
    pieceCount: 5,
  },
  {
    id: "2",
    title: "첫 직장에서의 실수와 성장 이야기",
    content:
      "신입사원 때 저지른 큰 실수로 인해 팀 전체가 야근을 해야 했던 그날. 지금 생각해보면 그때가 진짜 성장의 시작이었어요.",
    author: {
      name: "이신입",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "work",
    emotions: ["shame", "regret"],
    likes: 18,
    comments: 12,
    createdAt: "2024-01-14T16:45:00",
    image: "/placeholder.svg?height=200&width=300",
    representativeEmotion: "regret",
    pieceCount: 3,
  },
  {
    id: "3",
    title: "운동 계획 실패, 하지만 포기하지 않기",
    content:
      "매년 새해 결심으로 세우는 운동 계획. 올해도 어김없이 실패했지만, 이번엔 다른 방법을 시도해보려고 합니다.",
    author: {
      name: "박운동",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "health",
    emotions: ["frustration", "disappointment"],
    likes: 31,
    comments: 15,
    createdAt: "2024-01-13T09:20:00",
    image: "/placeholder.svg?height=200&width=300",
    representativeEmotion: "frustration",
    pieceCount: 4,
  },
  {
    id: "4",
    title: "친구와의 갈등, 그리고 화해",
    content:
      "10년 지기 친구와 사소한 일로 크게 싸웠습니다. 자존심 때문에 먼저 연락하지 못했던 그 시간들이 아직도 아쉬워요.",
    author: {
      name: "최친구",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "relationship",
    emotions: ["regret", "sadness"],
    likes: 42,
    comments: 23,
    createdAt: "2024-01-12T20:15:00",
    image: "/placeholder.svg?height=200&width=300",
    representativeEmotion: "sadness",
    pieceCount: 6,
  },
];

interface StoriesPageProps {
  title: string;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ title }) => {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    return `${Math.floor(diffInHours / 24)}일 전`;
  };

  const sortedStories = [...recentStories].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
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
              총 {recentStories.length}개의 스토리
            </NotoTypography>
          </Stack>

          {/* Stories List */}
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
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Chip
                              label={
                                FailureTypeLabels[
                                  story.category as keyof typeof FailureTypeLabels
                                ]
                              }
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 2 }}
                            />
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={0.5}
                            >
                              <FiClock size={14} />
                              <NotoTypography
                                variant="caption"
                                color="textDisabled"
                              >
                                {formatTimeAgo(story.createdAt)}
                              </NotoTypography>
                            </Stack>
                          </Stack>

                          {/* Title */}
                          <SerifTypography
                            variant="h6"
                            fontWeight={600}
                            sx={{ lineHeight: 1.3 }}
                          >
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
                            {story.content}
                          </NotoTypography>

                          {/* Piece Count */}
                          <Chip
                            label={`${story.pieceCount}개 조각으로 구성`}
                            size="small"
                            color="primary"
                            variant="filled"
                            sx={{ borderRadius: 2, alignSelf: "flex-start" }}
                          />

                          {/* Author & Stats */}
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mt="auto"
                          >
                            <Stack direction="row" alignItems="center" gap={1}>
                              <Avatar
                                src={story.author.avatar}
                                sx={{ width: 24, height: 24 }}
                              />
                              <NotoTypography
                                variant="caption"
                                color="textSecondary"
                              >
                                by {story.author.name}
                              </NotoTypography>
                            </Stack>

                            <Stack direction="row" gap={2} alignItems="center">
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                              >
                                <FiHeart size={14} />
                                <NotoTypography variant="caption">
                                  {story.likes}
                                </NotoTypography>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                              >
                                <FiMessageCircle size={14} />
                                <NotoTypography variant="caption">
                                  {story.comments}
                                </NotoTypography>
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
                        <SampleImage width="100%" height="100%" />
                      </Box>
                    </Grid2>
                  </Grid2>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          {/* Load More */}
          <Stack alignItems="center" pt={4}>
            <CTButton
              variant="outlined"
              color="dark"
              sx={{ borderRadius: 3, px: 4 }}
            >
              더 많은 스토리 보기
            </CTButton>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default StoriesPage;
