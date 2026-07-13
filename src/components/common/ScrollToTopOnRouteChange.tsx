import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollToTop";

export function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop("smooth");
  }, [pathname]);

  return null;
}