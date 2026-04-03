import { BOARD_PIXEL_SIZE, GRID_SIZE } from "../constants";
import type { Position } from "../types";

interface Props {
  snake: Position[];
  food: Position;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

function getDirection(from: Position, to: Position): Direction | null {
  if (to.x === from.x && to.y === from.y - 1) return "UP";
  if (to.x === from.x && to.y === from.y + 1) return "DOWN";
  if (to.x === from.x - 1 && to.y === from.y) return "LEFT";
  if (to.x === from.x + 1 && to.y === from.y) return "RIGHT";
  return null;
}

function getSnakeIndexAt(x: number, y: number, snake: Position[]) {
  return snake.findIndex((segment) => segment.x === x && segment.y === y);
}

function getHeadRotation(head: Position, neck?: Position) {
  if (!neck) return "rotate(0deg)";

  const direction = getDirection(neck, head);

  if (direction === "RIGHT") return "rotate(0deg)";
  if (direction === "DOWN") return "rotate(90deg)";
  if (direction === "LEFT") return "rotate(180deg)";
  return "rotate(270deg)";
}

function getTailRotation(tailPrev: Position, tail: Position) {
  const direction = getDirection(tailPrev, tail);

  if (direction === "RIGHT") return "rotate(0deg)";
  if (direction === "DOWN") return "rotate(90deg)";
  if (direction === "LEFT") return "rotate(180deg)";
  return "rotate(270deg)";
}

function getBodyType(
  prev: Position,
  current: Position,
  next: Position,
): "horizontal" | "vertical" | "curve-tr" | "curve-tl" | "curve-br" | "curve-bl" {
  const fromPrev = getDirection(current, prev);
  const toNext = getDirection(current, next);

  const dirs = [fromPrev, toNext];

  const hasLeft = dirs.includes("LEFT");
  const hasRight = dirs.includes("RIGHT");
  const hasUp = dirs.includes("UP");
  const hasDown = dirs.includes("DOWN");

  if (hasLeft && hasRight) return "horizontal";
  if (hasUp && hasDown) return "vertical";

  if (hasUp && hasRight) return "curve-tr";
  if (hasUp && hasLeft) return "curve-tl";
  if (hasDown && hasRight) return "curve-br";
  return "curve-bl";
}

function SnakeHead({ rotation }: { rotation: string }) {
  return (
    <div
      className="relative h-full w-full transition-transform duration-150"
      style={{ transform: rotation }}
    >
      <div className="absolute inset-[4%] rounded-[46%] bg-[linear-gradient(145deg,#ffe89a_0%,#ffd45c_40%,#ffbf3f_100%)] shadow-[inset_0_3px_8px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(130,70,0,0.12),0_12px_22px_rgba(255,191,63,0.28)]" />

      <div className="absolute left-[16%] top-[14%] h-[24%] w-[34%] rounded-full bg-white/18 blur-[2px]" />

      <div className="absolute left-[58%] top-[28%] h-[16%] w-[16%] rounded-full bg-[#111827]" />
      <div className="absolute left-[58%] top-[56%] h-[16%] w-[16%] rounded-full bg-[#111827]" />

      <div className="absolute left-[63%] top-[32%] h-[6%] w-[6%] rounded-full bg-white/80" />
      <div className="absolute left-[63%] top-[60%] h-[6%] w-[6%] rounded-full bg-white/80" />

      <div className="absolute right-[6%] top-[41%] h-[14%] w-[10%] rounded-full bg-[#ff9f7a]/90 blur-[0.5px]" />

      <div className="absolute right-[3%] top-[46%] h-[2px] w-[10%] rounded-full bg-[#ff6b6b]" />
    </div>
  );
}

function SnakeTail({ rotation }: { rotation: string }) {
  return (
    <div
      className="relative h-full w-full transition-transform duration-150"
      style={{ transform: rotation }}
    >
      <div className="absolute left-[8%] top-[14%] h-[72%] w-[72%] rounded-l-[999px] rounded-r-[42%] bg-[linear-gradient(145deg,#9cabff,#7085ff)] shadow-[inset_0_2px_6px_rgba(255,255,255,0.32),0_10px_16px_rgba(99,123,255,0.2)]" />
      <div className="absolute left-[18%] top-[20%] h-[18%] w-[28%] rounded-full bg-white/16 blur-[1px]" />
    </div>
  );
}

function SnakeBodyPiece({
  type,
}: {
  type: "horizontal" | "vertical" | "curve-tr" | "curve-tl" | "curve-br" | "curve-bl";
}) {
  const common =
    "absolute bg-[linear-gradient(145deg,#a7b5ff_0%,#7c92ff_45%,#5f74ff_100%)] shadow-[inset_0_3px_7px_rgba(255,255,255,0.26),inset_0_-3px_7px_rgba(33,44,110,0.18),0_10px_18px_rgba(99,123,255,0.22)]";

  if (type === "horizontal") {
    return (
      <div className="relative h-full w-full">
        <div className={`${common} left-[0%] top-[10%] h-[80%] w-[100%] rounded-full`} />
        <div className="absolute left-[12%] top-[18%] h-[18%] w-[42%] rounded-full bg-white/16 blur-[1px]" />
      </div>
    );
  }

  if (type === "vertical") {
    return (
      <div className="relative h-full w-full">
        <div className={`${common} left-[10%] top-[0%] h-[100%] w-[80%] rounded-full`} />
        <div className="absolute left-[18%] top-[12%] h-[40%] w-[18%] rounded-full bg-white/16 blur-[1px]" />
      </div>
    );
  }

  if (type === "curve-tr") {
    return (
      <div className="relative h-full w-full">
        <div className={`${common} right-[10%] top-[0%] h-[66%] w-[80%] rounded-full`} />
        <div className={`${common} right-[0%] top-[10%] h-[80%] w-[66%] rounded-full`} />
        <div className="absolute right-[22%] top-[12%] h-[16%] w-[24%] rounded-full bg-white/14 blur-[1px]" />
      </div>
    );
  }

  if (type === "curve-tl") {
    return (
      <div className="relative h-full w-full">
        <div className={`${common} left-[10%] top-[0%] h-[66%] w-[80%] rounded-full`} />
        <div className={`${common} left-[0%] top-[10%] h-[80%] w-[66%] rounded-full`} />
        <div className="absolute left-[22%] top-[12%] h-[16%] w-[24%] rounded-full bg-white/14 blur-[1px]" />
      </div>
    );
  }

  if (type === "curve-br") {
    return (
      <div className="relative h-full w-full">
        <div className={`${common} right-[10%] bottom-[0%] h-[66%] w-[80%] rounded-full`} />
        <div className={`${common} right-[0%] bottom-[10%] h-[80%] w-[66%] rounded-full`} />
        <div className="absolute right-[22%] bottom-[12%] h-[16%] w-[24%] rounded-full bg-white/14 blur-[1px]" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className={`${common} left-[10%] bottom-[0%] h-[66%] w-[80%] rounded-full`} />
      <div className={`${common} left-[0%] bottom-[10%] h-[80%] w-[66%] rounded-full`} />
      <div className="absolute left-[22%] bottom-[12%] h-[16%] w-[24%] rounded-full bg-white/14 blur-[1px]" />
    </div>
  );
}

function FoodOrb() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff1f5_0%,#ff8ab0_30%,#ff5f8b_55%,#e11d48_100%)] shadow-[0_0_24px_rgba(255,107,154,0.7),inset_0_3px_8px_rgba(255,255,255,0.4)]" />
      <div className="absolute left-[24%] top-[20%] h-[18%] w-[18%] rounded-full bg-white/70 blur-[1px]" />
      <div className="absolute inset-[4%] animate-pulse rounded-full border border-white/15" />
    </div>
  );
}

