/**
 * 정적 리소스 관련 API 함수들
 * - 프로필 이미지 조회
 */

import { apiClient } from "./client"
import type { ImageParams } from "@/types/api"

export const staticApi = {
  // 프로필 이미지 조회
  getProfileImage: async (filename: string, params: ImageParams): Promise<Buffer> => {
    const response = await apiClient.get(`/static/image/${filename}`, {
      params,
      responseType: "arraybuffer",
    })
    return response.data
  },

  // 프로필 이미지 URL 생성 헬퍼
  getProfileImageUrl: (filename: string, params: ImageParams): string => {
    const searchParams = new URLSearchParams()
    searchParams.append("type", params.type)
    searchParams.append("quality", params.quality.toString())
    searchParams.append("rs", params.rs)

    if (params.dimension) {
      searchParams.append("dimension", JSON.stringify(params.dimension))
    }

    return `${apiClient.defaults.baseURL}/static/image/${filename}?${searchParams.toString()}`
  },
}
