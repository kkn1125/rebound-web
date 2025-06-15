"use client";

import type React from "react";

import { NotoTypography } from "@components/atom/NotoTypography";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import {
  FailureTypeLabels,
  FailureTypesList,
} from "@/common/enums/failureTypes";
import { EmotionLabels, EmotionsList } from "@/common/enums/emotions";

interface PieceFiltersProps {
  selectedType: string;
  selectedEmotions: string[];
  onTypeChange: (type: string) => void;
  onEmotionToggle: (emotion: string) => void;
  onClearFilters: () => void;
}

const PieceFilters: React.FC<PieceFiltersProps> = ({
  selectedType,
  selectedEmotions,
  onTypeChange,
  onEmotionToggle,
  onClearFilters,
}) => {
  return (
    <Stack gap={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <NotoTypography variant="h6" fontWeight={600}>
          필터
        </NotoTypography>
        {(selectedType || selectedEmotions.length > 0) && (
          <Chip
            label="필터 초기화"
            variant="outlined"
            size="small"
            onClick={onClearFilters}
            sx={{ borderRadius: 2 }}
          />
        )}
      </Stack>

      <FormControl size="small">
        <InputLabel>실패 유형</InputLabel>
        <Select
          value={selectedType}
          label="실패 유형"
          onChange={(e) => onTypeChange(e.target.value)}
          sx={{ borderRadius: 2 }}
        >
          <MenuItem value="">전체</MenuItem>
          {FailureTypesList.map((type) => (
            <MenuItem key={type} value={type}>
              {FailureTypeLabels[type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack gap={1}>
        <NotoTypography variant="subtitle2" fontWeight={600}>
          감정
        </NotoTypography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {EmotionsList.map((emotion) => (
            <Chip
              key={emotion}
              label={EmotionLabels[emotion]}
              variant={
                selectedEmotions.includes(emotion) ? "filled" : "outlined"
              }
              size="small"
              onClick={() => onEmotionToggle(emotion)}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PieceFilters;
