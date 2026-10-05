import type { Direction, Position } from "../types";

export function getNextHead(head: Position, direction: Direction): Position {
  const nextHead: Position = { ...head };

  if (direction === "UP") nextHead.y -= 1;
  if (direction === "DOWN") nextHead.y += 1;
  if (direction === "LEFT") nextHead.x -= 1;
  if (direction === "RIGHT") nextHead.x += 1;

  return nextHead;
}

export function moveSnake(
  snake: Position[],
  direction: Direction,
  shouldGrow = false,
): Position[] {
  const newSnake = [getNextHead(snake[0], direction), ...snake];

  if (!shouldGrow) {
    newSnake.pop();
  }

  return newSnake;
}
