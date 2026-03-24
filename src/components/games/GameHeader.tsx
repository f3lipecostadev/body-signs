import type { ReactNode } from "react";

interface GameHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function GameHeader({
  eyebrow,
  title,
  description,
  actions,
}: GameHeaderProps) {
  return (
    <header className="mb-[32px] flex flex-wrap items-start justify-between gap-[24px]">
      <div>
        {eyebrow ? (
          <p className="m-0 text-[1rem] font-bold uppercase tracking-[0.04em] text-[#5e6de6]">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="mt-[8px] mb-[12px] text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] font-bold">
          {title}
        </h1>

        <p className="m-0 max-w-[760px] text-[1.15rem] leading-[1.6] text-[#5f6f92]">
          {description}
        </p>
      </div>

      {actions ? <div className="flex items-center gap-4">{actions}</div> : null}
    </header>
  );
}