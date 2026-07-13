import type { QuizAnswerResult, QuizOption } from "@/features/quiz-game/types";

interface QuizOptionButtonProps {
  option: QuizOption;
  index: number;
  disabled: boolean;
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function QuizOptionButton({
  option,
  index,
  disabled,
  answerResult,
  selectedOptionId,
  onSelect,
}: QuizOptionButtonProps) {
  const isSelected = selectedOptionId === option.id;
  const isCorrect = answerResult?.correctOptionId === option.id;
  const isWrongSelected =
    answerResult?.selectedOptionId === option.id && !answerResult.isCorrect;

  let className =
    "flex w-full min-h-[72px] items-center gap-4 rounded-[18px] border px-5 py-4 text-left text-[1rem] font-semibold transition duration-200 ";

  let badgeClassName =
    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-black uppercase tracking-[0.08em] ";

  if (!answerResult) {
    className += isSelected
      ? "border-[#3c32af] bg-[#eef2ff] text-[#24314d] shadow-[0_10px_20px_rgba(60,50,175,0.12)]"
      : "border-[#dbe4ff] bg-white text-[#24314d] hover:-translate-y-[2px] hover:shadow-[0_10px_20px_rgba(66,86,150,0.12)]";
    badgeClassName += "bg-[#3c32af] text-white";
  } else if (isCorrect) {
    className += "border-[#68d991] bg-[#effff4] text-[#1f8f58] shadow-[0_10px_20px_rgba(104,217,145,0.18)]";
    badgeClassName += "bg-[#68d991] text-white";
  } else if (isWrongSelected) {
    className += "border-[#ff8b8b] bg-[#fff1f1] text-[#c53b3b] shadow-[0_10px_20px_rgba(255,139,139,0.18)]";
    badgeClassName += "bg-[#ff8b8b] text-white";
  } else {
    className += "border-[#dbe4ff] bg-[#f8faff] text-[#7b88a8]";
    badgeClassName += "bg-[#cbd7ff] text-[#24314d]";
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={className}
    >
      <span className={badgeClassName}>{LETTERS[index] ?? index + 1}</span>
      <span>{option.text}</span>
    </button>
  );
}
