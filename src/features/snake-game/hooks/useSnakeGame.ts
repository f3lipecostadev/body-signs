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

  const directionRef = useRef<Direction>("RIGHT");
  const snakeRef = useRef<Position[]>(initialSnake);
  const foodRef = useRef<Position>(food);
  const isStartedRef = useRef(false);
  const isPausedRef = useRef(false);
  const isGameOverRef = useRef(false);

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
    const currentDirection = directionRef.current;
    const isOpposite =
      (currentDirection === "UP" && nextDirection === "DOWN") ||
      (currentDirection === "DOWN" && nextDirection === "UP") ||
      (currentDirection === "LEFT" && nextDirection === "RIGHT") ||
      (currentDirection === "RIGHT" && nextDirection === "LEFT");

    if (isOpposite) {
      return;
    }

    directionRef.current = nextDirection;
    setDirection(nextDirection);
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
    isStartedRef.current = true;
    isPausedRef.current = false;
    isGameOverRef.current = false;
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
    if (!isStartedRef.current || isPausedRef.current || isGameOverRef.current) return;

    setSnake((currentSnake) => {
      const currentHead = currentSnake[0];
      const nextHead = { ...currentHead };
      const currentDirection = directionRef.current;

      if (currentDirection === "UP") nextHead.y -= 1;
      if (currentDirection === "DOWN") nextHead.y += 1;
      if (currentDirection === "LEFT") nextHead.x -= 1;
      if (currentDirection === "RIGHT") nextHead.x += 1;

      const willEatFood = nextHead.x === foodRef.current.x && nextHead.y === foodRef.current.y;
      const nextSnake = moveSnake(currentSnake, currentDirection, willEatFood);

      snakeRef.current = nextSnake;

      if (detectCollision(nextSnake[0], nextSnake, GRID_SIZE)) {
        isGameOverRef.current = true;
        isPausedRef.current = true;
        setIsGameOver(true);
        setIsPaused(true);
        return currentSnake;
      }

      if (willEatFood) {
        const nextQuestion = getRandomQuestion(questions, usedQuestionIds);
        const nextFood = createFood(GRID_SIZE, nextSnake);

        setScore((currentScore) => currentScore + 1);
        foodRef.current = nextFood;
        setFood(nextFood);
        isPausedRef.current = true;
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
  }, [questions, usedQuestionIds]);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    isStartedRef.current = isStarted;
  }, [isStarted]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

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