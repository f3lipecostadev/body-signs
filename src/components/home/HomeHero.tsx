import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { HeaderBackground } from "@/components/layout/HeaderBackground";
import { Navbar } from "@/components/layout/Navbar";

export function HomeHero() {
  return (
    <HeaderBackground className="min-h-screen" rounded={false}>
      <header>
        <Navbar />
      </header>

      <section className="mx-auto mt-0 flex min-h-[85vh] w-full max-w-[1700px] flex-wrap items-center justify-between gap-[80px] px-[60px]">
        
        <Reveal y={28} delay={0.05}>
          <div className="mr-auto max-w-[750px]">
            
            <h1 className="mb-[60px] max-w-[750px] font-['Poppins'] text-[80px] font-[800] uppercase leading-[1.1] text-white">
              Vamos aprender as partes do corpo em{" "}
              <span className="text-[#DFEF46]">Libras</span>
            </h1>

            <p className="mb-[60px] max-w-[750px] font-['Inter'] text-[26px] text-white">
              Aprenda a língua brasileira de sinais de maneira <br />
              interativa e acessível.
            </p>

            <Link
              to="/corpo-em-libras"
              className="flex h-[85px] w-[520px] items-center justify-center gap-[12px] rounded-[28px] border border-black/10 bg-[#DFEF46] font-['Inter'] text-[20px] font-[600] text-black transition duration-200 hover:scale-[1.05] hover:opacity-90"
            >
              <span>Explorar vídeos em Libras</span>
              <span>→</span>
            </Link>

          </div>
        </Reveal>

        <Reveal x={30} delay={0.12}>
          <div className="w-full max-w-[650px] animate-[floating_5.5s_ease-in-out_infinite]">
            <img
              src="/images/hero-img.png"
              alt="Pessoa fazendo sinais em Libras"
              className="block w-full"
            />
          </div>
        </Reveal>

      </section>
    </HeaderBackground>
  );
}