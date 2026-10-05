import type { PropsWithChildren, ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface GameSidebarShellProps extends PropsWithChildren {
  title: string;
  sidebarExtra?: ReactNode;
  panelClassName?: string;
  sidebarClassName?: string;
  titleClassName?: string;
  /** Centers the panel content — use for start screens / empty states. */
  centerPanel?: boolean;
  /**
   * Desativa rolagem, zoom e seleção do navegador na tela inteira.
   * Use enquanto o jogo é controlado por gestos de toque (ex.: cobrinha).
   */
  lockTouch?: boolean;
}

/**
 * Full-height, full-width game layout: a sidebar (back button, title and
 * status/instructions) and a bordered content panel holding the game board.
 *
 * - Desktop (lg+): sidebar à esquerda, painel à direita.
 * - Celular em pé: sidebar compacta no topo, painel ocupa o resto da tela.
 * - Celular deitado (pouca altura): sidebar estreita ao lado do painel.
 */
export function GameSidebarShell({
  title,
  sidebarExtra,
  panelClassName = "",
  sidebarClassName = "",
  titleClassName = "",
  centerPanel = false,
  lockTouch = false,
  children,
}: GameSidebarShellProps) {
  return (
    <main
      className={cn(
        "h-dvh w-screen overflow-hidden bg-[#f7f9ff] px-3 py-3 text-[#111111] sm:px-4 sm:py-4 md:px-[40px] md:py-6",
        lockTouch && "touch-none select-none overscroll-none",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col gap-3 lg:flex-row lg:gap-6 landscape-short:flex-row landscape-short:gap-3">
        <aside
          className={cn(
            "flex w-full flex-shrink-0 flex-col gap-3 overflow-y-auto rounded-[20px] bg-[#eef0ff] p-3 sm:p-4 lg:h-full lg:w-[380px] lg:gap-8 lg:rounded-[28px] lg:p-6 landscape-short:h-full landscape-short:w-[230px] landscape-short:gap-3 landscape-short:p-3",
            sidebarClassName,
          )}
        >
          <div className="flex items-center gap-3 lg:contents landscape-short:flex">
            <Link
              to="/jogos"
              aria-label="Voltar para os jogos"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#111111] shadow-[0_2px_8px_rgba(66,86,150,0.12)] transition hover:-translate-y-[1px] lg:sticky lg:top-5 lg:z-10 lg:mb-3 lg:h-11 lg:w-11 lg:self-start"
            >
              <ArrowLeft size={20} />
            </Link>

            <h1
              className={cn(
                "mt-0 min-w-0 flex-1 text-[1.2rem] font-extrabold leading-[1.1] text-[#111111] sm:text-[1.5rem] lg:flex-none lg:text-[clamp(1.6rem,2.5vw,2.2rem)] lg:leading-[1.05] landscape-short:text-[1.05rem]",
                titleClassName,
              )}
            >
              {title}
            </h1>
          </div>

          {sidebarExtra}
        </aside>

        <section
          className={cn(
            "flex min-h-0 w-full flex-1 overflow-auto rounded-[20px] border border-[#e4e8ff] bg-white p-2 sm:p-4 lg:rounded-[28px] lg:p-6",
            centerPanel ? "items-center justify-center" : "flex-col",
            panelClassName,
          )}
        >
          {children}
        </section>
      </div>
    </main>
  );
}
