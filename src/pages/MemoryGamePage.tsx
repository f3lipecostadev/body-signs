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
          <div className="grid w-full grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-1.5 sm:gap-2 landscape-short:grid-cols-2 lg:flex lg:max-w-[320px] lg:flex-col lg:gap-5">
            <GameStatusCard label="Jogadas" value={moves} />
            <GameStatusCard label="Pares encontrados" value={`${matches}/8`} />
            <GameStatusCard label="Tempo" value={formatTime(seconds)} highlight />

            <button
              type="button"
              onClick={resetGame}
              aria-label="Reiniciar partida"
              className="inline-flex w-11 items-center justify-center gap-2 rounded-[14px] bg-[#3c32af] text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px] landscape-short:w-auto landscape-short:py-2 lg:mt-7 lg:h-14 lg:w-full lg:rounded-full lg:px-5 lg:py-3 lg:text-lg lg:font-bold"
            >
              <RotateCcw size={18} />
              <span className="hidden lg:inline landscape-short:inline landscape-short:text-sm landscape-short:font-bold">
                Reiniciar partida
              </span>
            </button>
          </div>
        }
      >
        {/* Quadro que mede o espaço livre para o tabuleiro (container query). */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center [container-type:size] lg:px-4 lg:py-6">
          <div className="w-full max-w-[820px] rounded-[20px] border border-[#e4e8ff] bg-[#f8faff] p-2 shadow-[0_12px_30px_rgba(66,86,150,0.08)] lg:rounded-[28px] lg:p-6">
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
