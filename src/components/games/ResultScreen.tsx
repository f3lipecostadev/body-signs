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
    <section className="relative overflow-hidden rounded-[32px] border border-[#e4e8ff] bg-[linear-gradient(135deg,#f7f9ff_0%,#f9fbff_55%,#f3f7ff_100%)] p-[30px] text-center shadow-[0_12px_30px_rgba(66,86,150,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,140,255,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(104,217,145,0.1),_transparent_35%)]" />

      <div className="relative z-10">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2ff] shadow-[0_8px_20px_rgba(125,140,255,0.14)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="#5e6de6" strokeWidth="2" className="h-8 w-8">
              <path d="M12 3l2.3 4.7L19 10l-4.7 2.3L12 17l-2.3-4.7L5 10l4.7-2.3L12 3z" />
              <path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            </svg>
          </div>
        </div>

        <h2 className="mb-[12px] text-[2.15rem] font-black tracking-tight text-[#24314d] sm:text-[2.45rem]">
          {title}
        </h2>

        <p className="mx-auto mb-6 max-w-[620px] text-[1.05rem] leading-[1.7] text-[#5f6f92] sm:text-[1.16rem]">
          {description}
        </p>

        {actions ? <div>{actions}</div> : null}
      </div>
    </section>
  );
}