import { useState } from 'react'
import ContactForm from '../components/ContactForm'
import TeamMember from '../components/TeamMember'
import { TeamMember as TeamMemberType } from '../types'

import { AiOutlineInstagram } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { RiWhatsappLine } from 'react-icons/ri'

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false)

  const teamMembers: TeamMemberType[] = [
    { id: '1', name: 'Daiane Algarves', role: 'Coordenadora do Projeto', email: 'daiane.algarves@ifma.edu.br', avatar: 'D' },
    { id: '2', name: 'Felipe Costa', role: 'Desenvolvedor Web', email: 'felipekaua@acad.ifma.edu.br', avatar: 'F' },
    { id: '3', name: 'Alexandre Martins Silva', role: 'Estudante de Libras', email: 'martinsalexandre@acad.ifma.edu.br', avatar: 'A' },
    { id: '4', name: 'João Manoel de Sousa Alves', role: 'Desenvolvedor Gamer', email: 'manoel.alves@acad.ifma.edu.br', avatar: 'J' },
    { id: '5', name: 'Kaio Javã Alves Conceição', role: 'Designer Gráfico', email: 'kaiojava@acad.ifma.edu.br', avatar: 'K' },
    { id: '6', name: 'Sthefania de Carla Costa Ferreira', role: 'Estudante de Libras', email: 'sthefaniaferreira@acad.ifma.edu.br', avatar: 'S' }
  ]

  const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
    console.log('Formulário enviado:', formData)
    setShowSuccess(true)

    setTimeout(() => {
      document.getElementById('successMessage')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)

    setTimeout(() => {
      setShowSuccess(false)
    }, 5000)
  }

  return (
    <main className="font-poppins">

      {/* HERO */}
      <section className="px-8 py-16 text-center bg-gradient-to-br from-[#f0f4ff] to-[#e8f0ff]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-5">
          Fale Conosco!
        </h1>
        <p className="text-lg max-w-xl mx-auto text-gray-600">
          Desafie-se e aprenda Libras com diversão! Entre em contato com nossa equipe.
        </p>
      </section>

      {/* CONTATO */}
      <section className="px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* FORM */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <ContactForm onSubmit={handleFormSubmit} />

            {showSuccess && (
              <div
                id="successMessage"
                className="mt-6 bg-green-500 text-white p-5 rounded-xl text-center animate-fadeIn"
              >
                <h3 className="text-lg font-semibold">✅ Mensagem Enviada com Sucesso!</h3>
                <p>Obrigado pelo seu contato. Retornaremos em breve!</p>
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col gap-10">

            {/* CARD CONTATO */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-5 flex items-center gap-2">
                📧 Informações de Contato
              </h3>

              <p><strong>Email:</strong> felipekaua@acad.ifma.edu.br</p>
              <p><strong>Telefone:</strong> (98) 98407-5894</p>
              <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>

              <div className="flex gap-4 mt-6">

                <a href="https://www.instagram.com/f3lipe_cosst/" target="_blank">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 hover:bg-blue-600 group">
                    <AiOutlineInstagram className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                </a>

                <a href="mailto:felipekaua@acad.ifma.edu.br" target="_blank">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 hover:bg-blue-600 group">
                    <HiOutlineMail className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                </a>

                <a href="https://wa.me/5598984075894" target="_blank">
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 hover:bg-blue-600 group">
                    <RiWhatsappLine className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                </a>

              </div>
            </div>

            {/* CARD LOCAL */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-5 flex items-center gap-2">
                📍 Onde Estamos
              </h3>

              <p><strong>Instituição:</strong> IFMA Campus Timon</p>
              <p><strong>Curso:</strong> Sistemas para Internet</p>
              <p><strong>Localização:</strong> Timon, MA</p>
              <p><strong>Projeto:</strong> PIBIT/PIBIC - Body Signs</p>
            </div>

          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section className="px-8 py-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-blue-600 mb-4">
              Conheça Nossa Equipe
            </h2>
            <p className="text-gray-600">
              As mentes e corações por trás de cada detalhe do Body Signs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}
