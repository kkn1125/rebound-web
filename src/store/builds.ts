/**
 * 조립 상태 관리 (Recoil)
 */

import { atom, selector } from "recoil"
import type { Build, EmotionTag } from "@/types/api"

// 조립 필터 상태
export const buildFiltersState = atom({
  key: "buildFiltersState",
  default: {
    emotion: undefined as EmotionTag | undefined,
    search: "",
    sortBy: "latest" as "latest" | "popular",
  },
})

// 현재 작성 중인 조립
export const currentBuildState = atom<Partial<Build>>({
  key: "currentBuildState",
  default: {},
})

// 피드 정렬 selector
export const sortedBuildsState = selector({
  key: "sortedBuildsState",
  get: ({ get }) => {
    const filters = get(buildFiltersState)
    // 실제로는 API에서 정렬된 데이터를 받아와야 함
    return []
  },
})
