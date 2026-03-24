import type { QuizAnswerResult, QuizQuestion } from "@/features/quiz-game/types";
import { GameModal } from "@/components/games/GameModal";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";

interface SnakeQuestionModalProps {
  open: boolean;
  question: QuizQuestion | null;
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function SnakeQuestionModal({
  open,
  question,
  answerResult,
  selectedOptionId,
  onSelect,
}: SnakeQuestionModalProps) {
  if (!question) return null;

  return (
    <GameModal
      open={open}
      title="Responda para continuar"
      description="A cobrinha só continua se você acertar."
    >
      <div className="space-y-5">
        <div className="rounded-[18px] border border-[#dbe4ff] bg-[#f8faff] px-4 py-3">
          <p className="text-sm font-semibold uppercase tracking-[0.04em] text-[#5e6de6]">
            Pergunta
          </p>
          <h2 className="mt-2 text-[1.2rem] font-bold leading-[1.4] text-[#24314d]">
            {question.question}
          </h2>
          {question.assetLabel ? (
            <p className="mt-2 text-sm text-[#5f6f92]">{question.assetLabel}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option) => (
            <QuizOptionButton
              key={option.id}
              option={option}
              disabled={!!answerResult}
              answerResult={answerResult}
              selectedOptionId={selectedOptionId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </GameModal>
  );
}