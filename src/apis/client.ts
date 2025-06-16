/**
 * API 클라이언트 설정 및 공통 기능
 * - Axios 인스턴스 생성
 * - 인터셉터를 통한 토큰 관리
 * - 에러 처리
 */

import axios, { type AxiosInstance, type AxiosError } from "axios"
import type { ErrorResponse } from "@/types/api"

// API 베이스 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

// Axios 인스턴스 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 요청 인터셉터 - 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터 - 에러 처리 및 토큰 갱신
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config

    // 401 에러 시 토큰 갱신 시도
    if (error.response?.status === 401 && originalRequest) {
      try {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
          // 토큰 갱신 로직 (실제 구현 시 refresh endpoint 필요)
          // const response = await apiClient.post('/auth/refresh', { refreshToken })
          // localStorage.setItem('accessToken', response.data.payload.accessToken)
          // return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

// API 에러 타입 가드
export const isApiError = (error: any): error is AxiosError<ErrorResponse> => {
  return error?.response?.data?.message !== undefined
}

// 에러 메시지 추출 헬퍼
export const getErrorMessage = (error: any): string => {
  if (isApiError(error)) {
    return error.response?.data?.message || "알 수 없는 오류가 발생했습니다."
  }
  return error?.message || "네트워크 오류가 발생했습니다."
}
