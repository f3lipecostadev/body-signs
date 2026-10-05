interface SnakeHudProps {
  score: number;
  speed: number;
  isPaused: boolean;
}

export function SnakeHud({ score, speed, isPaused }: SnakeHudProps) {
  return (
    <div className="flex w-full max-w-[520px] items-center justify-between gap-2 rounded-[14px] border border-[#dbe4ff] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(66,86,150,0.08)] sm:rounded-[18px] sm:px-4 sm:py-3">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.04em] sm:text-xs text-[#6b7aa5]">
          Pontuação
        </p>
        <strong className="text-base text-[#24314d] sm:text-[1.1rem]">{score}</strong>
      </div>

      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.04em] sm:text-xs text-[#6b7aa5]">
          Velocidade
        </p>
        <strong className="text-base text-[#24314d] sm:text-[1.1rem]">{speed} ms</strong>
      </div>

      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.04em] sm:text-xs text-[#6b7aa5]">
          Status
        </p>
        <strong className="text-base text-[#24314d] sm:text-[1.1rem]">
          {isPaused ? "Pausado" : "Jogando"}
        </strong>
      </div>
    </div>
  );
}