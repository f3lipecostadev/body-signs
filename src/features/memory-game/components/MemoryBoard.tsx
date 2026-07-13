import type { MemoryCardData } from "@/features/memory-game/types";
import { MemoryCard } from "@/features/memory-game/components/MemoryCard";

interface MemoryBoardProps {
  cards: MemoryCardData[];
  flippedIds: string[];
  matchedIds: string[];
  onFlip: (card: MemoryCardData) => void;
}

export function MemoryBoard({
  cards,
  flippedIds,
  matchedIds,
  onFlip,
}: MemoryBoardProps) {
  return (
    <section className="mx-auto grid w-full max-w-[960px] grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 md:gap-1.5 xl:gap-2.5">
      {cards.map((card) => (
        <MemoryCard
          key={card.cartaId}
          card={card}
          isFlipped={flippedIds.includes(card.cartaId)}
          isMatched={matchedIds.includes(card.cartaId)}
          onFlip={onFlip}
        />
      ))}
    </section>
  );
}