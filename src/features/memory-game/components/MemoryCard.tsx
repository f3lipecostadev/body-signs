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
          className="overflow-hidden rounded-[22px] shadow-[0_10px_20px_rgba(66,86,150,0.1)]"
        >
          <img
            src="/images/games/memory-card-back.png"
            alt="Verso da carta Body Signs"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </span>

        <span
          style={{
            ...cardFaceBaseStyle,
            transform: "rotateY(180deg)",
          }}
          className={`overflow-hidden rounded-[22px] bg-white p-0 text-center shadow-[0_8px_18px_rgba(66,86,150,0.16)] ${
            isMatched
              ? "border-[#68d991] shadow-[0_8px_18px_rgba(66,86,150,0.16),0_0_0_4px_rgba(104,217,145,0.2)]"
              : "border-[#dbe4ff]"
          }`}
        >
          {card.tipo === "imagem" ? (
            <img
              src={card.imagem}
              alt={`Sinal de ${card.nome}`}
              className="h-full w-full rounded-[20px] object-contain"
              onError={(event) => {
                // Sign image not added yet (see public/images/sinais) — fall back to the label so the card is never blank.
                event.currentTarget.style.display = "none";
                const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : null}
          {card.tipo === "imagem" ? (
            <span
              style={{ display: "none" }}
              className="h-full w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] px-3 text-center text-[clamp(1.3rem,2.6vw,1.95rem)] font-extrabold leading-[1.05] text-[#24314d]"
            >
              {card.nome}
            </span>
          ) : (
            <span className="flex h-full w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] px-3 text-[clamp(1.3rem,2.6vw,1.95rem)] font-extrabold leading-[1.05] text-[#24314d]">
              {card.nome}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}