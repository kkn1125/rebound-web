/**
 * 조각(Piece) 관련 API 함수들
 * - 조각 생성
 * - 내 조각 목록 조회
 * - 조각 상세 조회
 * - 조각 수정
 * - 조각 삭제
 */

import { apiClient } from "./client"
import type { CreatePieceRequest, UpdatePieceRequest, Piece, GetPiecesParams, SuccessResponse } from "@/types/api"

export const piecesApi = {
  // 조각 생성
  create: async (data: CreatePieceRequest): Promise<Piece> => {
    const response = await apiClient.post<SuccessResponse<Piece>>("/rebound/pieces", data)
    return response.data.payload
  },

  // 내 조각 목록 조회
  getMyPieces: async (params?: GetPiecesParams): Promise<Piece[]> => {
    const response = await apiClient.get<SuccessResponse<Piece[]>>("/rebound/pieces/me", { params })
    return response.data.payload
  },

  // 조각 상세 조회
  getById: async (id: string): Promise<Piece> => {
    const response = await apiClient.get<SuccessResponse<Piece>>(`/rebound/pieces/${id}`)
    return response.data.payload
  },

  // 조각 수정
  update: async (id: string, data: UpdatePieceRequest): Promise<void> => {
    await apiClient.patch<SuccessResponse<null>>(`/rebound/pieces/${id}`, data)
  },

  // 조각 삭제
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<SuccessResponse<null>>(`/rebound/pieces/${id}`)
  },
}
