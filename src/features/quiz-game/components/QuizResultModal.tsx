import { Trophy } from "lucide-react";
import { GameModal } from "@/components/games/GameModal";
import { ResultScreen } from "@/components/games/ResultScreen";

interface QuizResultModalProps {
  open: boolean;
  score: number;
  reachedQuestion: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function QuizResultModal({
  open,
  score,
  reachedQuestion,
  totalQuestions,
  onRestart,
}: QuizResultModalProps) {
  return (
    <GameModal open={open}>
      <ResultScreen
        title="Fim de jogo"
        description={`Você chegou até a pergunta ${reachedQuestion} de ${totalQuestions} e terminou com ${score} pontos.`}
        actions={
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-5 py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
          >
            <Trophy size={18} />
            Jogar novamente
          </button>
        }
      />
    </GameModal>
  );
}