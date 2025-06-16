// API 공통 응답 타입 정의
export interface CommonResponse {
  ok: boolean;
  status: number;
  method: string;
  path: string;
  timestamp: string;
}

export interface SuccessResponse<T = any> extends CommonResponse {
  payload: T;
  message: string;
}

export interface ErrorResponse extends CommonResponse {
  message: string;
  cause?: string;
}

// 인증 관련 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenVerifyResponse {
  payload: null;
}

// 사용자 관련 타입
export interface CreateUserRequest {
  email: string;
  username: string;
  nickname: string;
  password: string;
  role: 1 | 2 | 3 | 4; // User: 1, Manager: 2, Master: 3, Admin: 4
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  nickname?: string;
  role?: 1 | 2 | 3 | 4;
}

export interface UserMeResponse {
  email: string;
  username: string;
  nickname: string;
  role: 1 | 2 | 3 | 4;
}

export interface ChangePasswordRequest {
  prevPassword: string;
  newPassword: string;
}

// 조각(Piece) 관련 타입
export type EmotionTag =
  | "anger"
  | "sadness"
  | "regret"
  | "frustration"
  | "disappointment"
  | "anxiety"
  | "shame"
  | "loneliness";

export type FailureType =
  | "relationship"
  | "work"
  | "money"
  | "health"
  | "study"
  | "family"
  | "love"
  | "career"
  | "business"
  | "other";

export type Visibility = "public" | "private";

export interface Piece {
  id: number;
  userId: number;
  content: string;
  emotionTags: EmotionTag[];
  failureType: FailureType;
  visibility: Visibility;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreatePieceRequest {
  content: string;
  emotionTags: EmotionTag[];
  failureType: FailureType;
  visibility: Visibility;
}

export interface UpdatePieceRequest {
  content?: string;
  emotionTags?: EmotionTag[];
  failureType?: FailureType;
  visibility?: Visibility;
}

export interface GetPiecesParams {
  page?: number;
  limit?: number;
  emotionTag?: EmotionTag;
  failureType?: FailureType;
  visibility?: Visibility;
  search?: string;
}

// 조립(Build) 관련 타입
export interface Build {
  id: number;
  userId: number;
  title: string;
  pieceIds: number[];
  thumbnail?: string;
  representativeEmotion: EmotionTag;
  previewText: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateBuildRequest {
  title: string;
  pieceIds: number[];
  representativeEmotion: EmotionTag;
  thumbnail?: string;
  previewText: string;
}

export interface UpdateBuildRequest {
  title?: string;
  pieceIds?: number[];
  representativeEmotion?: EmotionTag;
  thumbnail?: string;
  previewText?: string;
}

export interface GetBuildsParams {
  page?: number;
  limit?: number;
  emotion?: EmotionTag;
  search?: string;
}

// 프로필 관련 타입
export interface Profile {
  // API 스펙에서 payload가 null로 되어있어서 실제 구조는 서버 구현 확인 필요
  [key: string]: any;
}

// 정적 리소스 관련 타입
export interface ImageParams {
  type: string;
  quality: number;
  dimension?: {
    width: number;
    height: number;
  };
  rs: string;
}
