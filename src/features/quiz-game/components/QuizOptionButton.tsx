import type { QuizAnswerResult, QuizOption } from "@/features/quiz-game/types";

interface QuizOptionButtonProps {
  option: QuizOption;
  disabled: boolean;
  answerResult: QuizAnswerResult | null;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function QuizOptionButton({
  option,
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
    "w-full rounded-[18px] border px-5 py-4 text-left text-[1rem] font-semibold transition duration-200 ";

  if (!answerResult) {
    className += isSelected
      ? "border-[#7d8cff] bg-[#eef2ff] text-[#24314d]"
      : "border-[#dbe4ff] bg-white text-[#24314d] hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(66,86,150,0.12)]";
  } else if (isCorrect) {
    className += "border-[#68d991] bg-[#effff4] text-[#1f8f58]";
  } else if (isWrongSelected) {
    className += "border-[#ff8b8b] bg-[#fff1f1] text-[#c53b3b]";
  } else {
    className += "border-[#dbe4ff] bg-[#f8faff] text-[#7b88a8]";
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={className}
    >
      {option.text}
    </button>
  );
}