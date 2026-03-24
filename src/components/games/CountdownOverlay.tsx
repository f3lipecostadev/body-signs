interface CountdownOverlayProps {
  open: boolean;
  title?: string;
  countdown: number;
  description?: string;
}

export function CountdownOverlay({
  open,
  title = "Prepare-se",
  countdown,
  description,
}: CountdownOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]">
      <div className="w-full max-w-[540px] rounded-[34px] bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <h2 className="mb-3 text-[2.4rem] font-bold text-[#24314d]">{title}</h2>

        {description ? (
          <p className="mb-6 text-[1.15rem] leading-[1.6] text-[#5f6f92]">
            {description}
          </p>
        ) : null}

        <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gradient-to-br from-[#7d8cff] to-[#9c7fff] text-[3rem] font-extrabold text-white shadow-[0_10px_22px_rgba(125,140,255,0.28)]">
          {countdown}
        </div>
      </div>
    </div>
  );
}