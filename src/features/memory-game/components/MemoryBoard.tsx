import type { MemoryCardData } from "@/features/memory-game/types";
import { MemoryCard } from "@/features/memory-game/components/MemoryCard";

interface MemoryBoardProps {
  cards: MemoryCardData[];
  flippedIds: string[];
  matchedIds: string[];
  onFlip: (card: MemoryCardData) => void;
}

/**
 * Tabuleiro 4×4 em qualquer tela. A largura é limitada pela altura livre do
 * quadro pai (cq* = container query; ele precisa ter `container-type: size`,
 * veja MemoryGamePage), então as 16 cartas sempre cabem sem rolagem.
 * 1.14 = proporção altura/largura das cartas (MemoryCard).
 */
export function MemoryBoard({
  cards,
  flippedIds,
  matchedIds,
  onFlip,
}: MemoryBoardProps) {
  return (
    <section className="mx-auto grid w-[min(100%,calc((100cqh-1.2rem)/1.14))] max-w-[960px] grid-cols-4 gap-1.5 lg:w-[min(100%,calc((100cqh-3.2rem)/1.14))] xl:gap-2.5">
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
