import type { QuizQuestion } from "@/features/quiz-game/types";

export function getRandomQuestion(questions: QuizQuestion[]) {
  return questions[Math.floor(Math.random() * questions.length)];
}