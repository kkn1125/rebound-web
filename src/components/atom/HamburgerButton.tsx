"use client"

import type React from "react"
import { IconButton } from "@mui/material"
import { FiMenu } from "react-icons/fi"

interface HamburgerButtonProps {
  onClick: () => void
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        color: "text.primary",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <FiMenu size={24} />
    </IconButton>
  )
}

export default HamburgerButton
