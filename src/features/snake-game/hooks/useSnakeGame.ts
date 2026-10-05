import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CORRECT_COUNTDOWN_SECONDS,
  GRID_SIZE,
  INITIAL_SNAKE_SIZE,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_STEP,
} from "../constants";
import { createFood } from "../utils/createFood";
import { getNextHead, moveSnake } from "../utils/moveSnake";
import { detectCollision } from "../utils/detectCollision";
import { getRandomQuestion } from "../utils/getRandomQuestion";
import type { Direction, Position } from "../types";
import type {
  QuizAnswerResult,
  QuizQuestion,
} from "@/features/quiz-game/types";

const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

const KEY_TO_DIRECTION: Record<string, Direction> = {
  arrowup: "UP",
  w: "UP",
  arrowdown: "DOWN",
  s: "DOWN",
  arrowleft: "LEFT",
  a: "LEFT",
  arrowright: "RIGHT",
  d: "RIGHT",
};

// Quantas curvas rápidas ficam guardadas até o próximo passo da cobrinha.
const MAX_QUEUED_TURNS = 2;

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
  const [score, setScore] = useState(0);

  // Direção do último passo dado + curvas ainda não executadas. A validação
  // usa essas duas informações (e não só a última tecla/gesto), assim dois
  // comandos rápidos entre um passo e outro nunca fazem a cobrinha "voltar".
  const lastMovedDirectionRef = useRef<Direction>("RIGHT");
  const queuedDirectionsRef = useRef<Direction[]>([]);
  // snakeRef/foodRef são a fonte da verdade usada pelo loop (move); os estados
  // correspondentes existem apenas para renderizar.
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
    if (!isStartedRef.current || isPausedRef.current || isGameOverRef.current) {
      return;
    }

    const queue = queuedDirectionsRef.current;
    const reference = queue[queue.length - 1] ?? lastMovedDirectionRef.current;

    if (
      nextDirection === reference ||
      nextDirection === OPPOSITE_DIRECTION[reference]
    ) {
      return;
    }

    if (queue.length >= MAX_QUEUED_TURNS) return;

    queue.push(nextDirection);
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

    const newFood = createFood(GRID_SIZE, newInitialSnake);

    clearCountdown();
    snakeRef.current = newInitialSnake;
    foodRef.current = newFood;
    setSnake(newInitialSnake);
    setFood(newFood);
    lastMovedDirectionRef.current = "RIGHT";
    queuedDirectionsRef.current = [];
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

    const direction =
      queuedDirectionsRef.current.shift() ?? lastMovedDirectionRef.current;
    lastMovedDirectionRef.current = direction;

    const currentSnake = snakeRef.current;
    const nextHead = getNextHead(currentSnake[0], direction);
    const willEatFood =
      nextHead.x === foodRef.current.x && nextHead.y === foodRef.current.y;
    const nextSnake = moveSnake(currentSnake, direction, willEatFood);

    if (detectCollision(nextSnake[0], nextSnake, GRID_SIZE)) {
      isGameOverRef.current = true;
      isPausedRef.current = true;
      setIsGameOver(true);
      setIsPaused(true);
      return;
    }

    snakeRef.current = nextSnake;
    setSnake(nextSnake);

    if (!willEatFood) return;

    const nextQuestion = getRandomQuestion(questions, usedQuestionIds);
    const nextFood = createFood(GRID_SIZE, nextSnake);

    foodRef.current = nextFood;
    isPausedRef.current = true;

    setScore((currentScore) => currentScore + 1);
    setFood(nextFood);
    setIsPaused(true);
    setSelectedOptionId(null);
    setAnswerResult(null);
    setCurrentQuestion(nextQuestion);

    if (nextQuestion) {
      setUsedQuestionIds((currentIds) => [...currentIds, nextQuestion.id]);
    }
  }, [questions, usedQuestionIds]);

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
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const direction = KEY_TO_DIRECTION[event.key.toLowerCase()];
      if (!direction) return;

      // Evita que as setas rolem a página enquanto joga.
      event.preventDefault();
      changeDirection(direction);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, isGameOver, isStarted]);

  return {
    snake,
    food,
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