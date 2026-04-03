import type { PropsWithChildren } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopOnRouteChange } from "@/components/common/ScrollToTopOnRouteChange";

interface MainLayoutProps extends PropsWithChildren {
  showHeader?: boolean;
  showFooter?: boolean;
  headerRounded?: boolean;
}

export function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
  headerRounded = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#f1f1f1] text-[#111111]">
      <ScrollToTopOnRouteChange />

      {showHeader ? <Header rounded={headerRounded} /> : null}

      <div className="flex min-h-[calc(100vh-220px)] flex-col">
        <main className="flex-1">{children}</main>
      </div>

      {showFooter ? <Footer /> : null}
    </div>
  );
}