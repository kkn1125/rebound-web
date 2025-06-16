/**
 * 조립(Build) 관련 API 함수들
 * - 조립 생성
 * - 피드 조회 (전체 공개 글)
 * - 내 조립 목록 조회
 * - 조립 상세 조회
 * - 조립 수정
 * - 조립 삭제
 */

import { apiClient } from "./client"
import type { CreateBuildRequest, UpdateBuildRequest, Build, GetBuildsParams, SuccessResponse } from "@/types/api"

export const buildsApi = {
  // 조립 생성
  create: async (data: CreateBuildRequest): Promise<Build> => {
    const response = await apiClient.post<SuccessResponse<Build>>("/rebound/builds", data)
    return response.data.payload
  },

  // 피드 조회 (전체 공개 글)
  getFeed: async (params?: GetBuildsParams): Promise<Build[]> => {
    const response = await apiClient.get<SuccessResponse<Build[]>>("/rebound/builds/feed", { params })
    return response.data.payload
  },

  // 내 조립 목록 조회
  getMyBuilds: async (params?: GetBuildsParams): Promise<Build[]> => {
    const response = await apiClient.get<SuccessResponse<Build[]>>("/rebound/builds/me", { params })
    return response.data.payload
  },

  // 조립 상세 조회
  getById: async (id: string): Promise<Build> => {
    const response = await apiClient.get<SuccessResponse<Build>>(`/rebound/builds/${id}`)
    return response.data.payload
  },

  // 조립 수정
  update: async (id: string, data: UpdateBuildRequest): Promise<void> => {
    await apiClient.patch<SuccessResponse<null>>(`/rebound/builds/${id}`, data)
  },

  // 조립 삭제
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<SuccessResponse<null>>(`/rebound/builds/${id}`)
  },
}
