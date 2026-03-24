import type {
  QuizAnswerResult,
  QuizOption,
  QuizQuestionType,
} from "@/features/quiz-game/types";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";
import { Image as ImageIcon, Video, CheckCircle2, ListChecks, HelpCircle } from "lucide-react";

interface QuizQuestionCardProps {
  type: QuizQuestionType;
  question: string;
  assetLabel?: string;
  options: QuizOption[];
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

function QuestionBadge({
  type,
  assetLabel,
}: {
  type: QuizQuestionType;
  assetLabel?: string;
}) {
  if (type === "image") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#dbe4ff] bg-[#f8faff] px-4 py-3 text-[#5142F7]">
        <ImageIcon size={20} />
        <span className="font-semibold">{assetLabel ?? "Pergunta com imagem"}</span>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#dbe4ff] bg-[#eef4ff] px-4 py-3 text-[#3C32AF]">
        <Video size={20} />
        <span className="font-semibold">{assetLabel ?? "Pergunta baseada em vídeo"}</span>
      </div>
    );
  }

  if (type === "true-false") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#d9f0df] bg-[#f2fff5] px-4 py-3 text-[#1f8f58]">
        <CheckCircle2 size={20} />
        <span className="font-semibold">Verdadeiro ou falso</span>
      </div>
    );
  }

  if (type === "direct-answer") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#ffe3bf] bg-[#fff8ef] px-4 py-3 text-[#b56a00]">
        <HelpCircle size={20} />
        <span className="font-semibold">Resposta direta</span>
      </div>
    );
  }

  return (
    <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#e3e7ff] bg-[#f7f8ff] px-4 py-3 text-[#5e6de6]">
      <ListChecks size={20} />
      <span className="font-semibold">Múltipla escolha</span>
    </div>
  );
}

export function QuizQuestionCard({
  type,
  question,
  assetLabel,
  options,
  answerResult,
  selectedOptionId,
  onSelect,
}: QuizQuestionCardProps) {
  return (
    <section className="rounded-[26px] border border-[#dbe4ff] bg-white p-6 shadow-[0_8px_18px_rgba(66,86,150,0.08)]">
      <QuestionBadge type={type} assetLabel={assetLabel} />

      <h2 className="mb-6 text-[1.5rem] font-bold leading-[1.35] text-[#24314d]">
        {question}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
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
    </section>
  );
}