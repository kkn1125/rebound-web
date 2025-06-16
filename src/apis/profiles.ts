/**
 * 프로필 관련 API 함수들
 * - 프로필 생성
 * - 프로필 조회
 * - 프로필 수정
 * - 프로필 삭제
 */

import { apiClient } from "./client"
import type { Profile, SuccessResponse } from "@/types/api"

export const profilesApi = {
  // 프로필 생성
  create: async (): Promise<void> => {
    await apiClient.post<SuccessResponse<null>>("/users/profiles")
  },

  // 내 프로필 조회
  getMe: async (): Promise<Profile> => {
    const response = await apiClient.get<SuccessResponse<Profile>>("/users/profiles/me")
    return response.data.payload
  },

  // 프로필 수정
  update: async (): Promise<void> => {
    await apiClient.patch<SuccessResponse<null>>("/users/profiles/me")
  },

  // 프로필 삭제
  delete: async (): Promise<void> => {
    await apiClient.delete<SuccessResponse<null>>("/users/profiles/me")
  },
}
