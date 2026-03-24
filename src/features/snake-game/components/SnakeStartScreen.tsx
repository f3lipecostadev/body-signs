interface SnakeStartScreenProps {
  open: boolean;
  onStart: () => void;
}

export function SnakeStartScreen({
  open,
  onStart,
}: SnakeStartScreenProps) {
  if (!open) return null;

  return (
    <div className="w-full max-w-[700px] rounded-[22px] border border-[#dbe4ff] bg-white p-6 text-center shadow-[0_8px_18px_rgba(66,86,150,0.08)]">
      <h2 className="text-[1.4rem] font-bold text-[#24314d]">
        Cobrinha com Perguntas
      </h2>
      <p className="mt-2 text-[#5f6f92]">
        Pegue os pontos no tabuleiro. Sempre que capturar um, responda corretamente para continuar.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-5 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-6 py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
      >
        Iniciar jogo
      </button>
    </div>
  );
}