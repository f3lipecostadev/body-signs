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
    handleQuestionAnswer,
    resetGame,
  } = useSnakeGame(questions);

  useSnakeLoop({
    enabled: isStarted && !isPaused && !isGameOver,
    speed,
    onTick: move,
  });

  return (
    <>
      <GameSidebarShell
        title="Cobrinha com Perguntas"
        sidebarExtra={
          <>
            <GameStatusCard label="Pontuação" value={score} />

            {isStarted ? (
              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3c32af] px-5 py-3 font-bold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px]"
              >
                <RotateCcw size={18} />
                Reiniciar
              </button>
            ) : null}

            <div className="rounded-[18px] bg-[#f8faff] px-5 py-4 text-left text-sm text-[#4f5f84]">
              <p>
                Capture os itens do tabuleiro e responda corretamente para continuar.
                Assim, o jogador aprende de forma lúdica enquanto avança na partida.
              </p>

              <ul className="mt-3 space-y-1 list-disc pl-4">
                <li>Use as setas do teclado ou W, A, S, D.</li>
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
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <SnakeHud
              score={score}
              speed={speed}
              isPaused={isPaused || !!currentQuestion}
            />

            <SnakeBoard snake={snake} food={food} />
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
