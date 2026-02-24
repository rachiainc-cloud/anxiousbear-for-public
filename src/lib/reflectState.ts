export type ReflectAnswers = {
  energy: 0 | 1 | 2;      // 0 = Low, 1 = Medium, 2 = High
  sleep: 0 | 1 | 2;
  anxiety: 0 | 1 | 2;
  control: 0 | 1 | 2;
};

export type ReflectResult = {
  score: number;  // 0 ~ 8
  stateKey: "GREEN" | "YELLOW" | "ORANGE" | "RED";
  bearMessage: string;
};

/**
 * Computes a mental state classification
 * based on four reflection inputs.
 *
 * Higher score = healthier state.
 */
export function computeReflectResult(
  answers: ReflectAnswers
): ReflectResult {
  const score =
    answers.energy +
    answers.sleep +
    answers.anxiety +
    answers.control;

  let stateKey: ReflectResult["stateKey"];

  if (score >= 7) {
    stateKey = "GREEN";
  } else if (score >= 5) {
    stateKey = "YELLOW";
  } else if (score >= 3) {
    stateKey = "ORANGE";
  } else {
    stateKey = "RED";
  }

  const messages: Record<ReflectResult["stateKey"], string> = {
    GREEN:
      "You’re in a strong state today. This is a good moment to stretch your goals slightly. Try adding one meaningful task.",
    YELLOW:
      "You’re doing okay. Keep things light and manageable. Start with one small action.",
    ORANGE:
      "Energy is limited today. Lower the bar. Focus on one tiny step you can complete in 2–5 minutes.",
    RED:
      "Today is about stabilization, not performance. Breathe. Drink water. Choose just one very small task.",
  };

  return {
    score,
    stateKey,
    bearMessage: messages[stateKey],
  };
}