/**
 * 인증 관련 API 함수들
 * - 로그인
 * - 토큰 검증
 * - 로그아웃
 */

import { apiClient } from "./client"
import type { LoginRequest, LoginResponse, SuccessResponse, TokenVerifyResponse } from "@/types/api"

export const authApi = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<SuccessResponse<LoginResponse>>("/auth/login", data)
    return response.data.payload
  },

  // 토큰 검증
  verifyToken: async (): Promise<TokenVerifyResponse> => {
    const response = await apiClient.post<SuccessResponse<TokenVerifyResponse>>("/auth/verify")
    return response.data.payload
  },

  // 로그아웃 (클라이언트 사이드)
  logout: () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  },
}
