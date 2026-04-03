import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CORRECT_COUNTDOWN_SECONDS,
  GRID_SIZE,
  INITIAL_SNAKE_SIZE,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_STEP,
} from "../constants";
import { createFood } from "../utils/ createFood";
import { moveSnake } from "../utils/moveSnake";
import { detectCollision } from "../utils/detectCollision";
import { getRandomQuestion } from "../utils/getRandomQuestion";
import type { Direction, Position } from "../types";
import type {
  QuizAnswerResult,
  QuizQuestion,
} from "@/features/quiz-game/types";

const createInitialSnake = (): Position[] => {
  const startX = 9;
  const startY = 10;

  return Array.from({ length: INITIAL_SNAKE_SIZE }).map((_, index) => ({
    x: startX - index,
    y: startY,
  }));
};

export function useSnakeGame(questions: QuizQuestion[]) {
  const initialSnake = useMemo(() => createInitialSnake(), []);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(() => createFood(GRID_SIZE, initialSnake));
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [score, setScore] = useState(0);

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<QuizAnswerResult | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);

  const [showCorrectOverlay, setShowCorrectOverlay] = useState(false);
  const [countdown, setCountdown] = useState(CORRECT_COUNTDOWN_SECONDS);

  const countdownIntervalRef = useRef<number | null>(null);

  const speed = useMemo(() => {
    const calculatedSpeed = INITIAL_SPEED - score * SPEED_STEP;
    return Math.max(calculatedSpeed, MIN_SPEED);
  }, [score]);

  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current !== null) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const resetQuestionState = useCallback(() => {
    setCurrentQuestion(null);
    setSelectedOptionId(null);
    setAnswerResult(null);
  }, []);

  const changeDirection = useCallback((nextDirection: Direction) => {
    setDirection((currentDirection) => {
      const isOpposite =
        (currentDirection === "UP" && nextDirection === "DOWN") ||
        (currentDirection === "DOWN" && nextDirection === "UP") ||
        (currentDirection === "LEFT" && nextDirection === "RIGHT") ||
        (currentDirection === "RIGHT" && nextDirection === "LEFT");

      if (isOpposite) {
        return currentDirection;
      }

      return nextDirection;
    });
  }, []);

  const endGame = useCallback(() => {
    clearCountdown();
    setIsGameOver(true);
    setIsPaused(true);
    setShowCorrectOverlay(false);
    setCountdown(CORRECT_COUNTDOWN_SECONDS);
    resetQuestionState();
  }, [clearCountdown, resetQuestionState]);

  const resumeAfterCorrectAnswer = useCallback(() => {
    resetQuestionState();
    setShowCorrectOverlay(false);
    setCountdown(CORRECT_COUNTDOWN_SECONDS);
    setIsPaused(false);
  }, [resetQuestionState]);

  const startCorrectCountdown = useCallback(() => {
    clearCountdown();
    setShowCorrectOverlay(true);
    setCountdown(CORRECT_COUNTDOWN_SECONDS);

    let current = CORRECT_COUNTDOWN_SECONDS;

    countdownIntervalRef.current = window.setInterval(() => {
      current -= 1;
      setCountdown(current);

      if (current <= 0) {
        clearCountdown();
        resumeAfterCorrectAnswer();
      }
    }, 1000);
  }, [clearCountdown, resumeAfterCorrectAnswer]);

  const resetGame = useCallback(() => {
    const newInitialSnake = createInitialSnake();

    clearCountdown();
    setSnake(newInitialSnake);
    setFood(createFood(GRID_SIZE, newInitialSnake));
    setDirection("RIGHT");
    setScore(0);
    setIsStarted(false);
    setIsPaused(false);
    setIsGameOver(false);
    setUsedQuestionIds([]);
    setShowCorrectOverlay(false);
    setCountdown(CORRECT_COUNTDOWN_SECONDS);
    resetQuestionState();
  }, [clearCountdown, resetQuestionState]);

  const startGame = useCallback(() => {
    setIsStarted(true);
    setIsPaused(false);
    setIsGameOver(false);
  }, []);

  const handleQuestionAnswer = useCallback(
    (optionId: string) => {
      if (!currentQuestion || answerResult) return;

      const correctOption = currentQuestion.options.find((option) => option.isCorrect);
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
        } else {
          endGame();
        }
      }, 700);
    },
    [answerResult, currentQuestion, endGame, startCorrectCountdown],
  );

  const move = useCallback(() => {
    if (!isStarted || isPaused || isGameOver) return;

    setSnake((currentSnake) => {
      const currentHead = currentSnake[0];
      const nextHead = { ...currentHead };

      if (direction === "UP") nextHead.y -= 1;
      if (direction === "DOWN") nextHead.y += 1;
      if (direction === "LEFT") nextHead.x -= 1;
      if (direction === "RIGHT") nextHead.x += 1;

      const willEatFood = nextHead.x === food.x && nextHead.y === food.y;
      const nextSnake = moveSnake(currentSnake, direction, willEatFood);

      if (detectCollision(nextSnake[0], nextSnake, GRID_SIZE)) {
        setIsGameOver(true);
        setIsPaused(true);
        return currentSnake;
      }

      if (willEatFood) {
        const nextQuestion = getRandomQuestion(questions, usedQuestionIds);

        setScore((currentScore) => currentScore + 1);
        setFood(createFood(GRID_SIZE, nextSnake));
        setIsPaused(true);
        setSelectedOptionId(null);
        setAnswerResult(null);
        setCurrentQuestion(nextQuestion);

        if (nextQuestion) {
          setUsedQuestionIds((currentIds) => [...currentIds, nextQuestion.id]);
        }

        return nextSnake;
      }

      return nextSnake;
    });
  }, [direction, food.x, food.y, isGameOver, isPaused, isStarted, questions, usedQuestionIds]);

  useEffect(() => {
    return () => {
      clearCountdown();
    };
  }, [clearCountdown]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isStarted || isGameOver) return;

      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        changeDirection("UP");
      }

      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        changeDirection("DOWN");
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        changeDirection("LEFT");
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        changeDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, isGameOver, isStarted]);

  return {
    snake,
    food,
    direction,
    score,
    speed,
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