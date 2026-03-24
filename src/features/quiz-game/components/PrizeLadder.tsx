import { QUIZ_PRIZE_LADDER } from "@/features/quiz-game/constants";

interface PrizeLadderProps {
  currentIndex: number;
}

export function PrizeLadder({ currentIndex }: PrizeLadderProps) {
  return (
    <aside className="rounded-[26px] border border-[#dbe4ff] bg-white p-5 shadow-[0_8px_18px_rgba(66,86,150,0.08)]">
      <h3 className="mb-4 text-[1.1rem] font-bold text-[#24314d]">
        Escada de pontos
      </h3>

      <div className="flex flex-col gap-2">
        {[...QUIZ_PRIZE_LADDER].reverse().map((value, reverseIndex) => {
          const realIndex = QUIZ_PRIZE_LADDER.length - 1 - reverseIndex;
          const isActive = realIndex === currentIndex;

          return (
            <div
              key={value}
              className={`rounded-[14px] px-4 py-3 text-sm font-bold transition ${
                isActive
                  ? "bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] text-white"
                  : "bg-[#f8faff] text-[#5f6f92]"
              }`}
            >
              {value} pts
            </div>
          );
        })}
      </div>
    </aside>
  );
}