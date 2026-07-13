import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";

export function HomeCTA() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-5 py-16 text-center sm:px-8 lg:min-h-[85vh] lg:px-[60px] lg:py-[60px]">
      <Reveal>
        <div className="flex flex-col items-center">
          <h2 className="mb-6 max-w-[950px] font-['Poppins'] text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.2] font-bold text-[#111111] lg:mb-[28px]">
            Pronto para começar sua jornada?
          </h2>

          <p className="mb-8 max-w-[950px] font-['Inter'] text-[clamp(1rem,2vw,1.375rem)] leading-[1.5] font-normal text-[#111111] lg:mb-[60px]">
            Junte-se a milhares de pessoas que estão aprendendo Libras e
            promovendo inclusão
          </p>

          <Link
            to="/corpo-em-libras"
            className="flex h-16 w-full max-w-[520px] items-center justify-center gap-[12px] rounded-[28px] border border-black/10 bg-[#DFEF46] px-6 font-['Inter'] text-[clamp(0.95rem,1.6vw,1.25rem)] font-semibold text-black transition duration-200 hover:scale-[1.05] hover:opacity-90 lg:h-[85px]"
          >
            <span className="flex items-center">Começar agora</span>
            <span className="flex items-center">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}