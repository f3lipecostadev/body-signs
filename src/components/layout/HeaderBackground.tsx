import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

interface HeaderBackgroundProps extends PropsWithChildren {
  className?: string;
  rounded?: boolean;
}

export function HeaderBackground({
  children,
  className,
  rounded = true,
}: HeaderBackgroundProps) {
  return (
    <div
      className={cn(
        "bg-cover bg-center pt-[80px]",
        rounded ? "pb-[80px] rounded-b-[42px]" : "pb-[80px] rounded-none",
        className,
      )}
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {children}
    </div>
  );
}