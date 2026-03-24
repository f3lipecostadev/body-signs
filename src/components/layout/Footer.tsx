import { Container } from "@/components/common/Container";
import { navigationItems } from "@/data/navigation";
import { SmartNavLink } from "@/components/common/SmartNavLink";

export function Footer() {
  return (
    <footer className="flex min-h-[220px] flex-col bg-[#3C32AF] px-0 py-[30px] text-white md:py-10 lg:py-[30px]">
      <Container className="flex max-w-[1700px] flex-1 flex-col">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div>
            <SmartNavLink to="/" className="block">
              <img
                src="/images/logo.png"
                alt="Logo Body Signs"
                className="h-auto w-[200px]"
              />
            </SmartNavLink>
          </div>

          <ul className="flex flex-col items-start gap-3 text-left text-[18px] font-medium md:items-end md:text-right">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <SmartNavLink
                  to={item.href}
                  className="transition duration-300 hover:opacity-70"
                >
                  {item.label}
                </SmartNavLink>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center text-[15px] opacity-85">
          © 2026 Body Signs. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}