import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

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
    <header className="mb-3 flex flex-wrap items-start justify-between gap-3 sm:mb-6 sm:gap-[24px] md:mb-8">
      <div className="flex items-start gap-3 sm:gap-5">
        <Link
          to="/jogos"
          aria-label="Voltar para os jogos"
          className="mt-[2px] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_2px_8px_rgba(66,86,150,0.12)] transition hover:-translate-y-[1px] sm:mt-[6px] sm:h-11 sm:w-11"
        >
          <ArrowLeft size={16} className="sm:hidden" />
          <ArrowLeft size={20} className="hidden sm:block" />
        </Link>

        <div>
          {eyebrow ? (
            <p className="m-0 hidden text-[1rem] font-bold uppercase tracking-[0.04em] text-[#5e6de6] sm:block">
              {eyebrow}
            </p>
          ) : null}

          <h1 className="mt-0 mb-1 text-[1.4rem] leading-[1.15] font-bold sm:mt-[8px] sm:mb-[12px] sm:text-[2rem] md:text-[2.6rem] lg:text-[clamp(2.4rem,4vw,3.6rem)]">
            {title}
          </h1>

          <p className="m-0 hidden max-w-[760px] text-[0.9rem] leading-[1.5] text-[#5f6f92] sm:block sm:text-[1.05rem] md:text-[1.15rem]">
            {description}
          </p>
        </div>
      </div>

      {actions ? <div className="flex items-center gap-4">{actions}</div> : null}
    </header>
  );
}
