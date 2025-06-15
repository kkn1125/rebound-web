"use client";

import type React from "react";

import EmotionTag from "@components/atom/EmotionTag";
import { NotoTypography } from "@components/atom/NotoTypography";
import { Stack } from "@mui/material";
import {
  EmotionLabels,
  EmotionIcons,
  EmotionsList,
} from "@/common/enums/emotions";

interface EmotionSelectorProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotions,
  onEmotionToggle,
}) => {
  return (
    <Stack gap={2}>
      <NotoTypography variant="subtitle2" fontWeight={600}>
        감정 태그 선택
      </NotoTypography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {EmotionsList.map((emotion) => (
          <EmotionTag
            key={emotion}
            emotion={EmotionLabels[emotion]}
            icon={EmotionIcons[emotion]}
            selected={selectedEmotions.includes(emotion)}
            onClick={() => onEmotionToggle(emotion)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default EmotionSelector;
