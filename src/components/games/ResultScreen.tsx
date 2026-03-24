import type { ReactNode } from "react";

interface ResultScreenProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function ResultScreen({
  title,
  description,
  actions,
}: ResultScreenProps) {
  return (
    <section className="rounded-[32px] border-2 border-[#cef2db] bg-gradient-to-br from-[#f0fff6] to-[#f8fffb] p-[30px] text-center shadow-[0_10px_24px_rgba(111,216,155,0.12)]">
      <h2 className="mb-[14px] text-[2.2rem] font-bold text-[#1f8f58]">
        {title}
      </h2>

      <p className="mb-5 text-[1.12rem] leading-[1.6] text-[#35634c]">
        {description}
      </p>

      {actions ? <div>{actions}</div> : null}
    </section>
  );
}