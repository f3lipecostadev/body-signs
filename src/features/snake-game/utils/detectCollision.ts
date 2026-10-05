import type { Position } from "../types";

export function detectCollision(
  head: Position,
  snake: Position[],
  gridSize: number,
) {
  if (head.x < 0 || head.y < 0 || head.x >= gridSize || head.y >= gridSize) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}