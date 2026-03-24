import { useEffect, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameShell } from "@/components/games/GameShell";
import { GameStatusCard } from "@/components/games/GameStatusCard";
import { quizQuestionsData } from "@/data/quizQuestions";
import { INITIAL_SPEED } from "@/features/snake-game/constants";
import { SnakeBoard } from "@/features/snake-game/components/SnakeBoard";
import { SnakeCorrectOverlay } from "@/features/snake-game/components/SnakeCorrectOverlay";
import { SnakeGameOverModal } from "@/features/snake-game/components/SnakeGameOverModal";
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
    speed: INITIAL_SPEED,
    onTick: move,
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        changeDirection("UP");
      }

      if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        changeDirection("DOWN");
      }

      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        changeDirection("LEFT");
      }

      if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        changeDirection("RIGHT");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection]);

  return (
    <>
      <GameShell>
        <GameHeader
          eyebrow="Educativo • Cobrinha"
          title="Cobrinha com Perguntas"
          description="Pegue os pontos no tabuleiro e responda corretamente para continuar."
          actions={
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-[18px] py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
            >
              <RotateCcw size={18} />
              Reiniciar
            </button>
          }
        />

        <section className="mb-5 grid grid-cols-1 gap-[14px] md:grid-cols-3">
          <GameStatusCard label="Pontuação" value={score} />
          <GameStatusCard
            label="Estado"
            value={
              isGameOver
                ? "Game Over"
                : currentQuestion
                  ? "Respondendo"
                  : isStarted
                    ? "Jogando"
                    : "Parado"
            }
          />
          <GameStatusCard label="Controles" value="WASD / Setas" />
        </section>

        <section className="flex flex-col items-center gap-6">
          <SnakeBoard snake={snake} food={food} />
          <SnakeStartScreen open={!isStarted && !isGameOver} onStart={startGame} />
        </section>
      </GameShell>

      <SnakeQuestionModal
        open={!!currentQuestion && !showCorrectOverlay && !isGameOver}
        question={currentQuestion}
        answerResult={answerResult}
        selectedOptionId={selectedOptionId}
        onSelect={handleQuestionAnswer}
      />

      <SnakeCorrectOverlay
        open={showCorrectOverlay}
        countdown={countdown}
      />

      <SnakeGameOverModal
        open={isGameOver}
        score={score}
        onRestart={resetGame}
      />
    </>
  );
}