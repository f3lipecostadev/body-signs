import { useMemo } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameShell } from "@/components/games/GameShell";
import { quizQuestionsData } from "@/data/quizQuestions";
import { QuizProgress } from "@/features/quiz-game/components/QuizProgress";
import { QuizQuestionCard } from "@/features/quiz-game/components/QuizQuestionCard";
import { QuizResultModal } from "@/features/quiz-game/components/QuizResultModal";
import { useQuizGame } from "@/features/quiz-game/hooks/useQuizGame";

export function QuizGamePage() {
  const questions = useMemo(() => quizQuestionsData, []);

  const {
    currentQuestion,
    currentIndex,
    total,
    options,
    score,
    selectedOptionId,
    answerResult,
    isFinished,
    handleAnswer,
    goToNextQuestion,
    restart,
  } = useQuizGame(questions);

  if (!currentQuestion) return null;

  return (
    <>
      <GameShell>
        <GameHeader
          eyebrow="Educativo • Quiz"
          title="Quiz Interativo"
          description="Responda as perguntas antes do tempo esgotar."
          actions={
            <button
              type="button"
              onClick={restart}
              aria-label="Reiniciar quiz"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#3c32af] px-3 py-2 text-sm font-bold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px] sm:gap-2 sm:px-[18px] sm:py-3 sm:text-base"
            >
              <RotateCcw size={16} className="sm:hidden" />
              <RotateCcw size={18} className="hidden sm:block" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          }
        />

        <div className="mx-auto flex w-full min-h-0 max-w-[860px] flex-1 flex-col justify-center gap-2 sm:gap-4 md:gap-6">
          <QuizProgress current={currentIndex + 1} total={total} />

          <QuizQuestionCard
            type={currentQuestion.type}
            question={currentQuestion.question}
            assetLabel={currentQuestion.assetLabel}
            imageId={currentQuestion.imageId}
            options={options}
            answerResult={answerResult}
            selectedOptionId={selectedOptionId}
            onSelect={handleAnswer}
          />

          <button
            type="button"
            disabled={!answerResult}
            onClick={goToNextQuestion}
            className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-[14px] border border-[#dbe4ff] bg-white px-4 py-2.5 text-sm font-bold text-[#24314d] transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:-translate-y-[2px] enabled:hover:shadow-[0_8px_18px_rgba(66,86,150,0.12)] sm:rounded-[16px] sm:px-5 sm:py-3.5 sm:text-base md:py-4"
          >
            Próxima
            <ArrowRight size={18} />
          </button>
        </div>
      </GameShell>

      <QuizResultModal
        open={isFinished}
        score={score}
        reachedQuestion={currentIndex + 1}
        totalQuestions={total}
        onRestart={restart}
      />
    </>
  );
}
