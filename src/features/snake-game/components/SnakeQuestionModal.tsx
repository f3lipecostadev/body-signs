import { bodySignsData } from "@/data/bodySigns";
import type { QuizAnswerResult, QuizQuestion } from "@/features/quiz-game/types";
import { GameModal } from "@/components/games/GameModal";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";
import { QuizQuestionPanel } from "@/features/quiz-game/components/QuizQuestionPanel";

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function findImageOption(question: QuizQuestion) {
  const normalizedOptions = question.options
    .filter((option) => option.isCorrect)
    .map((option) => normalizeText(option.text));

  return bodySignsData.find((item) => {
    const normalizedName = normalizeText(item.name);

    return normalizedOptions.some((optionText) => {
      if (optionText === normalizedName) return true;

      const aliases: Record<string, string[]> = {
        olho: ["olho", "olhos"],
        cabeca: ["cabeça", "cabeca"],
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

  const imageOption = question.type === "image" ? findImageOption(question) : undefined;

  return (
    <GameModal
      open={open}
      title="Responda para continuar"
      description="Acertando a pergunta, a cobrinha segue a partida."
    >
      <div className="space-y-5">
        <QuizQuestionPanel
          type={question.type}
          question={question.question}
          assetLabel={question.assetLabel}
          imageSrc={imageOption?.image}
          imageAlt={imageOption ? `Imagem do sinal ${imageOption.name}` : undefined}
          label="Pergunta"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {question.options.map((option, index) => (
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
      </div>
    </GameModal>
  );
}
