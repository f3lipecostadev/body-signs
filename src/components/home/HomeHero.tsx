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

      <section className="mx-auto mt-0 flex min-h-[85vh] w-full max-w-[1700px] flex-wrap sm:flex-nowrap items-center justify-between gap-10 px-5 py-10 sm:px-8 lg:gap-[80px] lg:px-[60px] lg:py-0">
        
        <Reveal y={28} delay={0.05} className="min-w-0 sm:flex-[1.6]">
          <div className="mr-auto max-w-[750px] min-w-0">
            
            <h1 className="mb-6 max-w-[750px] font-['Poppins'] text-[clamp(2.2rem,6vw,5rem)] font-[800] uppercase leading-[1.1] text-white lg:mb-[60px]">
              Vamos aprender as partes do corpo em{" "}
              <span className="text-[#DFEF46]">Libras</span>
            </h1>

            <p className="mb-6 max-w-[750px] font-['Inter'] text-[clamp(1.05rem,2.2vw,1.625rem)] text-white lg:mb-[60px]">
              Aprenda a língua brasileira de sinais de maneira <br className="hidden sm:block" />
              interativa e acessível.
            </p>

            <Link
              to="/corpo-em-libras"
              className="flex h-16 w-full max-w-[520px] items-center justify-center gap-[12px] rounded-[28px] border border-black/10 bg-[#DFEF46] px-6 font-['Inter'] text-[clamp(0.95rem,1.6vw,1.25rem)] font-[600] text-black transition duration-200 hover:scale-[1.05] hover:opacity-90 lg:h-[85px]"
            >
              <span>Explorar vídeos em Libras</span>
              <span>→</span>
            </Link>

          </div>
        </Reveal>

        <Reveal x={30} delay={0.12} className="min-w-0 sm:flex-1">
          <div className="w-full max-w-[420px] animate-[floating_5.5s_ease-in-out_infinite] sm:max-w-[500px] lg:max-w-[440px] xl:max-w-[560px] 2xl:max-w-[650px] min-w-0">
            <img
              src="/images/site/hero-img.png"
              alt="Pessoa fazendo sinais em Libras"
              className="block w-full"
            />
          </div>
        </Reveal>

      </section>
    </HeaderBackground>
  );
}