import { useCallback, useMemo, useState } from "react";
import type {
  QuizAnswerResult,
  QuizQuestion,
} from "@/features/quiz-game/types";
import { QUIZ_TOTAL_QUESTIONS } from "@/features/quiz-game/constants";
import { getRandomQuestions } from "@/features/quiz-game/utils/getRandomQuestions";
import { normalizeOptions } from "@/features/quiz-game/utils/normalizeOptions";

export function useQuizGame(allQuestions: QuizQuestion[]) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    getRandomQuestions(allQuestions, QUIZ_TOTAL_QUESTIONS),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerResult, setAnswerResult] =
    useState<QuizAnswerResult | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return normalizeOptions(currentQuestion.options);
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    (optionId: string) => {
      if (!currentQuestion || answerResult || isFinished) return;

      const correctOption = currentQuestion.options.find(
        (option) => option.isCorrect,
      );

      const correctOptionId = correctOption?.id ?? "";
      const isCorrect = optionId === correctOptionId;

      setSelectedOptionId(optionId);
      setAnswerResult({
        selectedOptionId: optionId,
        isCorrect,
        correctOptionId,
      });

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
    },
    [answerResult, currentIndex, currentQuestion, isFinished],
  );

  const goToNextQuestion = useCallback(() => {
    if (!answerResult) return;

    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, [answerResult, currentIndex, questions.length]);

  const restart = useCallback(() => {
    const newQuestions = getRandomQuestions(
      allQuestions,
      QUIZ_TOTAL_QUESTIONS,
    );

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, [allQuestions]);

  return {
    questions,
    currentQuestion,
    currentIndex,
    total: questions.length,
    options: shuffledOptions,
    score,
    selectedOptionId,
    answerResult,
    isFinished,
    handleAnswer,
    goToNextQuestion,
    restart,
  };
}
