import type { Direction } from "../types";

interface SnakeControlsProps {
  onChangeDirection: (direction: Direction) => void;
}

export function SnakeControls({ onChangeDirection }: SnakeControlsProps) {
  const buttonClass =
    "flex h-14 w-14 items-center justify-center rounded-[16px] border border-white/10 bg-white/5 text-white text-xl font-black";

  return (
    <div className="mt-5 flex flex-col items-center gap-2 md:hidden">
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChangeDirection("UP")}
      >
        ↑
      </button>

      <div className="flex gap-2">
        <button
          type="button"
          className={buttonClass}
          onClick={() => onChangeDirection("LEFT")}
        >
          ←
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => onChangeDirection("DOWN")}
        >
          ↓
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => onChangeDirection("RIGHT")}
        >
          →
        </button>
      </div>
    </div>
  );
}