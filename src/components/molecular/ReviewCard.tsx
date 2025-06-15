"use client";

import type React from "react";
import { NotoTypography } from "@components/atom/NotoTypography";
import ReviewAuthor from "@components/atom/ReviewAuthor";
import { SerifTypography } from "@components/atom/SerifTypography";
import { Stack, useTheme } from "@mui/material";

interface ReviewCardProps {
  name: string;
  role: string;
  content: string;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ name, role, content }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack
      gap={2}
      p={5}
      sx={{
        background: isDark
          ? theme.palette.background.default
          : theme.palette.background.paper,
        borderRadius: 3,
        border: isDark ? `1px solid ${theme.palette.divider}` : "none",
      }}
    >
      <SerifTypography
        fontSize={36}
        sx={{
          color: isDark
            ? theme.palette.text.primary
            : theme.palette.dark.main,
        }}
      >
        "
      </SerifTypography>
      <NotoTypography
        italic
        fontWeight={200}
        sx={{
          color: isDark
            ? theme.palette.text.secondary
            : theme.palette.dark.main,
        }}
      >
        {content}
      </NotoTypography>
      <ReviewAuthor name={name} role={role} />
    </Stack>
  );
};

export default ReviewCard;
