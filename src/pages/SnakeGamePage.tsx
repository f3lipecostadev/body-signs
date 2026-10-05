import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameSidebarShell } from "@/components/games/GameSidebarShell";
import { GameStatusCard } from "@/components/games/GameStatusCard";
import { quizQuestionsData } from "@/data/quizQuestions";
import { SnakeBoard } from "@/features/snake-game/components/SnakeBoard";
import { SnakeCorrectOverlay } from "@/features/snake-game/components/SnakeCorrectOverlay";
import { SnakeGameOverModal } from "@/features/snake-game/components/SnakeGameOverModal";
import { SnakeHud } from "@/features/snake-game/components/SnakeHud";
import { SnakeQuestionModal } from "@/features/snake-game/components/SnakeQuestionModal";
import { SnakeStartScreen } from "@/features/snake-game/components/SnakeStartScreen";
import { useSnakeGame } from "@/features/snake-game/hooks/useSnakeGame";
import { useSnakeLoop } from "@/features/snake-game/hooks/useSnakeLoop";
import { useSwipeControls } from "@/features/snake-game/hooks/useSwipeControls";
import { cn } from "@/lib/cn";

export function SnakeGamePage() {
  const questions = useMemo(() => quizQuestionsData, []);

  const {
    snake,
    food,
    score,
    speed,
    isStarted,
    isPaused,
    isGameOver,
    currentQuestion,
    selectedOptionId,
    answerResult,
    showCorrectOverlay,
    countdown,
    startGame,
    move,
    changeDirection,
    handleQuestionAnswer,
    resetGame,
  } = useSnakeGame(questions);

  useSnakeLoop({
    enabled: isStarted && !isPaused && !isGameOver,
    speed,
    onTick: move,
  });

  // Celular: arrastar o dedo pela tela vira a cobrinha (teclado segue valendo no PC).
  useSwipeControls({
    enabled: isStarted && !isPaused && !isGameOver,
    onSwipe: changeDirection,
  });

  return (
    <>
      <GameSidebarShell
        title="Cobrinha com Perguntas"
        lockTouch={isStarted && !isGameOver}
        sidebarExtra={
          <>
            {/* No celular a pontuação já aparece no HUD acima do tabuleiro. */}
            <GameStatusCard label="Pontuação" value={score} className="max-lg:hidden" />

            {isStarted ? (
              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3c32af] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px] lg:py-3 lg:text-base"
              >
                <RotateCcw size={18} />
                Reiniciar
              </button>
            ) : null}

            <div
              className={cn(
                "rounded-[14px] bg-[#f8faff] px-4 py-3 text-left text-[0.8rem] leading-snug text-[#4f5f84] lg:rounded-[18px] lg:px-5 lg:py-4 lg:text-sm lg:leading-normal",
                isStarted && "max-lg:hidden",
              )}
            >
              <p>
                Capture os itens do tabuleiro e responda corretamente para continuar.
                Assim, o jogador aprende de forma lúdica enquanto avança na partida.
              </p>

              <ul className="mt-2 list-disc space-y-1 pl-4 lg:mt-3">
                <li>No computador: use as setas do teclado ou W, A, S, D.</li>
                <li>No celular: arraste o dedo pela tela para virar a cobrinha.</li>
                <li>Ao capturar um item, uma pergunta será exibida.</li>
                <li>Se errar, o jogo termina.</li>
                <li>Se acertar, a partida continua após a contagem.</li>
              </ul>
            </div>
          </>
        }
        centerPanel={!isStarted}
      >
        {isStarted ? (
          <div className="flex h-full min-h-0 w-full flex-col items-center gap-2 sm:gap-3 lg:justify-center lg:gap-6">
            <SnakeHud
              score={score}
              speed={speed}
              isPaused={isPaused || !!currentQuestion}
            />

            {/* Abaixo de lg este quadro mede o espaço livre para o tabuleiro (container query). */}
            <div className="flex min-h-0 w-full flex-1 items-center justify-center [container-type:size] lg:flex-none lg:[container-type:normal]">
              <SnakeBoard snake={snake} food={food} />
            </div>
          </div>
        ) : (
          <SnakeStartScreen open={!isStarted && !isGameOver} onStart={startGame} />
        )}
      </GameSidebarShell>

      <SnakeQuestionModal
        open={!!currentQuestion && !showCorrectOverlay && !isGameOver}
        question={currentQuestion}
        answerResult={answerResult}
        selectedOptionId={selectedOptionId}
        onSelect={handleQuestionAnswer}
      />

      <SnakeCorrectOverlay open={showCorrectOverlay} countdown={countdown} />

      <SnakeGameOverModal open={isGameOver} score={score} onRestart={resetGame} />
    </>
  );
}
