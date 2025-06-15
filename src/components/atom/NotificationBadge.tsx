"use client"

import type React from "react"
import { Badge, IconButton } from "@mui/material"
import { FiBell } from "react-icons/fi"

interface NotificationBadgeProps {
  count: number
  onClick: () => void
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, onClick }) => {
  return (
    <Badge
      badgeContent={count > 0 ? count : undefined}
      color="error"
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "0.75rem",
          minWidth: "18px",
          height: "18px",
        },
      }}
    >
      <IconButton onClick={onClick}>
        <FiBell />
      </IconButton>
    </Badge>
  )
}

export default NotificationBadge
