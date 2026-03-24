import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";

export function HomeCTA() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-white px-[60px] py-[60px] text-center">
      <Reveal>
        <div className="flex flex-col items-center">
          <h2 className="mb-[28px] max-w-[950px] font-['Poppins'] text-[52px] leading-[1.2] font-bold text-[#111111]">
            Pronto para começar sua jornada?
          </h2>

          <p className="mb-[60px] max-w-[950px] font-['Inter'] text-[22px] leading-[1.5] font-normal text-[#111111]">
            Junte-se a milhares de pessoas que estão aprendendo Libras e
            promovendo inclusão
          </p>

          <Link
            to="/corpo-em-libras"
            className="flex h-[85px] w-[520px] items-center justify-center gap-[12px] rounded-[28px] border border-black/10 bg-[#DFEF46] font-['Inter'] text-[20px] font-semibold text-black transition duration-200 hover:scale-[1.05] hover:opacity-90"
          >
            <span className="flex items-center">Começar agora</span>
            <span className="flex items-center">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}