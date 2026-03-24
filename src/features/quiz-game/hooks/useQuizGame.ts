import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  QuizAnswerResult,
  QuizQuestion,
} from "@/features/quiz-game/types";
import {
  QUIZ_TIME_PER_QUESTION,
  QUIZ_TOTAL_QUESTIONS,
} from "@/features/quiz-game/constants";
import { getRandomQuestions } from "@/features/quiz-game/utils/getRandomQuestions";
import { normalizeOptions } from "@/features/quiz-game/utils/normalizeOptions";
import { getPrizeForQuestion } from "@/features/quiz-game/utils/score";

export function useQuizGame(allQuestions: QuizQuestion[]) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    getRandomQuestions(allQuestions, QUIZ_TOTAL_QUESTIONS),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_PER_QUESTION);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerResult, setAnswerResult] =
    useState<QuizAnswerResult | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const answerTimeoutRef = useRef<number | null>(null);

  const currentQuestion = questions[currentIndex];

  const shuffledOptions = useMemo(() => {
    if (!currentQuestion) return [];
    return normalizeOptions(currentQuestion.options);
  }, [currentQuestion]);

  const goToNextQuestion = useCallback(() => {
    setCurrentIndex((index) => index + 1);
    setTimeLeft(QUIZ_TIME_PER_QUESTION);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, []);

  const finishQuiz = useCallback(() => {
    setIsFinished(true);
  }, []);

  const handleAnswer = useCallback(
    (optionId: string | null) => {
      if (!currentQuestion || answerResult || isFinished) return;

      const correctOption = currentQuestion.options.find(
        (option) => option.isCorrect,
      );

      const correctOptionId = correctOption?.id ?? "";
      const isCorrect = optionId === correctOptionId;

      setSelectedOptionId(optionId);
      setAnswerResult({
        selectedOptionId: optionId ?? "",
        isCorrect,
        correctOptionId,
      });

      if (isCorrect) {
        setScore(getPrizeForQuestion(currentIndex));
      }

      if (answerTimeoutRef.current) {
        window.clearTimeout(answerTimeoutRef.current);
      }

      answerTimeoutRef.current = window.setTimeout(() => {
        if (!isCorrect) {
          finishQuiz();
          return;
        }

        if (currentIndex + 1 >= questions.length) {
          finishQuiz();
          return;
        }

        goToNextQuestion();
      }, 1200);
    },
    [
      answerResult,
      currentIndex,
      currentQuestion,
      finishQuiz,
      goToNextQuestion,
      isFinished,
      questions.length,
    ],
  );

  useEffect(() => {
    if (isFinished || answerResult) return;

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          handleAnswer(null);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [answerResult, handleAnswer, isFinished]);

  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current) {
        window.clearTimeout(answerTimeoutRef.current);
      }
    };
  }, []);

  const restart = useCallback(() => {
    if (answerTimeoutRef.current) {
      window.clearTimeout(answerTimeoutRef.current);
    }

    const newQuestions = getRandomQuestions(
      allQuestions,
      QUIZ_TOTAL_QUESTIONS,
    );

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(QUIZ_TIME_PER_QUESTION);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, [allQuestions]);

  return {
    questions,
    currentQuestion,
    currentIndex,
    total: questions.length,
    options: shuffledOptions,
    timeLeft,
    score,
    selectedOptionId,
    answerResult,
    isFinished,
    handleAnswer,
    restart,
  };
}