import type { MemoryCardData, MemorySignal } from "@/features/memory-game/types";
import { createUniqueId } from "@/features/memory-game/utils/ids";
import { shuffle } from "@/features/memory-game/utils/shuffle";

function drawEightSignals(signals: MemorySignal[]) {
  return shuffle(signals).slice(0, 8);
}

export function createMemoryDeck(signals: MemorySignal[]): MemoryCardData[] {
  const selectedSignals = drawEightSignals(signals);

  const deck: MemoryCardData[] = [];

  selectedSignals.forEach((signal) => {
    const pairId = createUniqueId();

    deck.push({
      cartaId: createUniqueId(),
      parId: pairId,
      tipo: "imagem",
      nome: signal.nome,
      imagem: signal.imagem,
    });

    deck.push({
      cartaId: createUniqueId(),
      parId: pairId,
      tipo: "texto",
      nome: signal.nome,
      imagem: signal.imagem,
    });
  });

  return shuffle(deck);
}