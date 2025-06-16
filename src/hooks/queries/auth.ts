"use client";

/**
 * 인증 관련 TanStack Query 훅들
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/apis/auth";
import type { LoginRequest } from "@/types/api";
import { getErrorMessage } from "@/apis/client";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      // 토큰 저장
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);

      // 사용자 정보 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error) => {
      console.error("Login failed:", getErrorMessage(error));
    },
  });
};

export const useVerifyToken = () => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["auth", "verify"],
    queryFn: () => authApi.verifyToken(),
    enabled: !!accessToken,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => {
      logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // 모든 캐시 클리어
      queryClient.clear();
    },
  });
};
