"use client";

/**
 * 조립 관련 TanStack Query 훅들
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildsApi } from "@/apis/builds";
import type {
  CreateBuildRequest,
  UpdateBuildRequest,
  GetBuildsParams,
} from "@/types/api";
import { getErrorMessage } from "@/apis/client";
import { useAuth } from "@/contexts/AuthContext";

export const useCreateBuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBuildRequest) => buildsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builds", "my"] });
      queryClient.invalidateQueries({ queryKey: ["builds", "feed"] });
    },
    onError: (error) => {
      console.error("Build creation failed:", getErrorMessage(error));
    },
  });
};

export const useBuildsFeed = (params?: GetBuildsParams) => {
  return useQuery({
    queryKey: ["builds", "feed", params],
    queryFn: () => buildsApi.getFeed(params),
  });
};

export const useMyBuilds = (params?: GetBuildsParams) => {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["builds", "my", params],
    queryFn: () => buildsApi.getMyBuilds(params),
    enabled: !!accessToken,
  });
};

export const useBuild = (id: string) => {
  return useQuery({
    queryKey: ["builds", id],
    queryFn: () => buildsApi.getById(id),
    enabled: !!id,
  });
};

export const useUpdateBuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBuildRequest }) =>
      buildsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["builds", "my"] });
      queryClient.invalidateQueries({ queryKey: ["builds", "feed"] });
      queryClient.invalidateQueries({ queryKey: ["builds", id] });
    },
    onError: (error) => {
      console.error("Build update failed:", getErrorMessage(error));
    },
  });
};

export const useDeleteBuild = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => buildsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builds", "my"] });
      queryClient.invalidateQueries({ queryKey: ["builds", "feed"] });
    },
    onError: (error) => {
      console.error("Build deletion failed:", getErrorMessage(error));
    },
  });
};
