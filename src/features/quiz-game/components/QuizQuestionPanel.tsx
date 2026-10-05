import type { QuizQuestionType } from "@/features/quiz-game/types";

const TYPE_LABEL: Record<QuizQuestionType, string> = {
  "true-false": "Verdadeiro ou Falso",
  "multiple-choice": "Múltipla escolha",
  "direct-answer": "Resposta direta",
  image: "Pergunta com imagem",
};

interface QuizQuestionPanelProps {
  type: QuizQuestionType;
  question: string;
  assetLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  label?: string;
}

export function QuizQuestionPanel({
  type,
  question,
  imageSrc,
  imageAlt,
  label,
}: QuizQuestionPanelProps) {
  return (
    <div className="rounded-[16px] bg-[#3c32af] p-3 shadow-[0_10px_24px_rgba(60,50,175,0.22)] sm:rounded-[20px] sm:p-5 md:rounded-[24px] md:p-8">
      <p className="text-[0.7rem] font-medium text-[#dcd9ff] sm:text-[0.85rem] md:text-[0.95rem]">
        {label ?? TYPE_LABEL[type]}
      </p>

      {imageSrc ? (
        <div className="mt-2 overflow-hidden rounded-[12px] border border-white/15 bg-[#eef2ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:mt-3 sm:rounded-[16px] md:mt-5 md:rounded-[20px]">
          <img
            src={imageSrc}
            alt={imageAlt ?? "Imagem da pergunta"}
            className="max-h-[110px] w-full object-contain sm:max-h-[160px] md:max-h-[220px] lg:max-h-[260px]"
            draggable={false}
          />
        </div>
      ) : null}

      <h2 className={`mt-2 text-[1rem] font-bold leading-[1.3] text-white sm:mt-3 sm:text-[1.2rem] md:text-[1.35rem] lg:text-[1.5rem] ${imageSrc ? "sm:mt-4 md:mt-6" : ""}`}>
        {question}
      </h2>
    </div>
  );
}
