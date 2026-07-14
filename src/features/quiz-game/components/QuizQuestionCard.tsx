import { getBodySignById } from "@/data/bodySigns";
import type {
  QuizAnswerResult,
  QuizOption,
  QuizQuestionType,
} from "@/features/quiz-game/types";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";
import { QuizQuestionPanel } from "@/features/quiz-game/components/QuizQuestionPanel";

interface QuizQuestionCardProps {
  type: QuizQuestionType;
  question: string;
  assetLabel?: string;
  imageId?: string;
  options: QuizOption[];
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function QuizQuestionCard({
  type,
  question,
  assetLabel,
  imageId,
  options,
  answerResult,
  selectedOptionId,
  onSelect,
}: QuizQuestionCardProps) {
  // Resolução da imagem: SEMPRE via `imageId`, que referencia diretamente
  // o `id` de um item em bodySignsData. Nada de adivinhar o sinal a partir
  // do texto da alternativa correta — isso era frágil e silenciosamente
  // falhava sempre que o bodySignsData não continha uma entrada com nome
  // igual (ou "aliasado") ao texto da resposta.
  const imageOption = type === "image" && imageId ? getBodySignById(imageId) : undefined;

  if (import.meta.env.DEV && type === "image" && !imageId) {
    console.warn(
      `[QuizQuestionCard] Pergunta "${question}" é do tipo "image" mas não define "imageId". Nenhuma imagem será exibida.`,
    );
  }
  if (import.meta.env.DEV && type === "image" && imageId && !imageOption) {
    console.warn(
      `[QuizQuestionCard] imageId "${imageId}" não existe em bodySignsData. Verifique src/data/bodySigns.ts.`,
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <QuizQuestionPanel
        type={type}
        question={question}
        assetLabel={assetLabel}
        imageSrc={imageOption?.image}
        imageAlt={imageOption ? assetLabel ?? `Imagem do sinal ${imageOption.name}` : undefined}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((option, index) => (
          <QuizOptionButton
            key={option.id}
            option={option}
            index={index}
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
