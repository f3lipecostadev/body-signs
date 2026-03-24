import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navigationItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { SmartNavLink } from "@/components/common/SmartNavLink";

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        className="
          mx-auto flex w-full max-w-[1700px] items-center justify-between
          rounded-[28px]
          border border-[rgba(255,255,255,0.25)]
          bg-[rgba(255,255,255,0.08)]
          px-[60px] py-[14px]
          text-white
          backdrop-blur-[10px]
          shadow-[-10px_0_30px_rgba(60,50,175,0.35),10px_0_30px_rgba(81,66,247,0.25),0_10px_30px_rgba(0,0,0,0.18)]
        "
      >
        <SmartNavLink to="/" className="block">
          <img
            src="/images/logo.png"
            alt="Logo Body Signs"
            className="h-[140px] w-[140px]"
          />
        </SmartNavLink>

        <ul className="hidden items-center gap-[60px] text-[20px] font-[600] lg:flex">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <SmartNavLink
                  to={item.href}
                  className={cn(
                    "relative pb-[6px] transition duration-300 hover:opacity-70",
                    isActive &&
                      "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:rounded-[2px] after:bg-white after:content-['']",
                  )}
                >
                  {item.label}
                </SmartNavLink>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      <MobileMenu
        open={mobileOpen}
        items={navigationItems}
        currentPath={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}