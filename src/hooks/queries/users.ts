/**
 * 사용자 관련 TanStack Query 훅들
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "@/apis/users"
import type { CreateUserRequest, UpdateUserRequest, ChangePasswordRequest } from "@/types/api"
import { getErrorMessage } from "@/apis/client"

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersApi.create(data),
    onError: (error) => {
      console.error("User creation failed:", getErrorMessage(error))
    },
  })
}

export const useUserMe = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => usersApi.getMe(),
    enabled: !!localStorage.getItem("accessToken"),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => usersApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] })
    },
    onError: (error) => {
      console.error("User update failed:", getErrorMessage(error))
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      queryClient.clear()
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    },
    onError: (error) => {
      console.error("User deletion failed:", getErrorMessage(error))
    },
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => usersApi.changePassword(data),
    onError: (error) => {
      console.error("Password change failed:", getErrorMessage(error))
    },
  })
}
