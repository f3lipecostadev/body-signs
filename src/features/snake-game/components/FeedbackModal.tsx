import { CheckCircle2, XCircle } from "lucide-react";
import type { QuizAnswerResult, QuizQuestion } from "../types";

interface FeedbackModalProps {
  open: boolean;
  question: QuizQuestion | null;
  answerResult: QuizAnswerResult | null;
  onContinue: () => void;
}

export function FeedbackModal({
  open,
  question,
  answerResult,
  onContinue,
}: FeedbackModalProps) {
  if (!open || !question || !answerResult) return null;

  const correctOption = question.options.find(
    (option) => option.id === answerResult.correctOptionId,
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#050814]/82 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[640px] rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,#171e3d,#0f1530)] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="flex items-start gap-4">
          <div
            className={`mt-1 rounded-full p-2 ${
              answerResult.isCorrect ? "bg-green-500/15" : "bg-red-500/15"
            }`}
          >
            {answerResult.isCorrect ? (
              <CheckCircle2 className="text-green-300" size={28} />
            ) : (
              <XCircle className="text-red-300" size={28} />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">
              {answerResult.isCorrect
                ? "Correto! Você ganhou bônus."
                : "Não foi dessa vez."}
            </h2>

            <p className="mt-2 text-[15px] leading-7 text-[#d7def9]">
              {answerResult.isCorrect
                ? question.explanation
                : `O sinal correto era ${correctOption?.label ?? question.bodyPart}. ${question.explanation}`}
            </p>

            <p className="mt-3 text-sm text-[#aab7e8]">
              O jogo continuará automaticamente em instantes.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-6 rounded-full bg-[linear-gradient(135deg,#7d8cff,#a66bff)] px-6 py-3 font-bold text-white"
        >
          Continuar agora
        </button>
      </div>
    </div>
  );
}
