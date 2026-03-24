import { Trophy } from "lucide-react";
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
        title="Parabéns!"
        description={`Você encontrou os 8 pares em ${moves} jogadas, no tempo de ${time}.`}
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-5 py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
            >
              <Trophy size={18} />
              Jogar novamente
            </button>
          </div>
        }
      />
    </GameModal>
  );
}