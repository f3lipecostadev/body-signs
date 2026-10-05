import type { QuizOption } from "@/features/quiz-game/types";

export function normalizeOptions(options: QuizOption[]) {
  const copy = [...options];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}