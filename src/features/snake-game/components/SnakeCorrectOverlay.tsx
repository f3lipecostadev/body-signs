import { CountdownOverlay } from "@/components/games/CountdownOverlay";

interface SnakeCorrectOverlayProps {
  open: boolean;
  countdown: number;
}

export function SnakeCorrectOverlay({
  open,
  countdown,
}: SnakeCorrectOverlayProps) {
  return (
    <CountdownOverlay
      open={open}
      title="Resposta correta"
      countdown={countdown}
      description="A cobrinha vai continuar em instantes."
    />
  );
}