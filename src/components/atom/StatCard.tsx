import type React from "react"
import { NotoTypography } from "@components/atom/NotoTypography"
import { SerifTypography } from "@components/atom/SerifTypography"
import { Paper, Stack } from "@mui/material"

interface StatCardProps {
  label: string
  value: number
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        background: (theme) => theme.palette.background.paper,
      }}
    >
      <Stack gap={1} alignItems="center">
        <SerifTypography variant="h4" fontWeight={700}>
          {value}
        </SerifTypography>
        <NotoTypography variant="body2" color="textSecondary">
          {label}
        </NotoTypography>
      </Stack>
    </Paper>
  )
}

export default StatCard
