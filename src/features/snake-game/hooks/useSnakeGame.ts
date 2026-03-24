import { useCallback, useEffect, useRef, useState } from "react";
import { GRID_SIZE } from "../constants";
import { createFood } from "../utils/createFood";
import { moveSnake } from "../utils/moveSnake";
import { detectCollision } from "../utils/detectCollision";
import { getRandomQuestion } from "../utils/getRandomQuestion";
import type { Direction, Position } from "../types";
import type {
  QuizAnswerResult,
  QuizQuestion,
} from "@/features/quiz-game/types";

const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];

export function useSnakeGame(questions: QuizQuestion[]) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(createFood(GRID_SIZE));
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<QuizAnswerResult | null>(null);

  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const countdownIntervalRef = useRef<number | null>(null);

  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const changeDirection = useCallback((nextDirection: Direction) => {
    setDirection((currentDirection) => {
      const isOpposite =
        (currentDirection === "UP" && nextDirection === "DOWN") ||
        (currentDirection === "DOWN" && nextDirection === "UP") ||
        (currentDirection === "LEFT" && nextDirection === "RIGHT") ||
        (currentDirection === "RIGHT" && nextDirection === "LEFT");

      if (isOpposite) return currentDirection;

      return nextDirection;
    });
  }, []);

  const resetQuestionState = useCallback(() => {
    setCurrentQuestion(null);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, []);

  const resetGame = useCallback(() => {
    clearCountdown();
    setSnake(INITIAL_SNAKE);
    setFood(createFood(GRID_SIZE));
    setDirection("RIGHT");
    setScore(0);
    setIsStarted(false);
    setIsPaused(false);
    setIsGameOver(false);
    resetQuestionState();
    setShowCorrectOverlay(false);
    setCountdown(5);
  }, [clearCountdown, resetQuestionState]);

  const resumeAfterCorrectAnswer = useCallback(() => {
    resetQuestionState();
    setShowCorrectOverlay(false);
    setCountdown(5);
    setIsPaused(false);
  }, [resetQuestionState]);

  const startCorrectCountdown = useCallback(() => {
    clearCountdown();
    setShowCorrectOverlay(true);
    setCountdown(5);

    let current = 5;

    countdownIntervalRef.current = window.setInterval(() => {
      current -= 1;
      setCountdown(current);

      if (current <= 0) {
        clearCountdown();
        resumeAfterCorrectAnswer();
      }
    }, 1000);
  }, [clearCountdown, resumeAfterCorrectAnswer]);

  const endGame = useCallback(() => {
    clearCountdown();
    setIsGameOver(true);
    setIsPaused(true);
    resetQuestionState();
    setShowCorrectOverlay(false);
    setCountdown(5);
  }, [clearCountdown, resetQuestionState]);

  const handleQuestionAnswer = useCallback(
    (optionId: string) => {
      if (!currentQuestion || answerResult) return;

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

      window.setTimeout(() => {
        if (isCorrect) {
          startCorrectCountdown();
          return;
        }

        endGame();
      }, 900);
    },
    [answerResult, currentQuestion, endGame, startCorrectCountdown],
  );

  const move = useCallback(() => {
    if (!isStarted || isPaused || isGameOver) return;

    setSnake((currentSnake) => {
      const movedSnake = moveSnake(currentSnake, direction);
      const head = movedSnake[0];

      if (detectCollision(head, movedSnake, GRID_SIZE)) {
        setIsGameOver(true);
        setIsPaused(true);
        return currentSnake;
      }

      if (head.x === food.x && head.y === food.y) {
        const grownSnake = [...movedSnake, currentSnake[currentSnake.length - 1]];

        setScore((currentScore) => currentScore + 1);
        setFood(createFood(GRID_SIZE));
        setIsPaused(true);
        setSelectedOptionId(null);
        setAnswerResult(null);
        setCurrentQuestion(getRandomQuestion(questions));

        return grownSnake;
      }

      return movedSnake;
    });
  }, [direction, food.x, food.y, isGameOver, isPaused, isStarted, questions]);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsPaused(false);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    return () => {
      clearCountdown();
    };
  }, [clearCountdown]);

  return {
    snake,
    food,
    direction,
    score,
    isStarted,
    isPaused,
    isGameOver,
    currentQuestion,
    selectedOptionId,
    answerResult,
    showCorrectOverlay,
    countdown,
    startGame,
    move,
    changeDirection,
    handleQuestionAnswer,
    endGame,
    resetGame,
  };
}