import type { Position } from "../types";

export function createFood(gridSize: number, snake: Position[]): Position {
  const freeCells: Position[] = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const occupied = snake.some((segment) => segment.x === x && segment.y === y);

      if (!occupied) {
        freeCells.push({ x, y });
      }
    }
  }

  if (!freeCells.length) {
    return { x: 0, y: 0 };
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}