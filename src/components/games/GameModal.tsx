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
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-5 py-8">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div className="relative z-[121] w-full max-w-[980px] rounded-[34px] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)] md:p-8">
        {(title || onClose) && (
          <div className="mb-5 flex items-start justify-between gap-5">
            <div>
              {title ? (
                <h2 className="text-[2rem] font-bold text-[#24314d]">
                  {title}
                </h2>
              ) : null}

              {description ? (
                <p className="mt-2 text-[1.08rem] leading-[1.6] text-[#5f6f92]">
                  {description}
                </p>
              ) : null}
            </div>

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#eef2ff] text-[#5e6de6] transition hover:translate-y-[-2px]"
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