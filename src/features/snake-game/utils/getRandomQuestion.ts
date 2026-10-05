import type { QuizQuestion } from "@/features/quiz-game/types";

export function getRandomQuestion(
  questions: QuizQuestion[],
  usedIds: string[],
): QuizQuestion | null {
  const availableQuestions = questions.filter(
    (question) => !usedIds.includes(question.id),
  );

  const source = availableQuestions.length ? availableQuestions : questions;

  if (!source.length) {
    return null;
  }

  return source[Math.floor(Math.random() * source.length)];
}