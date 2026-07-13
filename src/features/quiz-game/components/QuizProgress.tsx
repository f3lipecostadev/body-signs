interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.95rem] text-[#5f6f92]">Perguntas</span>
        <span className="text-[0.85rem] text-[#5f6f92]">{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#eceef7]">
        <div
          className="h-full rounded-full bg-[#3c32af] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
