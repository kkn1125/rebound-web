/**
 * 조각 상태 관리 (Recoil)
 */

import { atom, selector } from "recoil"
import type { Piece, EmotionTag, FailureType, Visibility } from "@/types/api"

// 조각 필터 상태
export const pieceFiltersState = atom({
  key: "pieceFiltersState",
  default: {
    emotionTag: undefined as EmotionTag | undefined,
    failureType: undefined as FailureType | undefined,
    visibility: undefined as Visibility | undefined,
    search: "",
  },
})

// 선택된 조각들 (조립용)
export const selectedPiecesState = atom<string[]>({
  key: "selectedPiecesState",
  default: [],
})

// 조립 중인 조각들
export const assembledPiecesState = atom<Piece[]>({
  key: "assembledPiecesState",
  default: [],
})

// 필터링된 조각 개수 selector
export const filteredPieceCountState = selector({
  key: "filteredPieceCountState",
  get: ({ get }) => {
    const filters = get(pieceFiltersState)
    // 실제로는 API 응답에서 총 개수를 받아와야 함
    return 0
  },
})
