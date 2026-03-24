import { QUIZ_PRIZE_LADDER } from "@/features/quiz-game/constants";

export function getPrizeForQuestion(questionIndex: number) {
  return QUIZ_PRIZE_LADDER[questionIndex] ?? 0;
}