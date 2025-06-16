/**
 * 인증 상태 관리 (Recoil)
 */

import { atom, selector } from "recoil"
import type { UserMeResponse } from "@/types/api"

// 인증 토큰 상태
export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      // 초기값을 localStorage에서 가져오기
      const savedToken = localStorage.getItem("accessToken")
      if (savedToken) {
        setSelf(savedToken)
      }

      // 상태 변경 시 localStorage에 저장
      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem("accessToken", newValue)
        } else {
          localStorage.removeItem("accessToken")
        }
      })
    },
  ],
})

export const refreshTokenState = atom<string | null>({
  key: "refreshTokenState",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      const savedToken = localStorage.getItem("refreshToken")
      if (savedToken) {
        setSelf(savedToken)
      }

      onSet((newValue) => {
        if (newValue) {
          localStorage.setItem("refreshToken", newValue)
        } else {
          localStorage.removeItem("refreshToken")
        }
      })
    },
  ],
})

// 사용자 정보 상태
export const userState = atom<UserMeResponse | null>({
  key: "userState",
  default: null,
})

// 인증 상태 selector
export const isAuthenticatedState = selector({
  key: "isAuthenticatedState",
  get: ({ get }) => {
    const accessToken = get(accessTokenState)
    const user = get(userState)
    return !!(accessToken && user)
  },
})

// 사용자 권한 selector
export const userRoleState = selector({
  key: "userRoleState",
  get: ({ get }) => {
    const user = get(userState)
    return user?.role || null
  },
})
