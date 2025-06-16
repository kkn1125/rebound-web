/**
 * 사용자 관련 API 함수들
 * - 사용자 생성 (회원가입)
 * - 사용자 정보 조회
 * - 사용자 정보 수정
 * - 사용자 삭제
 * - 비밀번호 변경
 */

import { apiClient } from "./client"
import type {
  CreateUserRequest,
  UpdateUserRequest,
  UserMeResponse,
  ChangePasswordRequest,
  SuccessResponse,
} from "@/types/api"

export const usersApi = {
  // 사용자 생성 (회원가입)
  create: async (data: CreateUserRequest): Promise<void> => {
    await apiClient.post<SuccessResponse<null>>("/users", data)
  },

  // 내 정보 조회
  getMe: async (): Promise<UserMeResponse> => {
    const response = await apiClient.get<SuccessResponse<UserMeResponse>>("/users/me")
    return response.data.payload
  },

  // 사용자 정보 수정
  update: async (id: string, data: UpdateUserRequest): Promise<number> => {
    const response = await apiClient.patch<SuccessResponse<number>>(`/users/${id}`, data)
    return response.data.payload
  },

  // 사용자 삭제
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<SuccessResponse<null>>(`/users/${id}`)
  },

  // 비밀번호 변경
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.put<SuccessResponse<null>>("/users/secrets", data)
  },
}
