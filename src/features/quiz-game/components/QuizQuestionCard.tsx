import { bodySignsData } from "@/data/bodySigns";
import type {
  QuizAnswerResult,
  QuizOption,
  QuizQuestionType,
} from "@/features/quiz-game/types";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";
import { QuizQuestionPanel } from "@/features/quiz-game/components/QuizQuestionPanel";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function findImageOption(options: QuizOption[]) {
  const normalizedOptions = options
    .filter((option) => option.isCorrect)
    .map((option) => normalizeText(option.text));

  return bodySignsData.find((item) => {
    const normalizedName = normalizeText(item.name);

    return normalizedOptions.some((optionText) => {
      if (optionText === normalizedName) return true;

      const aliases: Record<string, string[]> = {
        olho: ["olho", "olhos"],
        cabeca: ["cabeça", "cabeca", "cabeça"],
        orelha: ["orelha", "orelhas"],
        boca: ["boca", "bocas"],
        testa: ["testa"],
        queixo: ["queixo"],
        ombro: ["ombro", "ombros"],
        mao: ["mão", "mao", "mãos", "maos"],
        pe: ["pé", "pe", "pés"],
        lingua: ["língua", "lingua"],
      };

      const aliasList = aliases[normalizedName] ?? [];
      return aliasList.includes(optionText);
    });
  });
}

interface QuizQuestionCardProps {
  type: QuizQuestionType;
  question: string;
  assetLabel?: string;
  options: QuizOption[];
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
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
  const imageOption = type === "image" ? findImageOption(options) : undefined;

  return (
    <section className="flex flex-col gap-5">
      <QuizQuestionPanel
        type={type}
        question={question}
        assetLabel={assetLabel}
        imageSrc={imageOption?.image}
        imageAlt={imageOption ? `Imagem do sinal ${imageOption.name}` : undefined}
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
