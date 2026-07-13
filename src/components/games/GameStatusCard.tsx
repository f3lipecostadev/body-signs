import type { ReactNode } from "react";

interface GameStatusCardProps {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}

export function GameStatusCard({ label, value, highlight = false }: GameStatusCardProps) {
  return (
    <div
      className={`flex min-h-[110px] w-full flex-col items-center justify-center gap-2 rounded-[22px] border px-5 py-5 ${
        highlight
          ? "border-transparent bg-[var(--highlight,#ddef46)] shadow-[0_6px_18px_rgba(180,200,20,0.2)]"
          : "border-[#dbe4ff] bg-white shadow-[0_6px_18px_rgba(100,126,200,0.1)]"
      }`}
    >
      <span className="text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-[#4f5f84]">{label}</span>
      <strong className="text-[2rem] font-extrabold leading-none text-[#24314d]">{value}</strong>
    </div>
  );
}
