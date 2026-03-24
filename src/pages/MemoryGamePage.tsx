import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameShell } from "@/components/games/GameShell";
import { GameStatusCard } from "@/components/games/GameStatusCard";
import { bodySignsData } from "@/data/bodySigns";
import { MemoryBoard } from "@/features/memory-game/components/MemoryBoard";
import { MemoryVictoryModal } from "@/features/memory-game/components/MemoryVictoryModal";
import { useMemoryGame } from "@/features/memory-game/hooks/useMemoryGame";
import { formatTime } from "@/features/memory-game/utils/formatTime";

export function MemoryGamePage() {
  const signals = useMemo(
    () =>
      bodySignsData.map((item) => ({
        nome: item.name,
        imagem: item.image,
      })),
    [],
  );

  const {
    deck,
    flippedIds,
    matchedIds,
    moves,
    matches,
    seconds,
    showVictory,
    handleFlip,
    resetGame,
    closeVictory,
  } = useMemoryGame(signals);

  return (
    <>
      <GameShell>
        <GameHeader
          eyebrow="Educativo • Corpo Humano"
          title="Jogo da Memória"
          description="Encontre os pares corretos entre a imagem e o nome de cada sinal."
          actions={
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-[18px] py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
            >
              <RotateCcw size={18} />
              Nova partida
            </button>
          }
        />

        <section className="mb-5 grid grid-cols-1 gap-[14px] md:grid-cols-3">
          <GameStatusCard label="Jogadas" value={moves} />
          <GameStatusCard label="Pares encontrados" value={`${matches}/8`} />
          <GameStatusCard label="Tempo" value={formatTime(seconds)} />
        </section>

        <MemoryBoard
          cards={deck}
          flippedIds={flippedIds}
          matchedIds={matchedIds}
          onFlip={handleFlip}
        />
      </GameShell>

      <MemoryVictoryModal
        open={showVictory}
        moves={moves}
        time={formatTime(seconds)}
        onPlayAgain={resetGame}
        onClose={closeVictory}
      />
    </>
  );
}