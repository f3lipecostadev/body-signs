interface SnakeHudProps {
  score: number;
  speed: number;
  isPaused: boolean;
}

export function SnakeHud({ score, speed, isPaused }: SnakeHudProps) {
  return (
    <div className="flex w-full max-w-[520px] items-center justify-between gap-3 rounded-[18px] border border-[#dbe4ff] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(66,86,150,0.08)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#6b7aa5]">
          Pontuação
        </p>
        <strong className="text-[1.1rem] text-[#24314d]">{score}</strong>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#6b7aa5]">
          Velocidade
        </p>
        <strong className="text-[1.1rem] text-[#24314d]">{speed} ms</strong>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-[#6b7aa5]">
          Status
        </p>
        <strong className="text-[1.1rem] text-[#24314d]">
          {isPaused ? "Pausado" : "Jogando"}
        </strong>
      </div>
    </div>
  );
}