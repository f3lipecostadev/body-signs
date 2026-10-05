import type { CSSProperties } from "react";
import type { MemoryCardData } from "@/features/memory-game/types";

interface MemoryCardProps {
  card: MemoryCardData;
  isFlipped: boolean;
  isMatched: boolean;
  onFlip: (card: MemoryCardData) => void;
}

const cardInnerBaseStyle: CSSProperties = {
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 0.55s ease",
};

const cardFaceBaseStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

// Cada face é um "container" para que o texto acompanhe o tamanho da carta
// (cqw) em telas pequenas; no desktop (lg+) vale o tamanho original.
const faceClassName =
  "overflow-hidden rounded-[12px] [container-type:inline-size] sm:rounded-[22px]";

const labelClassName =
  "flex h-full w-full items-center justify-center break-words rounded-[8px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] px-1 text-center text-[clamp(0.55rem,16cqw,1.3rem)] font-extrabold leading-[1.05] text-[#24314d] sm:rounded-[14px] sm:px-3 lg:text-[clamp(1.3rem,2.6vw,1.95rem)]";

export function MemoryCard({
  card,
  isFlipped,
  isMatched,
  onFlip,
}: MemoryCardProps) {
  const isFaceUp = isFlipped || isMatched;

  return (
    <button
      type="button"
      onClick={() => onFlip(card)}
      className="cursor-pointer touch-manipulation select-none rounded-[12px] bg-transparent p-0 [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] focus-visible:outline-[3px] focus-visible:outline-[#90a9ff] focus-visible:outline-offset-4 sm:rounded-[22px]"
      style={{
        perspective: "1000px",
        aspectRatio: "1 / 1.14",
      }}
      aria-label={
        isFaceUp
          ? card.tipo === "imagem"
            ? `Sinal de ${card.nome}`
            : card.nome
          : "Carta virada para baixo"
      }
    >
      <span
        style={{
          ...cardInnerBaseStyle,
          transform: isFaceUp ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <span
          style={cardFaceBaseStyle}
          className={`${faceClassName} shadow-[0_10px_20px_rgba(66,86,150,0.1)]`}
        >
          <img
            src="/images/games/memory-card-back.webp"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </span>

        <span
          style={{
            ...cardFaceBaseStyle,
            transform: "rotateY(180deg)",
          }}
          className={`${faceClassName} bg-white p-0 text-center shadow-[0_8px_18px_rgba(66,86,150,0.16)] ${
            isMatched
              ? "border-[#68d991] shadow-[0_8px_18px_rgba(66,86,150,0.16),0_0_0_4px_rgba(104,217,145,0.2)]"
              : "border-[#dbe4ff]"
          }`}
        >
          {card.tipo === "imagem" ? (
            <img
              src={card.imagem}
              alt=""
              className="h-full w-full rounded-[10px] object-contain sm:rounded-[20px]"
              draggable={false}
              decoding="async"
              onError={(event) => {
                // Sign image not added yet (see public/images/sinais) — fall back to the label so the card is never blank.
                event.currentTarget.style.display = "none";
                const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}
          {card.tipo === "imagem" ? (
            <span style={{ display: "none" }} className={labelClassName}>
              {card.nome}
            </span>
          ) : (
            <span className={labelClassName}>{card.nome}</span>
          )}
        </span>
      </span>
    </button>
  );
}
