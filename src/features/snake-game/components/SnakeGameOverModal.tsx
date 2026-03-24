import { RotateCcw } from "lucide-react";
import { GameModal } from "@/components/games/GameModal";
import { ResultScreen } from "@/components/games/ResultScreen";

interface SnakeGameOverModalProps {
  open: boolean;
  score: number;
  onRestart: () => void;
}

export function SnakeGameOverModal({
  open,
  score,
  onRestart,
}: SnakeGameOverModalProps) {
  return (
    <GameModal open={open}>
      <ResultScreen
        title="Game Over"
        description={`Sua pontuação final foi ${score}. Reinicie para tentar novamente.`}
        actions={
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-5 py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
          >
            <RotateCcw size={18} />
            Jogar novamente
          </button>
        }
      />
    </GameModal>
  );
}