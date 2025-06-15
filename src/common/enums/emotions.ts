export const Emotions = {
  ANGER: "anger",
  SADNESS: "sadness",
  FEAR: "fear",
  DISAPPOINTMENT: "disappointment",
  FRUSTRATION: "frustration",
  ANXIETY: "anxiety",
  REGRET: "regret",
  SHAME: "shame",
} as const

export type Emotions = (typeof Emotions)[keyof typeof Emotions]

export const EmotionsList = Object.values(Emotions)

export const EmotionLabels: Record<Emotions, string> = {
  [Emotions.ANGER]: "분노",
  [Emotions.SADNESS]: "슬픔",
  [Emotions.FEAR]: "두려움",
  [Emotions.DISAPPOINTMENT]: "실망",
  [Emotions.FRUSTRATION]: "좌절",
  [Emotions.ANXIETY]: "불안",
  [Emotions.REGRET]: "후회",
  [Emotions.SHAME]: "부끄러움",
}

export const EmotionIcons: Record<Emotions, string> = {
  [Emotions.ANGER]: "😠",
  [Emotions.SADNESS]: "😢",
  [Emotions.FEAR]: "😨",
  [Emotions.DISAPPOINTMENT]: "😞",
  [Emotions.FRUSTRATION]: "😤",
  [Emotions.ANXIETY]: "😰",
  [Emotions.REGRET]: "😔",
  [Emotions.SHAME]: "😳",
}
