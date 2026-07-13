import { Sparkles, Trophy } from "lucide-react";
import { GameModal } from "@/components/games/GameModal";
import { ResultScreen } from "@/components/games/ResultScreen";

interface MemoryVictoryModalProps {
  open: boolean;
  moves: number;
  time: string;
  onPlayAgain: () => void;
  onClose: () => void;
}

export function MemoryVictoryModal({
  open,
  moves,
  time,
  onPlayAgain,
  onClose,
}: MemoryVictoryModalProps) {
  return (
    <GameModal open={open} onClose={onClose}>
      <ResultScreen
        title="Você venceu!"
        description={`Você encontrou os 8 pares em ${moves} jogadas, no tempo de ${time}. O desafio foi superado com muita habilidade!`}
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 rounded-full bg-[#3c32af] px-6 py-3.5 font-bold text-white shadow-[0_12px_26px_rgba(60,50,175,0.3)] transition hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(60,50,175,0.34)]"
            >
              <Sparkles size={18} />
              Reiniciar
            </button>
          </div>
        }
      />
    </GameModal>
  );
}