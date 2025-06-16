"use client";

import { Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";

interface ThemeAwareIconProps {
  children: ReactNode;
  size?: number;
  color?: "primary" | "secondary" | "contrast" | "inherit" | "auto";
  sx?: any;
}

const ThemeAwareIcon = forwardRef<SVGElement, ThemeAwareIconProps>(
  ({ children, size = 24, color = "auto", sx = {} }, ref) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const getIconColor = () => {
      switch (color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        case "contrast":
          return isDark ? theme.palette.text.primary : theme.palette.text.white;
        case "inherit":
          return "inherit";
        case "auto":
        default:
          return isDark
            ? theme.palette.text.primary
            : theme.palette.text.primary;
      }
    };

    return (
      <Box
        component="span"
        ref={ref}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: getIconColor(),
          fontSize: size,
          ...sx,
        }}
      >
        {children}
      </Box>
    );
  }
);

export default ThemeAwareIcon;
