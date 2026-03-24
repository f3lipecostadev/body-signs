import { HeaderBackground } from "@/components/layout/HeaderBackground";
import { Navbar } from "@/components/layout/Navbar";

export function Header() {
  return (
    <HeaderBackground>
      <header>
        <Navbar />
      </header>
    </HeaderBackground>
  );
}