import type { QuizQuestionType } from "@/features/quiz-game/types";

const TYPE_LABEL: Record<QuizQuestionType, string> = {
  "true-false": "Verdadeiro ou Falso",
  "multiple-choice": "Múltipla escolha",
  "direct-answer": "Resposta direta",
  image: "Pergunta com imagem",
  video: "Pergunta com vídeo",
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
  assetLabel,
  imageSrc,
  imageAlt,
  label,
}: QuizQuestionPanelProps) {
  return (
    <div className="rounded-[24px] bg-[#3c32af] p-6 shadow-[0_10px_24px_rgba(60,50,175,0.22)] md:p-8">
      <p className="text-[0.95rem] font-medium text-[#dcd9ff]">
        {label ?? TYPE_LABEL[type]}
      </p>

      {imageSrc ? (
        <div className="mt-5 overflow-hidden rounded-[20px] border border-white/15 bg-[#eef2ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <img
            src={imageSrc}
            alt={imageAlt ?? "Imagem da pergunta"}
            className="w-full max-h-[260px] object-contain"
            draggable={false}
          />
        </div>
      ) : null}

      <h2 className={`mt-5 text-[1.35rem] font-bold leading-[1.4] text-white md:text-[1.5rem] ${imageSrc ? "md:mt-6" : ""}`}>
        {question}
      </h2>
    </div>
  );
}
