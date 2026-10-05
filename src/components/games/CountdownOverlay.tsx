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
      <div className="w-full max-w-[540px] rounded-[24px] bg-white p-6 text-center sm:rounded-[34px] sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <h2 className="mb-3 text-[1.8rem] font-bold sm:text-[2.4rem] text-[#24314d]">{title}</h2>

        {description ? (
          <p className="mb-5 text-[1rem] leading-[1.6] sm:mb-6 sm:text-[1.15rem] text-[#5f6f92]">
            {description}
          </p>
        ) : null}

        <div className="mx-auto flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#3c32af] text-[2.5rem] sm:h-[140px] sm:w-[140px] sm:text-[3rem] font-extrabold text-white shadow-[0_10px_22px_rgba(60,50,175,0.28)]">
          {countdown}
        </div>
      </div>
    </div>
  );
}