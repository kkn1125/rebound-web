"use client";

import type React from "react";
import { Stack, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface InvertedSectionProps {
  children: ReactNode;
  id?: string;
}

const InvertedSection: React.FC<InvertedSectionProps> = ({ children, id }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack
      id={id}
      sx={{
        background: isDark
          ? theme.palette.background.paper
          : theme.palette.dark.main,
        color: isDark
          ? theme.palette.text.primary
          : theme.palette.dark.contrastText,
      }}
    >
      {children}
    </Stack>
  );
};

export default InvertedSection;
