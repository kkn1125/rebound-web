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
  Divider,
  Grid2,
  Stack,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { FiClock, FiHeart, FiMessageCircle } from "react-icons/fi";

// Mock data for categories/keywords
const categories = [
  { name: "업무·직장", count: 12, active: true },
  { name: "인간관계", count: 8, active: false },
  { name: "건강·운동", count: 5, active: false },
  { name: "학업·성장", count: 15, active: true },
  { name: "경제·재정", count: 3, active: false },
  { name: "가족", count: 7, active: false },
  { name: "연애·결혼", count: 9, active: true },
  { name: "창업·사업", count: 4, active: false },
  { name: "취미·여가", count: 6, active: false },
  { name: "자기계발", count: 11, active: false },
  { name: "진로·취업", count: 13, active: true },
  { name: "소통·관계", count: 2, active: false },
];

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
  },
];

const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

interface StoriesPageProps {
  title: string;
}

const StoriesPage: React.FC<StoriesPageProps> = ({ title }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDay, setSelectedDay] = useState("일");

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("ko-KR", {
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

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
              REBOUND STORIES
            </SerifTypography>
            <NotoTypography variant="body1" color="textSecondary">
              리바운더들의 실패와 성장 이야기
            </NotoTypography>
          </Stack>

          {/* Categories Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(6, 1fr)",
              },
              gap: 2,
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category.name}
                label={
                  <Stack direction="row" alignItems="center" gap={1}>
                    <span>{category.name}</span>
                    {category.active && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "primary.main",
                        }}
                      />
                    )}
                  </Stack>
                }
                variant={
                  selectedCategory === category.name ? "filled" : "outlined"
                }
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.name ? "" : category.name
                  )
                }
                sx={{
                  borderRadius: 3,
                  py: 2,
                  px: 3,
                  height: "auto",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              />
            ))}
          </Box>

          {/* Day Filter */}
          <Stack alignItems="center" gap={3}>
            <NotoTypography variant="h6" fontWeight={600}>
              요일별 연재
            </NotoTypography>
            <NotoTypography variant="body2" color="textSecondary">
              보고싶은 요일의 연재를 만나 보세요.
            </NotoTypography>

            <Stack direction="row" gap={1}>
              {weekDays.map((day) => (
                <CTButton
                  key={day}
                  variant={selectedDay === day ? "contained" : "outlined"}
                  color="dark"
                  size="small"
                  onClick={() => setSelectedDay(day)}
                  sx={{
                    borderRadius: 2,
                    minWidth: 40,
                    height: 40,
                  }}
                >
                  {day}
                </CTButton>
              ))}
            </Stack>
            <Divider sx={{ width: "100%", maxWidth: 200 }} />
          </Stack>

          {/* Recent Stories */}
          <Stack gap={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack gap={1}>
                <SerifTypography variant="h5" fontWeight={600}>
                  최신순
                </SerifTypography>
                <Stack direction="row" gap={2} alignItems="center">
                  <NotoTypography variant="body2" color="textSecondary">
                    응원순
                  </NotoTypography>
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                    }}
                  />
                  <NotoTypography
                    variant="body2"
                    color="primary"
                    fontWeight={600}
                  >
                    라이킷순
                  </NotoTypography>
                </Stack>
              </Stack>
            </Stack>

            <Grid2 container spacing={4}>
              {recentStories.map((story) => (
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
                      },
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

                            {/* Author & Stats */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              mt="auto"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                              >
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

                              <Stack
                                direction="row"
                                gap={2}
                                alignItems="center"
                              >
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
                더 많은 이야기 보기
              </CTButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default StoriesPage;
