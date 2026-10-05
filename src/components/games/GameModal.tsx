import type { PropsWithChildren, ReactNode } from "react";
import { X } from "lucide-react";

interface GameModalProps extends PropsWithChildren {
  open: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  footer?: ReactNode;
}

export function GameModal({
  open,
  title,
  description,
  onClose,
  footer,
  children,
}: GameModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-3 py-4 sm:px-5 sm:py-8">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div className="relative z-[121] max-h-full w-full max-w-[980px] overflow-y-auto rounded-[24px] bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:rounded-[34px] sm:p-7 md:p-8">
        {(title || onClose) && (
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-5 sm:gap-5">
            <div>
              {title ? (
                <h2 className="text-[1.4rem] font-bold leading-tight text-[#24314d] sm:text-[2rem]">
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p className="mt-1 text-[0.95rem] leading-[1.5] text-[#5f6f92] sm:mt-2 sm:text-[1.08rem] sm:leading-[1.6]">
                  {description}
                </p>
              ) : null}
            </div>

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[#5e6de6] transition hover:translate-y-[-2px] sm:h-[52px] sm:w-[52px]"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            ) : null}
          </div>
        )}

        <div>{children}</div>

        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
}