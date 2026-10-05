import type { MouseEvent, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";

interface SmartNavLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function SmartNavLink({
  to,
  className,
  children,
  onClick,
}: SmartNavLinkProps) {
  const { pathname } = useLocation();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.();

    if (pathname === to) {
      event.preventDefault();
      scrollToTop("smooth");
    }
  }

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}