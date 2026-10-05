import { useEffect, useRef } from "react";
import { SWIPE_THRESHOLD_PX } from "../constants";
import type { Direction } from "../types";

interface UseSwipeControlsParams {
  enabled: boolean;
  onSwipe: (direction: Direction) => void;
  threshold?: number;
}

// Toques nesses elementos não devem virar a cobrinha (botões, links e o
// widget de acessibilidade VLibras).
const IGNORED_TARGETS = "button, a, input, textarea, select, [vw]";

/**
 * Controle por arrasto: a cada `threshold` px que o dedo percorre, a direção
 * dominante do movimento vira a cobrinha e o ponto de referência é refeito.
 * Assim dá para fazer várias curvas seguidas sem tirar o dedo da tela.
 */
export function useSwipeControls({
  enabled,
  onSwipe,
  threshold = SWIPE_THRESHOLD_PX,
}: UseSwipeControlsParams) {
  const onSwipeRef = useRef(onSwipe);

  useEffect(() => {
    onSwipeRef.current = onSwipe;
  }, [onSwipe]);

  useEffect(() => {
    if (!enabled) return;

    let touchId: number | null = null;
    let anchorX = 0;
    let anchorY = 0;

    const findTouch = (event: TouchEvent) =>
      Array.from(event.changedTouches).find(
        (touch) => touch.identifier === touchId,
      );

    const handleTouchStart = (event: TouchEvent) => {
      if (touchId !== null) return;
      if ((event.target as Element | null)?.closest?.(IGNORED_TARGETS)) return;

      const touch = event.changedTouches[0];
      touchId = touch.identifier;
      anchorX = touch.clientX;
      anchorY = touch.clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchId === null) return;

      const touch = findTouch(event);
      if (!touch) return;

      // Impede rolagem e "puxar para atualizar" enquanto o jogador arrasta.
      if (event.cancelable) event.preventDefault();

      const deltaX = touch.clientX - anchorX;
      const deltaY = touch.clientY - anchorY;

      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < threshold) return;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        onSwipeRef.current(deltaX > 0 ? "RIGHT" : "LEFT");
      } else {
        onSwipeRef.current(deltaY > 0 ? "DOWN" : "UP");
      }

      anchorX = touch.clientX;
      anchorY = touch.clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (findTouch(event)) touchId = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [enabled, threshold]);
}
