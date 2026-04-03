import { Reveal } from "@/components/common/Reveal";

type TeamMember = {
  name: string;
  role: string;
  description: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Daiane Algarves",
    role: "Coordenadora",
    description: "Coordenação do projeto.",
    image: "../../../public/images/daiane.jpeg",
  },
  {
    name: "Felipe Costa",
    role: "Desenvolvedor",
    description: "Desenvolvimento da plataforma.",
    image: "../../../public/images/felipe.jpeg",
  },
  {
    name: "Kaio Javã",
    role: "Designer",
    description: "Design e experiência visual.",
    image: "../../../public/images/kaio.jpeg",
  },
  {
    name: "Alexandre Martins",
    role: "Ajudante",
    description: "Apoio à equipe.",
    image: "../../../public/images/alexandre.jpeg",
  },
  {
    name: "Sthefania de Carla",
    role: "Ajudante",
    description: "Suporte ao projeto.",
    image: "../../../public/images/sthefania.jpeg",
  },
  {
    name: "João Manoel",
    role: "Ajudante",
    description: "Colaboração geral.",
    image: "../../../public/images/joao.jpeg",
  },
];

export function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-[#f1f1f1] px-[24px] py-[90px] md:px-[40px] lg:px-[60px]">
      <div className="absolute left-[-120px] top-[40px] h-[260px] w-[260px] rounded-full bg-[#5142F7]/[0.06] blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-80px] h-[320px] w-[320px] rounded-full bg-[#8f5bff]/[0.08] blur-3xl" />

      <div className="mx-auto max-w-[1700px]">
        <Reveal>
          <div className="mx-auto mb-[55px] max-w-[900px] text-center">
            <h2 className="font-['Poppins'] text-[36px] font-bold text-[#2b248f] md:text-[44px] lg:text-[52px]">
              Nossa equipe
            </h2>

            <p className="mt-[16px] text-[18px] leading-[1.7] text-[#666666] md:text-[20px] lg:text-[22px]">
              Conheça as pessoas que contribuem para tornar o Body Signs mais
              acessível, didático e acolhedor.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <article className="group h-full rounded-[28px] border border-[#e5e5ef] bg-white p-[26px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(81,66,247,0.12)]">
                <div className="mb-[22px] flex justify-center">
                  <div className="h-[122px] w-[122px] overflow-hidden rounded-full border-[4px] border-[#e9e6ff] bg-[#f3f1ff] shadow-[0_8px_22px_rgba(81,66,247,0.10)]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-['Poppins'] text-[24px] font-bold text-[#222222]">
                    {member.name}
                  </h3>

                  <p className="mt-[8px] text-[15px] font-semibold uppercase tracking-[0.08em] text-[#5142F7]">
                    {member.role}
                  </p>

                  <p className="mt-[14px] text-[16px] leading-[1.65] text-[#6d6d6d]">
                    {member.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}