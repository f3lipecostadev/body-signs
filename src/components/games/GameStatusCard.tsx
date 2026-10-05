import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GameStatusCardProps {
  label: string;
  value: ReactNode;
  highlight?: boolean;
  className?: string;
}

export function GameStatusCard({
  label,
  value,
  highlight = false,
  className,
}: GameStatusCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[60px] w-full flex-col items-center justify-center gap-1 rounded-[14px] border px-1 py-2 lg:min-h-[110px] lg:gap-2 lg:rounded-[22px] lg:px-5 lg:py-5",
        highlight
          ? "border-transparent bg-[var(--highlight,#ddef46)] shadow-[0_6px_18px_rgba(180,200,20,0.2)]"
          : "border-[#dbe4ff] bg-white shadow-[0_6px_18px_rgba(100,126,200,0.1)]",
        className,
      )}
    >
      <span className="text-center text-[0.55rem] font-semibold min-[360px]:text-[0.6rem] uppercase leading-tight tracking-[0.06em] text-[#4f5f84] sm:text-[0.7rem] lg:text-[0.95rem] lg:tracking-[0.12em]">
        {label}
      </span>
      <strong className="text-[1.05rem] font-extrabold leading-none min-[360px]:text-[1.2rem] text-[#24314d] lg:text-[2rem]">
        {value}
      </strong>
    </div>
  );
}
