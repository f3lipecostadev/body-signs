import { GRID_SIZE } from "../constants";
import type { Position } from "../types";

interface Props {
  snake: Position[];
  food: Position;
}

export function SnakeBoard({ snake, food }: Props) {
  return (
    <div
      className="grid bg-[#111] rounded-[12px]"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        width: 400,
        height: 400,
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
        const x = i % GRID_SIZE;
        const y = Math.floor(i / GRID_SIZE);

        const isSnake = snake.some((s) => s.x === x && s.y === y);
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={i}
            className={`border border-[#222] ${
              isSnake ? "bg-[#7d8cff]" : isFood ? "bg-red-500" : ""
            }`}
          />
        );
      })}
    </div>
  );
}