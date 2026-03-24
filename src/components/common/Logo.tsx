import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  imageClassName?: string;
}

export function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link to="/" className={cn("block", className)} aria-label="Ir para a página inicial">
      <img
        src="/images/logo.png"
        alt="Logo Body Signs"
        className={cn("h-[121px] w-[121px]", imageClassName)}
      />
    </Link>
  );
}