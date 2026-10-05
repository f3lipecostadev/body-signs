import { memo, type CSSProperties } from "react";
import { BOARD_SIZE_CSS, GRID_SIZE } from "../constants";
import type { Direction, Position } from "../types";

interface Props {
  snake: Position[];
  food: Position;
}

type BodyType =
  | "horizontal"
  | "vertical"
  | "curve-tr"
  | "curve-tl"
  | "curve-br"
  | "curve-bl";

type CellKind = "empty" | "food" | "head" | "tail" | "body";

const ROTATION: Record<Direction, string> = {
  RIGHT: "rotate(0deg)",
  DOWN: "rotate(90deg)",
  LEFT: "rotate(180deg)",
  UP: "rotate(270deg)",
};

function getDirection(from: Position, to: Position): Direction | null {
  if (to.x === from.x && to.y === from.y - 1) return "UP";
  if (to.x === from.x && to.y === from.y + 1) return "DOWN";
  if (to.x === from.x - 1 && to.y === from.y) return "LEFT";
  if (to.x === from.x + 1 && to.y === from.y) return "RIGHT";
  return null;
}

// Rotação da cabeça/cauda conforme o sentido do segmento vizinho.
function getRotation(from: Position, to: Position) {
  return ROTATION[getDirection(from, to) ?? "UP"];
}

function getBodyType(
  prev: Position,
  current: Position,
  next: Position,
): BodyType {
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

function SnakeBodyPiece({ type }: { type: BodyType }) {
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

// Cada célula só é redesenhada quando o seu conteúdo muda — são 400 células,
// e a cobrinha altera no máximo 2–3 delas por passo.
const Cell = memo(function Cell({
  kind,
  variant,
}: {
  kind: CellKind;
  variant: string;
}) {
  let content;

  if (kind === "food") content = <FoodOrb />;
  else if (kind === "head") content = <SnakeHead rotation={variant} />;
  else if (kind === "tail") content = <SnakeTail rotation={variant} />;
  else if (kind === "body") content = <SnakeBodyPiece type={variant as BodyType} />;
  else content = <EmptyTile />;

  return (
    <div className="p-[1px]">
      <div className="relative h-full w-full">{content}</div>
    </div>
  );
});

export function SnakeBoard({ snake, food }: Props) {
  const snakeIndexByCell = new Map<number, number>();
  snake.forEach((segment, index) => {
    snakeIndexByCell.set(segment.y * GRID_SIZE + segment.x, index);
  });

  const foodCell = food.y * GRID_SIZE + food.x;

  return (
    <div className="relative w-full overflow-visible">
      <div className="absolute left-1/2 top-0 h-[88%] w-[86%] -translate-x-1/2 rounded-full bg-[#7c92ff]/10 blur-[80px]" />

      <div
        // Telas pequenas: o tabuleiro ocupa o maior quadrado que cabe no
        // espaço disponível (cq*). Desktop (lg+): tamanho fixo em BOARD_SIZE_CSS.
        className="relative mx-auto grid w-[min(96cqw,96cqh)] overflow-hidden rounded-[20px] border border-[#2a3857] bg-[radial-gradient(circle_at_top,#24324a,#0f172a_62%)] p-1.5 shadow-[0_34px_70px_rgba(15,23,42,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] sm:rounded-[34px] sm:p-3 lg:w-(--board-size)"
        style={
          {
            "--board-size": BOARD_SIZE_CSS,
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
            aspectRatio: "1 / 1",
            transform: "perspective(1400px) rotateX(12deg) scale(1.03)",
          } as CSSProperties
        }
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, cell) => {
          const index = snakeIndexByCell.get(cell);
          let kind: CellKind = cell === foodCell ? "food" : "empty";
          let variant = "";

          if (index !== undefined) {
            if (index === 0) {
              kind = "head";
              variant = snake[1]
                ? getRotation(snake[1], snake[0])
                : ROTATION.RIGHT;
            } else if (index === snake.length - 1) {
              kind = "tail";
              variant = getRotation(snake[index - 1], snake[index]);
            } else {
              kind = "body";
              variant = getBodyType(
                snake[index - 1],
                snake[index],
                snake[index + 1],
              );
            }
          }

          return <Cell key={cell} kind={kind} variant={variant} />;
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-[10%] bottom-[-10px] mx-auto h-[30px] rounded-full bg-[rgba(15,23,42,0.36)] blur-[20px] lg:bottom-[-26px] lg:h-[56px]" />
    </div>
  );
}
