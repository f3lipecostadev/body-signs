import { Home, RefreshCcw } from "lucide-react";
import type { Difficulty, ReviewStat } from "../types";

interface BestScoreItem {
  score: number;
  difficulty: Difficulty;
  accuracy: number;
  createdAt: number;
}

interface GameOverModalProps {
  open: boolean;
  score: number;
  elapsedMs: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracyRate: number;
  topMistakes: ReviewStat[];
  reviewList: ReviewStat[];
  bestScores: BestScoreItem[];
  onRestart: () => void;
  onBackToStart: () => void;
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function GameOverModal({
  open,
  score,
  elapsedMs,
  answeredQuestions,
  correctAnswers,
  wrongAnswers,
  accuracyRate,
  topMistakes,
  reviewList,
  bestScores,
  onRestart,
  onBackToStart,
}: GameOverModalProps) {
  if (!open) return null;

  return (
    <div className="w-full max-w-[980px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#171e3d,#0f1530)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-8">
      <h2 className="text-3xl font-black text-white">Game Over</h2>
      <p className="mt-2 text-[#c8d1f0]">
        Sua partida terminou. Veja seu desempenho e quais sinais precisam de revisão.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.12em] text-[#9ca9d9]">Pontuação final</p>
          <p className="mt-2 text-3xl font-black text-white">{score}</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.12em] text-[#9ca9d9]">Tempo sobrevivido</p>
          <p className="mt-2 text-3xl font-black text-white">{formatTime(elapsedMs)}</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm uppercase tracking-[0.12em] text-[#9ca9d9]">Taxa de acerto</p>
          <p className="mt-2 text-3xl font-black text-white">{accuracyRate}%</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-bold text-white">Resumo do quiz</h3>
          <div className="mt-4 space-y-2 text-sm text-[#dce3ff]">
            <p>Desafios respondidos: {answeredQuestions}</p>
            <p>Acertos: {correctAnswers}</p>
            <p>Erros: {wrongAnswers}</p>
          </div>

          <h4 className="mt-5 text-base font-bold text-white">Partes mais erradas</h4>
          <div className="mt-3 space-y-2">
            {topMistakes.length > 0 ? (
              topMistakes.map((item) => (
                <div
                  key={item.bodyPart}
                  className="rounded-[16px] border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#dce3ff]"
                >
                  <span className="font-semibold text-white">{item.bodyPart}</span> — erros: {item.wrong}, acertos: {item.correct}
                </div>
              ))
            ) : (
              <p className="text-sm text-[#c8d1f0]">
                Nenhuma parte apareceu como erro recorrente nesta partida.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
          <h3 className="text-xl font-bold text-white">Melhores pontuações</h3>
          <div className="mt-4 space-y-2">
            {bestScores.length > 0 ? (
              bestScores.map((item, index) => (
                <div
                  key={`${item.createdAt}-${index}`}
                  className="flex items-center justify-between rounded-[16px] border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#dce3ff]"
                >
                  <span>
                    #{index + 1} • {item.difficulty}
                  </span>
                  <span className="font-bold text-white">
                    {item.score} pts • {item.accuracy}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#c8d1f0]">Ainda não há pontuações salvas.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[22px] border border-white/10 bg-white/5 p-5">
        <h3 className="text-xl font-bold text-white">Sinais para revisar</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {reviewList.length > 0 ? (
            reviewList.map((item) => (
              <div
                key={item.bodyPart}
                className="rounded-[16px] border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#dce3ff]"
              >
                <p className="font-semibold text-white">{item.bodyPart}</p>
                <p className="mt-1">
                  Apareceu {item.appearances} vez(es), com {item.correct} acerto(s) e {item.wrong} erro(s).
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#c8d1f0]">
              Nenhum registro de revisão nesta partida.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#7d8cff,#a66bff)] px-6 py-3 font-bold text-white"
        >
          <RefreshCcw size={18} />
          Jogar novamente
        </button>

        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 font-bold text-white"
        >
          <Home size={18} />
          Voltar ao início
        </button>
      </div>
    </div>
  );
}