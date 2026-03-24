interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="rounded-[22px] border border-[#dbe4ff] bg-white p-4 shadow-[0_4px_14px_rgba(100,126,200,0.07)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.95rem] text-[#5f6f92]">Progresso</span>
        <strong className="text-[1.2rem] font-bold text-[#24314d]">
          {current}/{total}
        </strong>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#eef2ff]">
        <div
          className="h-full rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}