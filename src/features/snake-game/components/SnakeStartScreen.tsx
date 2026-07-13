interface SnakeStartScreenProps {
  open: boolean;
  onStart: () => void;
}

export function SnakeStartScreen({ open, onStart }: SnakeStartScreenProps) {
  if (!open) return null;

  return (
    <button
      type="button"
      onClick={onStart}
      className="rounded-full bg-[#3c32af] px-8 py-4 text-[1.05rem] font-bold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)] transition hover:-translate-y-[2px]"
    >
      Iniciar Jogo
    </button>
  );
}
