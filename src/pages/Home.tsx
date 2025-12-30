import { Link } from "react-router-dom"
import { AiOutlineEye, AiOutlineCheck } from "react-icons/ai"
import { FaGamepad } from "react-icons/fa"

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-[30px] py-[60px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[60px] flex-wrap">

          <div className="flex-1 min-w-[300px] text-center">
            <img
              src="/images/img-hero-body.png"
              alt="Ilustração do corpo humano com pontos interativos destacando partes como cabeça, tronco e membros"
              className="max-w-full h-auto rounded-[20px]"
            />
          </div>

          <div className="flex-1 min-w-[300px]">
            <h1 className="text-[2.2rem] md:text-[3rem] font-extrabold text-[#6633FF] mb-[30px] leading-[1.2] text-center md:text-left">
              DESCUBRA O CORPO EM LIBRAS
            </h1>

            <div className="text-[1.1rem] text-[#333333] space-y-[20px]">
              <p>
                Conhecer nosso próprio corpo é o primeiro passo para cuidar da saúde,
                entender como funcionamos e nos comunicarmos com precisão — especialmente
                em situações de emergência.
              </p>

              <p>
                Para a comunidade surda, esse conhecimento ganha ainda mais importância:
                saber os sinais corretos das partes do corpo em Libras pode fazer toda a
                diferença em consultas médicas, aulas de biologia e no dia a dia.
              </p>

              <div className="mt-[25px] p-[25px] rounded-[15px] bg-gradient-to-br from-[#f8f9ff] to-[#e8f0ff] border-l-[5px] border-[#FFCC00] font-medium">
                <strong>Aqui, o aprendizado é para todos!</strong> Você vai explorar o
                corpo humano também em <strong>Libras</strong>, com vídeos autênticos
                feitos pelos próprios alunos. Educação que inclui, acolhe e transforma.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BOTÕES CTA */}
      <section className="py-[40px] px-[30px] text-center">
        <div className="flex justify-center gap-[25px] flex-wrap">

          <Link to="/videos">
            <button className="min-w-[280px] px-[45px] py-[18px] text-[1.3rem] font-bold rounded-[30px] bg-[#FFCC00] text-[#6633FF] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#e6b800] hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(255,204,0,0.3)]">
              Explorar Libras em Vídeos
            </button>
          </Link>

          <Link to="/games">
            <button className="min-w-[280px] px-[45px] py-[18px] text-[1.3rem] font-bold rounded-[30px] bg-white text-[#6633FF] border-[3px] border-[#6633FF] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#6633FF] hover:text-white hover:-translate-y-[3px] hover:shadow-[0_6px_20px_rgba(102,51,255,0.2)]">
              Aprender Jogando
            </button>
          </Link>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-[80px] px-[30px] bg-gradient-to-br from-[#f8f9ff] to-white">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-around gap-[40px] flex-wrap">

          <div className="flex-1 min-w-[200px] text-center p-[20px]">
            <div className="text-[3rem] mb-[20px] flex justify-center">
              <AiOutlineEye className="w-12 h-12 text-[#6633FF]" />
            </div>
            <h3 className="text-[1.5rem] font-bold text-[#6633FF] mb-[15px]">Assista</h3>
            <p className="text-[#333333]">Vídeos em Libras feitos por alunos</p>
          </div>

          <div className="flex-1 min-w-[200px] text-center p-[20px]">
            <div className="text-[3rem] mb-[20px] flex justify-center">
              <FaGamepad className="w-12 h-12 text-[#6633FF]" />
            </div>
            <h3 className="text-[1.5rem] font-bold text-[#6633FF] mb-[15px]">Aprenda</h3>
            <p className="text-[#333333]">Jogos interativos para praticar</p>
          </div>

          <div className="flex-1 min-w-[200px] text-center p-[20px]">
            <div className="text-[3rem] mb-[20px] flex justify-center">
              <AiOutlineCheck className="w-12 h-12 text-[#6633FF]" />
            </div>
            <h3 className="text-[1.5rem] font-bold text-[#6633FF] mb-[15px]">Avalie</h3>
            <p className="text-[#333333]">Teste seu conhecimento</p>
          </div>

        </div>
      </section>

    </main>
  )
}
