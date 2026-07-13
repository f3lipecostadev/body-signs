import type { PropsWithChildren } from "react";

interface GameShellProps extends PropsWithChildren {
  className?: string;
}

export function GameShell({ children, className = "" }: GameShellProps) {
  return (
    <main className="h-dvh w-screen overflow-hidden bg-[#f7f9ff] px-4 py-4 text-[#24314d] md:px-[40px] md:py-6">
      <section
        className={`mx-auto flex h-full w-full max-w-[1920px] flex-col overflow-y-auto rounded-[38px] border border-[rgba(219,228,255,0.9)] bg-[rgba(255,255,255,0.85)] p-[20px] shadow-[0_10px_30px_rgba(75,102,180,0.12)] backdrop-blur-[6px] md:p-[36px] ${className}`}
      >
        {children}
      </section>
    </main>
  );
}
