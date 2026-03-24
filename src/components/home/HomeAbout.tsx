import { Reveal } from "@/components/common/Reveal";

export function HomeAbout() {
  const items = [
    {
      number: "1",
      title: "Educação Inclusiva",
      text: "Promova a acessibilidade e a comunicação para todos",
    },
    {
      number: "2",
      title: "Aprendizado Visual",
      text: "Conteúdo visual e interativo para melhor compreensão",
    },
    {
      number: "3",
      title: "Plataforma Gratuita",
      text: "Acesso livre para todos que desejam aprender Libras",
    },
    {
      number: "4",
      title: "Ideal para Escolas",
      text: "Ferramenta perfeita para professores e estudantes",
    },
  ];

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <section className="min-h-[95vh] flex items-center justify-center px-[80px] py-[100px] max-[950px]:px-[24px] max-[950px]:py-[70px]">
        
        <Reveal className="w-full max-w-[1700px]">
          <div className="relative w-full overflow-hidden rounded-[40px] border border-white/25 bg-white/10 px-[60px] pt-[110px] pb-[60px] backdrop-blur-[12px] shadow-[-10px_0_30px_rgba(60,50,175,0.35),10px_0_30px_rgba(81,66,247,0.25),0_10px_30px_rgba(0,0,0,0.18)] max-[950px]:px-[20px] max-[950px]:pt-[60px] max-[950px]:pb-[30px]">

            {/* brilho */}
            <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_78%_68%,rgba(255,255,255,0.14),transparent_34%),linear-gradient(125deg,rgba(255,255,255,0.10),transparent_42%,rgba(255,255,255,0.06))] opacity-95" />

            {/* header */}
            <div className="relative z-[1] mb-[80px] text-center">
              <h2 className="mb-[30px] font-['Poppins'] text-[56px] font-bold text-white max-[950px]:text-[34px]">
                Benefícios
              </h2>

              <p className="mx-auto max-w-[950px] font-['Inter'] text-[24px] text-white max-[950px]:text-[18px]">
                Por que escolher Body Signs para aprender Libras?
              </p>
            </div>

            {/* grid */}
            <div className="relative z-[1] grid grid-cols-4 gap-[32px] max-[1300px]:grid-cols-2 max-[700px]:grid-cols-1">
              {items.map((item, index) => (
                <Reveal key={item.number} delay={0.08 + index * 0.06}>
                  <div className="min-h-[420px] rounded-[28px] bg-[#DFEF46] px-[36px] pt-[48px] pb-[50px] text-left transition duration-300 hover:scale-[1.03] max-[950px]:min-h-[320px]">

                    <span className="mb-[32px] flex h-[82px] w-[82px] items-center justify-center rounded-full bg-white font-['Poppins'] text-[30px] font-bold text-black">
                      {item.number}
                    </span>

                    <h3 className="mb-[20px] font-['Poppins'] text-[30px] font-bold text-[#111111] max-[950px]:text-[22px]">
                      {item.title}
                    </h3>

                    <p className="font-['Inter'] text-[20px] leading-[1.6] text-[#111111] max-[950px]:text-[16px]">
                      {item.text}
                    </p>

                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </Reveal>

      </section>
    </div>
  );
}