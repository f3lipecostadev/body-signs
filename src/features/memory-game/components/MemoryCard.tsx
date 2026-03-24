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
  borderRadius: "22px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

export function MemoryCard({
  card,
  isFlipped,
  isMatched,
  onFlip,
}: MemoryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onFlip(card)}
      className="cursor-pointer rounded-[22px] bg-transparent p-0 focus-visible:outline-[3px] focus-visible:outline-[#90a9ff] focus-visible:outline-offset-4"
      style={{
        perspective: "1000px",
        aspectRatio: "1 / 1.14",
      }}
      aria-label="Carta do jogo da memória"
    >
      <span
        style={{
          ...cardInnerBaseStyle,
          transform: isFlipped || isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <span
          style={cardFaceBaseStyle}
          className="border border-[#dbe4ff] bg-[linear-gradient(135deg,#7c9cff,#9e86ff)] text-white shadow-[0_8px_18px_rgba(66,86,150,0.16)]"
        >
          <span className="text-[clamp(2.4rem,5vw,3.5rem)] font-extrabold leading-none">
            ?
          </span>
        </span>

        <span
          style={{
            ...cardFaceBaseStyle,
            transform: "rotateY(180deg)",
          }}
          className={`border bg-white p-3 text-center shadow-[0_8px_18px_rgba(66,86,150,0.16)] ${
            isMatched
              ? "border-[#68d991] shadow-[0_8px_18px_rgba(66,86,150,0.16),0_0_0_4px_rgba(104,217,145,0.2)]"
              : "border-[#dbe4ff]"
          }`}
        >
          {card.tipo === "imagem" ? (
            <img
              src={card.imagem}
              alt={`Sinal de ${card.nome}`}
              className="h-full max-h-[130px] w-full rounded-[12px] object-contain"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] px-2 text-[clamp(1rem,2vw,1.35rem)] font-extrabold leading-[1.2] text-[#24314d]">
              {card.nome}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}