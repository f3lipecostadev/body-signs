import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  FlippedCard,
  MemoryCardData,
  MemorySignal,
} from "@/features/memory-game/types";
import { createMemoryDeck } from "@/features/memory-game/utils/createMemoryDeck";

export function useMemoryGame(signals: MemorySignal[]) {
  const initialDeck = useMemo(() => createMemoryDeck(signals), [signals]);

  const [deck, setDeck] = useState<MemoryCardData[]>(initialDeck);
  const [flippedCards, setFlippedCards] = useState<FlippedCard[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [hasStartedTimer, setHasStartedTimer] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const resetGame = useCallback(() => {
    setDeck(createMemoryDeck(signals));
    setFlippedCards([]);
    setMatchedIds([]);
    setMoves(0);
    setMatches(0);
    setSeconds(0);
    setIsLocked(false);
    setHasStartedTimer(false);
    setShowVictory(false);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [signals]);

  useEffect(() => {
    setDeck(initialDeck);
  }, [initialDeck]);

  useEffect(() => {
    if (!hasStartedTimer || showVictory) return;

    const interval = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [hasStartedTimer, showVictory]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const flippedIds = useMemo(
    () => flippedCards.map((card) => card.elementoId),
    [flippedCards],
  );

  const handleFlip = useCallback(
    (card: MemoryCardData) => {
      if (isLocked) return;
      if (flippedIds.includes(card.cartaId)) return;
      if (matchedIds.includes(card.cartaId)) return;
      if (flippedCards.length === 2) return;

      if (!hasStartedTimer) {
        setHasStartedTimer(true);
      }

      const nextFlipped: FlippedCard[] = [
        ...flippedCards,
        {
          elementoId: card.cartaId,
          dados: card,
        },
      ];

      setFlippedCards(nextFlipped);

      if (nextFlipped.length !== 2) return;

      setMoves((current) => current + 1);
      setIsLocked(true);

      const [first, second] = nextFlipped;

      const isMatch =
        first.dados.parId === second.dados.parId &&
        first.dados.tipo !== second.dados.tipo;

      if (isMatch) {
        setMatchedIds((current) => [
          ...current,
          first.dados.cartaId,
          second.dados.cartaId,
        ]);

        setMatches((current) => {
          const nextMatches = current + 1;

          if (nextMatches === 8) {
            setShowVictory(true);
          }

          return nextMatches;
        });

        setFlippedCards([]);
        setIsLocked(false);
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        setFlippedCards([]);
        setIsLocked(false);
      }, 950);
    },
    [flippedCards, flippedIds, hasStartedTimer, isLocked, matchedIds],
  );

  return {
    deck,
    flippedIds,
    matchedIds,
    moves,
    matches,
    seconds,
    showVictory,
    handleFlip,
    resetGame,
    closeVictory: () => setShowVictory(false),
  };
}