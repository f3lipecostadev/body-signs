import type { Direction, Position } from "../types";

export function moveSnake(
  snake: Position[],
  direction: Direction,
  shouldGrow = false,
): Position[] {
  const head = snake[0];
  const newHead: Position = { ...head };

  if (direction === "UP") newHead.y -= 1;
  if (direction === "DOWN") newHead.y += 1;
  if (direction === "LEFT") newHead.x -= 1;
  if (direction === "RIGHT") newHead.x += 1;

  const newSnake = [newHead, ...snake];

  if (!shouldGrow) {
    newSnake.pop();
  }

  return newSnake;
}