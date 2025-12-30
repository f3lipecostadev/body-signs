import { useState } from 'react'
import GameCard from '../components/GameCard'
import QuizGame from '../components/QuizGame'
import { Game } from '../types'
import { FaVideo, FaBrain, FaQuestionCircle } from 'react-icons/fa'

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const games: Game[] = [
    {
      id: '1',
      title: 'Quiz do Corpo',
      subtitle: 'Teste de múltipla escolha',
      description:
        'Teste seus conhecimentos sobre os sinais das partes do corpo humano em Libras com perguntas de múltipla escolha.',
      icon: <FaQuestionCircle className="w-12 h-12 text-[#7F33FF] drop-shadow-lg mx-auto" />,
      features: [
        'Perguntas e descrições',
        '4 alternativas por questão',
        'Feedback imediato',
        'Pontuação por acertos'
      ],
      type: 'quiz'
    },
    {
      id: '2',
      title: 'Descubra pelo Vídeo',
      subtitle: 'Adivinhe o sinal em Libras',
      description:
        'Assista a vídeos curtos de alunos sinalizando e adivinhe qual parte do corpo está sendo representada.',
      icon: <FaVideo className="w-12 h-12 text-[#7F33FF] drop-shadow-lg mx-auto" />,
      features: [
        'Vídeos reais em Libras',
        'Diversas partes do corpo',
        'Dificuldade progressiva',
        'Timer opcional'
      ],
      type: 'video'
    },
    {
      id: '3',
      title: 'Memória dos Sinais',
      subtitle: 'Jogo da memória inclusivo',
      description:
        'Encontre os pares correspondentes entre imagens das partes do corpo e seus sinais em Libras.',
      icon: <FaBrain className="w-12 h-12 text-[#7F33FF] drop-shadow-lg mx-auto" />,
      features: [
        'Cartas com imagens e sinais',
        'Diferentes níveis de dificuldade',
        'Memorização visual',
        'Modo contra o tempo'
      ],
      type: 'memory'
    }
  ]

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedGame(null)
  }

  return (
    <main className="min-h-screen font-[Poppins] bg-white">

      {/* HERO */}
      <section className="px-8 py-16 text-center bg-gradient-to-br from-[#fff9e6] to-[#fff0cc]">
        <h1 className="text-[2.8rem] font-extrabold text-[#6633FF] mb-5">
          Jogos Disponíveis
        </h1>
        <p className="text-[1.2rem] text-gray-700 max-w-[800px] mx-auto">
          Desafie-se e aprenda Libras com diversão! Escolha um dos jogos abaixo
          para testar seus conhecimentos sobre o corpo humano em Língua Brasileira de Sinais.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-10">
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onPlayClick={() => handlePlayGame(game)}
            />
          ))}
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && selectedGame && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 animate-fadeIn">
          <div className="relative bg-white w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl p-8 animate-slideUp">
            <button
              onClick={closeModal}
              aria-label="Fechar jogo"
              className="absolute top-5 right-5 text-3xl text-gray-500 hover:text-[#7F33FF] transition"
            >
              &times;
            </button>

            <div className="min-h-[400px] flex flex-col">

              {selectedGame.type === 'quiz' && <QuizGame onClose={closeModal} />}

              {(selectedGame.type === 'video' || selectedGame.type === 'memory') && (
                <div className="flex flex-col items-center justify-center text-center flex-1 px-5 py-16">
                  <div className="mb-6">
                    {selectedGame.icon}
                  </div>

                  <h3 className="text-[1.8rem] font-bold text-[#7F33FF] mb-4">
                    {selectedGame.title}
                  </h3>

                  <p className="text-[1.1rem] text-gray-700 max-w-[400px] mb-8">
                    Este jogo está em desenvolvimento. Em breve estará disponível!
                  </p>

                  <button
                    onClick={closeModal}
                    className="px-8 py-3 bg-[#7F33FF] text-white rounded-xl text-lg font-semibold transition hover:bg-[#FFCC00] hover:text-[#6633FF]"
                  >
                    Voltar aos Jogos
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* animações */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
          .animate-fadeIn { animation: fadeIn 0.3s ease; }
          .animate-slideUp { animation: slideUp 0.3s ease; }
        `}
      </style>

    </main>
  )
}
