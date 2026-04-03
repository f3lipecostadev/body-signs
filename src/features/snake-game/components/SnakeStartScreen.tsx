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
    <div className="w-full max-w-[760px] rounded-[24px] border border-[#dbe4ff] bg-white p-7 text-center shadow-[0_10px_24px_rgba(66,86,150,0.10)]">
      <h2 className="text-[1.5rem] font-bold text-[#24314d]">
        Cobrinha com Perguntas
      </h2>

      <p className="mt-3 text-[#5f6f92]">
        Capture os itens do tabuleiro e responda corretamente para continuar.
        Assim, o jogador aprende de forma lúdica enquanto avança na partida.
      </p>

      <div className="mt-5 rounded-[18px] bg-[#f8faff] px-5 py-4 text-left text-sm text-[#4f5f84]">
        <p>• Use as setas do teclado ou W, A, S, D.</p>
        <p>• Ao capturar um item, uma pergunta será exibida.</p>
        <p>• Se errar, o jogo termina.</p>
        <p>• Se acertar, a partida continua após a contagem.</p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="mt-6 rounded-full bg-[linear-gradient(135deg,#7d8cff,#9c7fff)] px-6 py-3 font-bold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)] transition hover:-translate-y-[2px]"
      >
        Iniciar jogo
      </button>
    </div>
  );
}