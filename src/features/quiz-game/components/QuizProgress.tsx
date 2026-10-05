interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full flex-shrink-0">
      <div className="mb-1 flex items-center justify-between sm:mb-2">
        <span className="text-[0.75rem] text-[#5f6f92] sm:text-[0.95rem]">
          Perguntas {current}/{total}
        </span>
        <span className="text-[0.7rem] text-[#5f6f92] sm:text-[0.85rem]">{percentage}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-[#eceef7] sm:h-2">
        <div
          className="h-full rounded-full bg-[#3c32af] transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