function EmptyTile() {
  return (
    <div className="relative h-full w-full rounded-[12px] bg-[linear-gradient(180deg,#111827,#0b1220)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="absolute inset-[12%] rounded-[10px] border border-white/[0.02]" />
    </div>
  );
}

export function SnakeBoard({ snake, food }: Props) {
  return (
    <div className="relative w-full overflow-visible">
      <div className="absolute left-1/2 top-0 h-[88%] w-[86%] -translate-x-1/2 rounded-full bg-[#7c92ff]/10 blur-[80px]" />

      <div
        className="relative mx-auto grid overflow-hidden rounded-[34px] border border-[#2a3857] bg-[radial-gradient(circle_at_top,#24324a,#0f172a_62%)] p-3 shadow-[0_34px_70px_rgba(15,23,42,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: BOARD_PIXEL_SIZE,
          height: BOARD_PIXEL_SIZE,
          transform: "perspective(1400px) rotateX(12deg) scale(1.03)",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const index = getSnakeIndexAt(x, y, snake);
          const isFood = food.x === x && food.y === y;

          let content = <EmptyTile />;

          if (isFood) {
            content = <FoodOrb />;
          }

          if (index !== -1) {
            if (index === 0) {
              content = <SnakeHead rotation={getHeadRotation(snake[0], snake[1])} />;
            } else if (index === snake.length - 1) {
              content = (
                <SnakeTail rotation={getTailRotation(snake[index - 1], snake[index])} />
              );
            } else {
              const type = getBodyType(
                snake[index - 1],
                snake[index],
                snake[index + 1],
              );

              content = <SnakeBodyPiece type={type} />;
            }
          }

          return (
            <div key={`${x}-${y}`} className="p-[1px]">
              <div className="relative h-full w-full">
                {content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-[10%] bottom-[-26px] mx-auto h-[56px] rounded-full bg-[rgba(15,23,42,0.36)] blur-[20px]" />
    </div>
  );
}