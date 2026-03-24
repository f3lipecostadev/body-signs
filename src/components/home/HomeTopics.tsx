import { BookOpen, Trophy, Send } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export function HomeTopics() {
  return (
    <section className="flex min-h-[95vh] flex-col items-center justify-center px-[60px] py-[60px] text-center">
      <Reveal>
        <div className="section-header">
          <h2 className="mb-[24px] font-['Poppins'] text-[48px] leading-[1.2] font-bold">
            Como funciona
          </h2>

          <p className="mb-[60px] max-w-[950px] font-['Inter'] text-[22px] font-normal">
            Três passos simples para começar sua jornada de aprendizado em
            Libras.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-wrap items-start justify-center gap-[55px] text-white">
        <Reveal delay={0.08}>
          <div className="flex min-h-[340px] max-w-[420px] cursor-pointer flex-col items-center justify-start rounded-[22px] bg-[#6A5DFF] px-[48px] py-[38px] text-center transition duration-300 hover:-translate-y-[10px]">
            <div className="relative mb-[24px] flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[-6px_0_16px_rgba(60,50,175,0.18),6px_0_16px_rgba(81,66,247,0.14),0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-[8px]">
              <BookOpen size={34} className="relative z-[1]" />
            </div>

            <h3 className="mb-[14px] font-['Poppins'] text-[26px] font-semibold">
              Aprenda
            </h3>

            <p className="font-['Inter'] text-[19px] leading-[1.5] font-normal">
              Explore partes do corpo humano em Libras com vídeos interativos
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex min-h-[340px] max-w-[420px] cursor-pointer flex-col items-center justify-start rounded-[22px] bg-[#5142F7] px-[48px] py-[38px] text-center transition duration-300 hover:-translate-y-[10px]">
            <div className="relative mb-[24px] flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[-6px_0_16px_rgba(60,50,175,0.18),6px_0_16px_rgba(81,66,247,0.14),0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-[8px]">
              <Trophy size={34} className="relative z-[1]" />
            </div>

            <h3 className="mb-[14px] font-['Poppins'] text-[26px] font-semibold">
              Pratique
            </h3>

            <p className="font-['Inter'] text-[19px] leading-[1.5] font-normal">
              Jogue e teste seu conhecimento de forma divertida
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex min-h-[340px] max-w-[420px] cursor-pointer flex-col items-center justify-start rounded-[22px] bg-[#3C32AF] px-[48px] py-[38px] text-center transition duration-300 hover:-translate-y-[10px]">
            <div className="relative mb-[24px] flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-[-6px_0_16px_rgba(60,50,175,0.18),6px_0_16px_rgba(81,66,247,0.14),0_8px_18px_rgba(0,0,0,0.12)] backdrop-blur-[8px]">
              <Send size={34} className="relative z-[1]" />
            </div>

            <h3 className="mb-[14px] font-['Poppins'] text-[26px] font-semibold">
              Compartilhe
            </h3>

            <p className="font-['Inter'] text-[19px] leading-[1.5] font-normal">
              Ensine outras pessoas e promova a inclusão
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}