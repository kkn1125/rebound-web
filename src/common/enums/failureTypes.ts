export const FailureTypes = {
  RELATIONSHIP: "relationship",
  WORK: "work",
  MONEY: "money",
  HEALTH: "health",
  STUDY: "study",
  FAMILY: "family",
  LOVE: "love",
  CAREER: "career",
  BUSINESS: "business",
  OTHER: "other",
} as const

export type FailureTypes = (typeof FailureTypes)[keyof typeof FailureTypes]

export const FailureTypesList = Object.values(FailureTypes)

export const FailureTypeLabels: Record<FailureTypes, string> = {
  [FailureTypes.RELATIONSHIP]: "인간관계",
  [FailureTypes.WORK]: "업무/직장",
  [FailureTypes.MONEY]: "경제/재정",
  [FailureTypes.HEALTH]: "건강",
  [FailureTypes.STUDY]: "학업/성장",
  [FailureTypes.FAMILY]: "가족",
  [FailureTypes.LOVE]: "연애/결혼",
  [FailureTypes.CAREER]: "커리어",
  [FailureTypes.BUSINESS]: "사업",
  [FailureTypes.OTHER]: "기타",
}
