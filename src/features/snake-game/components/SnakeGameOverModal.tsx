import { Sparkles } from "lucide-react";
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
        title="Fim de jogo!"
        description={`Sua pontuação final foi ${score}. Tente novamente e veja se consegue uma pontuação maior!`}
        actions={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRestart}
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