export const Emotions = {
  ANGER: "anger",
  SADNESS: "sadness",
  REGRET: "regret",
  FRUSTRATION: "frustration",
  DISAPPOINTMENT: "disappointment",
  ANXIETY: "anxiety",
  SHAME: "shame",
  LONELINESS: "loneliness",
} as const

export type Emotions = (typeof Emotions)[keyof typeof Emotions]

export const EmotionsList = Object.values(Emotions)

export const EmotionLabels: Record<Emotions, string> = {
  [Emotions.ANGER]: "분노",
  [Emotions.SADNESS]: "슬픔",
  [Emotions.REGRET]: "후회",
  [Emotions.FRUSTRATION]: "좌절",
  [Emotions.DISAPPOINTMENT]: "실망",
  [Emotions.ANXIETY]: "불안",
  [Emotions.SHAME]: "부끄러움",
  [Emotions.LONELINESS]: "외로움",
}

export const EmotionIcons: Record<Emotions, string> = {
  [Emotions.ANGER]: "😠",
  [Emotions.SADNESS]: "😢",
  [Emotions.REGRET]: "😔",
  [Emotions.FRUSTRATION]: "😤",
  [Emotions.DISAPPOINTMENT]: "😞",
  [Emotions.ANXIETY]: "😰",
  [Emotions.SHAME]: "😳",
  [Emotions.LONELINESS]: "😶",
}
