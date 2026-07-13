import { useEffect } from "react";

interface UseSnakeLoopParams {
  enabled: boolean;
  speed: number;
  onTick: () => void;
}

export function useSnakeLoop({
  enabled,
  speed,
  onTick,
}: UseSnakeLoopParams) {
  useEffect(() => {
    if (!enabled) return;

    const interval = window.setInterval(() => {
      onTick();
    }, speed);

    return () => {
      window.clearInterval(interval);
    };
  }, [enabled, onTick, speed]);
}