import type { PropsWithChildren, ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface GameSidebarShellProps extends PropsWithChildren {
  title: string;
  sidebarExtra?: ReactNode;
  panelClassName?: string;
  sidebarClassName?: string;
  titleClassName?: string;
  /** Centers the panel content — use for start screens / empty states. */
  centerPanel?: boolean;
}

/**
 * Full-height, full-width game layout: a sidebar (back button, title and
 * status/instructions) on the left, and a bordered content panel on the
 * right holding the actual game board. Mirrors the same max-width/padding
 * rhythm used across the rest of the site (see GamesPage).
 */
export function GameSidebarShell({
  title,
  sidebarExtra,
  panelClassName = "",
  sidebarClassName = "",
  titleClassName = "",
  centerPanel = false,
  children,
}: GameSidebarShellProps) {
  return (
    <main className="h-dvh w-screen overflow-hidden bg-[#f7f9ff] px-4 py-4 text-[#111111] md:px-[40px] md:py-6">
      <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col gap-4 lg:flex-row lg:gap-6">
        <aside className={`flex w-full flex-shrink-0 flex-col gap-8 overflow-y-auto rounded-[28px] bg-[#eef0ff] p-5 lg:h-full lg:w-[380px] lg:p-6 ${sidebarClassName}`}>
          <Link
            to="/jogos"
            aria-label="Voltar para os jogos"
            className="sticky top-5 z-10 self-start mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_2px_8px_rgba(66,86,150,0.12)] transition hover:-translate-y-[1px]"
          >
            <ArrowLeft size={20} />
          </Link>

          <h1 className={`text-[clamp(1.6rem,2.5vw,2.2rem)] font-extrabold leading-[1.05] text-[#111111] ${titleClassName} mt-0`}>
            {title}
          </h1>

          {sidebarExtra}
        </aside>

        <section
          className={`flex w-full flex-1 overflow-auto rounded-[28px] border border-[#e4e8ff] bg-white p-4 md:p-6 ${
            centerPanel ? "items-center justify-center" : "flex-col"
          } ${panelClassName}`}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
