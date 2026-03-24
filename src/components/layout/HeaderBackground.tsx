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
        "bg-cover bg-center pt-[80px] pb-[80px]",
        rounded && "rounded-b-[42px]",
        className,
      )}
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      {children}
    </div>
  );
}