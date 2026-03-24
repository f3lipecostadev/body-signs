import type { PropsWithChildren } from "react";

interface GameShellProps extends PropsWithChildren {
  className?: string;
}

export function GameShell({ children, className = "" }: GameShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f9ff] px-6 py-7 text-[#24314d] lg:px-8">
      <section
        className={`mx-auto w-full max-w-[1500px] rounded-[38px] border border-[rgba(219,228,255,0.9)] bg-[rgba(255,255,255,0.85)] p-[40px] shadow-[0_10px_30px_rgba(75,102,180,0.12)] backdrop-blur-[6px] ${className}`}
      >
        {children}
      </section>
    </main>
  );
}