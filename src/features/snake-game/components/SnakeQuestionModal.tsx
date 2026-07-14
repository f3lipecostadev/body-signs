import { getBodySignById } from "@/data/bodySigns";
import type { QuizAnswerResult, QuizQuestion } from "@/features/quiz-game/types";
import { GameModal } from "@/components/games/GameModal";
import { QuizOptionButton } from "@/features/quiz-game/components/QuizOptionButton";
import { QuizQuestionPanel } from "@/features/quiz-game/components/QuizQuestionPanel";

// Resolução de imagem centralizada em src/data/bodySigns.ts (getBodySignById).
// Antes esta função duplicava (com pequenas divergências!) a mesma lógica
// frágil de match por texto que existia em QuizQuestionCard.tsx — duas
// fontes de verdade diferentes para o mesmo problema, o que é uma receita
// para bugs como o do "nariz" reaparecerem de formas distintas em cada tela.

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

  const imageOption =
    question.type === "image" && question.imageId
      ? getBodySignById(question.imageId)
      : undefined;

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
          imageAlt={imageOption ? question.assetLabel ?? `Imagem do sinal ${imageOption.name}` : undefined}
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
