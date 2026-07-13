import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameSidebarShell } from "@/components/games/GameSidebarShell";
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
      <GameSidebarShell
        title="Jogo da Memória"
        titleClassName="text-center"
        sidebarClassName="items-center text-center"
        sidebarExtra={
          <>
            <div className="flex w-full max-w-[320px] flex-col gap-5 text-center">
              <GameStatusCard label="Jogadas" value={moves} />
              <GameStatusCard label="Pares encontrados" value={`${matches}/8`} />
              <GameStatusCard label="Tempo" value={formatTime(seconds)} highlight />
            </div>

            <button
              type="button"
              onClick={resetGame}
              className="mt-4 inline-flex h-14 w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-[#3c32af] px-5 py-3 text-lg font-bold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px]"
            >
              <RotateCcw size={18} />
              Reiniciar partida
            </button>
          </>
        }
      >
        <div className="flex h-full w-full items-center justify-center px-4 py-6">
          <div className="w-full max-w-[820px] rounded-[28px] border border-[#e4e8ff] bg-[#f8faff] p-6 shadow-[0_12px_30px_rgba(66,86,150,0.08)]">
            <MemoryBoard
              cards={deck}
              flippedIds={flippedIds}
              matchedIds={matchedIds}
              onFlip={handleFlip}
            />
          </div>
        </div>
      </GameSidebarShell>

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
