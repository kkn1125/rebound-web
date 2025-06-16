"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";
import type { Piece, EmotionTag, FailureType, Visibility } from "@/types/api";

// 조각 필터 타입
interface PieceFilters {
  emotionTag?: EmotionTag;
  failureType?: FailureType;
  visibility?: Visibility;
  search: string;
}

// 조립 필터 타입
interface BuildFilters {
  emotion?: EmotionTag;
  search: string;
  sortBy: "latest" | "popular";
}

interface AppStateContextType {
  // 조각 관련 상태
  pieceFilters: PieceFilters;
  setPieceFilters: (
    filters: PieceFilters | ((prev: PieceFilters) => PieceFilters)
  ) => void;
  selectedPieces: string[];
  setSelectedPieces: (
    pieces: string[] | ((prev: string[]) => string[])
  ) => void;
  assembledPieces: Piece[];
  setAssembledPieces: (pieces: Piece[] | ((prev: Piece[]) => Piece[])) => void;

  // 조립 관련 상태
  buildFilters: BuildFilters;
  setBuildFilters: (
    filters: BuildFilters | ((prev: BuildFilters) => BuildFilters)
  ) => void;

  // UI 상태
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  // 조각 관련 상태
  const [pieceFilters, setPieceFilters] = useState<PieceFilters>({
    emotionTag: undefined,
    failureType: undefined,
    visibility: undefined,
    search: "",
  });

  const [selectedPieces, setSelectedPieces] = useState<string[]>([]);
  const [assembledPieces, setAssembledPieces] = useState<Piece[]>([]);

  // 조립 관련 상태
  const [buildFilters, setBuildFilters] = useState<BuildFilters>({
    emotion: undefined,
    search: "",
    sortBy: "latest",
  });

  // UI 상태
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value: AppStateContextType = {
    pieceFilters,
    setPieceFilters,
    selectedPieces,
    setSelectedPieces,
    assembledPieces,
    setAssembledPieces,
    buildFilters,
    setBuildFilters,
    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
