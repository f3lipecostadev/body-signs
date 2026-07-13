import { HeaderBackground } from "@/components/layout/HeaderBackground";
import { Navbar } from "@/components/layout/Navbar";

interface HeaderProps {
  rounded?: boolean;
}

export function Header({ rounded = true }: HeaderProps) {
  return (
    <HeaderBackground rounded={rounded}>
      <header>
        <Navbar />
      </header>
    </HeaderBackground>
  );
}