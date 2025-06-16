"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { UserMeResponse } from "@/types/api";

interface AuthContextType {
  // 토큰 상태
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;

  // 사용자 상태
  user: UserMeResponse | null;
  setUser: (user: UserMeResponse | null) => void;

  // 인증 상태
  isAuthenticated: boolean;

  // 로그아웃
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<UserMeResponse | null>(null);

  // 초기화 시 localStorage에서 토큰 로드
  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");
    const savedRefreshToken = localStorage.getItem("refreshToken");

    if (savedAccessToken) {
      setAccessTokenState(savedAccessToken);
    }
    if (savedRefreshToken) {
      setRefreshTokenState(savedRefreshToken);
    }
  }, []);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const setRefreshToken = (token: string | null) => {
    setRefreshTokenState(token);
    if (token) {
      localStorage.setItem("refreshToken", token);
    } else {
      localStorage.removeItem("refreshToken");
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const isAuthenticated = !!(accessToken && user);

  const value: AuthContextType = {
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    user,
    setUser,
    isAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
