import { useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { GameHeader } from "@/components/games/GameHeader";
import { GameShell } from "@/components/games/GameShell";
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

  const gameStateLabel = isGameOver
    ? "Fim de jogo"
    : currentQuestion
      ? "Respondendo"
      : isStarted
        ? isPaused
          ? "Pausado"
          : "Jogando"
        : "Parado";

  return (
    <>
      <GameShell>
        <GameHeader
          eyebrow="Educativo • Cobrinha"
          title="Cobrinha com Perguntas"
          description="Capture os itens do tabuleiro e responda corretamente para continuar jogando."
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
          <GameStatusCard label="Estado" value={gameStateLabel} />
          <GameStatusCard label="Controles" value="WASD / Setas" />
        </section>

        <section className="flex flex-col items-center gap-6">
          {isStarted ? (
            <>
              <SnakeHud
                score={score}
                speed={speed}
                isPaused={isPaused || !!currentQuestion}
              />

              <SnakeBoard snake={snake} food={food} />

              <div className="w-full max-w-[520px] rounded-[18px] border border-[#dbe4ff] bg-white px-5 py-4 text-sm text-[#51627f] shadow-[0_8px_18px_rgba(66,86,150,0.08)]">
                <p className="font-semibold text-[#24314d]">
                  Como funciona
                </p>
                <p className="mt-2">
                  Controle a cobrinha usando o teclado. Sempre que capturar um item,
                  uma pergunta será aberta. Ao acertar, você continua a partida. Se
                  errar, o jogo termina.
                </p>
              </div>
            </>
          ) : (
            <SnakeStartScreen open={!isStarted && !isGameOver} onStart={startGame} />
          )}
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