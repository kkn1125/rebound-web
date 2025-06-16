"use client";

/**
 * 조각 관련 TanStack Query 훅들
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { piecesApi } from "@/apis/pieces";
import type {
  CreatePieceRequest,
  UpdatePieceRequest,
  GetPiecesParams,
} from "@/types/api";
import { getErrorMessage } from "@/apis/client";
import { useAuth } from "@/contexts/AuthContext";

export const useCreatePiece = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePieceRequest) => piecesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pieces", "my"] });
    },
    onError: (error) => {
      console.error("Piece creation failed:", getErrorMessage(error));
    },
  });
};

export const useMyPieces = (params?: GetPiecesParams) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["pieces", "my", params],
    queryFn: () => piecesApi.getMyPieces(params),
    enabled: !!accessToken,
  });
};

export const usePiece = (id: string) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["pieces", id],
    queryFn: () => piecesApi.getById(id),
    enabled: !!id && !!accessToken,
  });
};

export const useUpdatePiece = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePieceRequest }) =>
      piecesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["pieces", "my"] });
      queryClient.invalidateQueries({ queryKey: ["pieces", id] });
    },
    onError: (error) => {
      console.error("Piece update failed:", getErrorMessage(error));
    },
  });
};

export const useDeletePiece = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => piecesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pieces", "my"] });
    },
    onError: (error) => {
      console.error("Piece deletion failed:", getErrorMessage(error));
    },
  });
};
