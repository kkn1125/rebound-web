export const FailureTypes = {
  WORK: "work",
  RELATIONSHIP: "relationship",
  HEALTH: "health",
  FINANCE: "finance",
  STUDY: "study",
  FAMILY: "family",
  LOVE: "love",
  OTHER: "other",
} as const

export type FailureTypes = (typeof FailureTypes)[keyof typeof FailureTypes]

export const FailureTypesList = Object.values(FailureTypes)

export const FailureTypeLabels: Record<FailureTypes, string> = {
  [FailureTypes.WORK]: "업무/직장",
  [FailureTypes.RELATIONSHIP]: "인간관계",
  [FailureTypes.HEALTH]: "건강",
  [FailureTypes.FINANCE]: "경제/재정",
  [FailureTypes.STUDY]: "학업/성장",
  [FailureTypes.FAMILY]: "가족",
  [FailureTypes.LOVE]: "연애/결혼",
  [FailureTypes.OTHER]: "기타",
}
