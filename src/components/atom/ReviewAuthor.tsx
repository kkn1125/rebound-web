"use client"

import type React from "react"
import { Avatar, Stack, useTheme } from "@mui/material"
import { NotoTypography } from "./NotoTypography"

interface ReviewAuthorProps {
  name: string
  role: string
}
const ReviewAuthor: React.FC<ReviewAuthorProps> = ({ name, role }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Avatar src={name} />
      <Stack>
        <NotoTypography
          fontWeight={700}
          sx={{
            color: isDark ? theme.palette.text.primary : theme.palette.dark.main,
          }}
        >
          {name}
        </NotoTypography>
        <NotoTypography
          sx={{
            color: isDark ? theme.palette.text.disabled : theme.palette.text.caption,
          }}
        >
          {role}
        </NotoTypography>
      </Stack>
    </Stack>
  )
}

export default ReviewAuthor
