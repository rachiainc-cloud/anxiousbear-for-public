import { Session } from "../api/sessions";

export function deriveHomeSummary(data: Session[]) {
  const total = data.length;
  const completed = data.filter((s) => s.completed).length;

  const todayRatio = total === 0 ? 0 : completed / total;
  const anxietyLevel = 100 - todayRatio * 100;

  const bearBlur = anxietyLevel;
  const bearOpacity = 1 - todayRatio * 0.5;

  return {
    total,
    completed,
    todayRatio,
    anxietyLevel,
    bearBlur,
    bearOpacity,
  };
}