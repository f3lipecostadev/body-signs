import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1500px] px-4 md:px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}