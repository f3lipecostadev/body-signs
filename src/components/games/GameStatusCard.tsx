import type { ReactNode } from "react";

interface GameStatusCardProps {
  label: string;
  value: ReactNode;
}

export function GameStatusCard({ label, value }: GameStatusCardProps) {
  return (
    <div className="flex min-h-[110px] flex-col justify-center gap-[8px] rounded-[26px] border border-[#dbe4ff] bg-white px-[24px] py-5 shadow-[0_4px_14px_rgba(100,126,200,0.07)]">
      <span className="text-[1.05rem] text-[#5f6f92]">{label}</span>
      <strong className="text-[1.7rem] font-bold">{value}</strong>
    </div>
  );
}