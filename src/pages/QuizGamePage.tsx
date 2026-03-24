import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameShell } from "@/components/games/GameShell";
import { quizQuestionsData } from "@/data/quizQuestions";
import { QUIZ_TIME_PER_QUESTION } from "@/features/quiz-game/constants";
import { PrizeLadder } from "@/features/quiz-game/components/PrizeLadder";
import { QuizProgress } from "@/features/quiz-game/components/QuizProgress";
import { QuizQuestionCard } from "@/features/quiz-game/components/QuizQuestionCard";
import { QuizResultModal } from "@/features/quiz-game/components/QuizResultModal";
import { QuizTimer } from "@/features/quiz-game/components/QuizTimer";
import { useQuizGame } from "@/features/quiz-game/hooks/useQuizGame";

export function QuizGamePage() {
  const questions = useMemo(() => quizQuestionsData, []);

  const {
    currentQuestion,
    currentIndex,
    total,
    options,
    timeLeft,
    score,
    selectedOptionId,
    answerResult,
    isFinished,
    handleAnswer,
    restart,
  } = useQuizGame(questions);

  if (!currentQuestion) return null;

  return (
    <>
      <GameShell>
        <GameHeader
          eyebrow="Educativo • Quiz"
          title="Quiz Interativo"
          description="Responda às perguntas e avance na escada de pontos."
          actions={
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-[18px] py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
            >
              <RotateCcw size={18} />
              Reiniciar
            </button>
          }
        />

        <section className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <QuizProgress current={currentIndex + 1} total={total} />
            <QuizTimer
              timeLeft={timeLeft}
              totalTime={QUIZ_TIME_PER_QUESTION}
            />
          </div>

          <PrizeLadder currentIndex={currentIndex} />
        </section>

      <QuizQuestionCard
        type={currentQuestion.type}
        question={currentQuestion.question}
        assetLabel={currentQuestion.assetLabel}
        options={options}
        answerResult={answerResult}
        selectedOptionId={selectedOptionId}
        onSelect={handleAnswer}
        />
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