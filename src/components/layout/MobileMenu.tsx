import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartNavLink } from "@/components/common/SmartNavLink";

interface MobileMenuItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  items: MobileMenuItem[];
  currentPath: string;
  onClose: () => void;
}

export function MobileMenu({
  open,
  items,
  currentPath,
  onClose,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] lg:hidden">
      <div
        className="absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        onClick={onClose}
      />

      <div className="absolute right-4 top-4 w-[calc(100%-2rem)] max-w-[360px] rounded-[28px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-[#111111]">Menu</h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1f1] text-[#3C32AF]"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        <ul className="flex flex-col gap-4">
          {items.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <li key={item.href}>
                <SmartNavLink
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-[16px] px-4 py-3 text-[18px] font-medium text-[#222222] transition hover:bg-[#f5f5ff]",
                    isActive && "bg-[#f0efff] text-[#5142F7]",
                  )}
                >
                  {item.label}
                </SmartNavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}