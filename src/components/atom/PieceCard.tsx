"use client"

import type React from "react"

import { NotoTypography } from "@components/atom/NotoTypography"
import { Card, CardContent, Stack, Chip, IconButton, Box } from "@mui/material"
import { FiEdit2, FiTrash2, FiLock, FiGlobe } from "react-icons/fi"
import { EmotionLabels } from "@/common/enums/emotions"
import { FailureTypeLabels } from "@/common/enums/failureTypes"

interface PieceCardProps {
  id: string
  content: string
  emotions: string[]
  type: string
  isPublic: boolean
  createdAt: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const PieceCard: React.FC<PieceCardProps> = ({
  id,
  content,
  emotions,
  type,
  isPublic,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const previewContent = content.length > 100 ? content.substring(0, 100) + "..." : content

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\. /g, ". ")
      .replace(/\.$/, "")
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        transition: "all 300ms ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 2,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack gap={2}>
          {/* Header with privacy and actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              {isPublic ? <FiGlobe size={16} /> : <FiLock size={16} />}
              <NotoTypography variant="caption" color="textSecondary">
                {FailureTypeLabels[type as keyof typeof FailureTypeLabels] || type}
              </NotoTypography>
            </Box>
            <Stack direction="row" gap={1}>
              <IconButton size="small" onClick={() => onEdit?.(id)}>
                <FiEdit2 size={16} />
              </IconButton>
              <IconButton size="small" onClick={() => onDelete?.(id)}>
                <FiTrash2 size={16} />
              </IconButton>
            </Stack>
          </Stack>

          {/* Content preview */}
          <NotoTypography variant="body1">{previewContent}</NotoTypography>

          {/* Emotion tags */}
          <Stack direction="row" gap={1} flexWrap="wrap">
            {emotions.map((emotion) => (
              <Chip
                key={emotion}
                label={EmotionLabels[emotion as keyof typeof EmotionLabels] || emotion}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Stack>

          {/* Date */}
          <NotoTypography variant="caption" color="textDisabled">
            {formatDate(createdAt)}
          </NotoTypography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PieceCard
