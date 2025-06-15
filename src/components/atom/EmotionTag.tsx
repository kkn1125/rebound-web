"use client"

import type React from "react"

import { Chip, type ChipProps } from "@mui/material"
import type { ReactNode } from "react"

interface EmotionTagProps extends Omit<ChipProps, "icon"> {
  emotion: string
  icon: ReactNode
  selected?: boolean
}

const EmotionTag: React.FC<EmotionTagProps> = ({ emotion, icon, selected = false, onClick, ...props }) => {
  return (
    <Chip
      icon={<span style={{ fontSize: "1.2em" }}>{icon}</span>}
      label={emotion}
      variant={selected ? "filled" : "outlined"}
      color={selected ? "primary" : "default"}
      clickable
      onClick={onClick}
      sx={{
        borderRadius: 3,
        "&:hover": {
          backgroundColor: selected ? "primary.main" : "action.hover",
        },
      }}
      {...props}
    />
  )
}

export default EmotionTag
