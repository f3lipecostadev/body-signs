import { useState, useMemo } from 'react'
import VideoCard from '../components/VideoCard'
import VideoModal from '../components/VideoModal'
import { Video } from '../types'
import { FaSearch, FaVideo } from 'react-icons/fa'

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const videos: Video[] = useMemo(() => [
  {
      id: '1',
      title: 'Braço',
      description: 'Demonstração do sinal para "braço" em Libras.',
      category: 'membros-superiores',
      duration: '0:14',
      level: 'Iniciante',
      thumbnail: '/images/braco-thumb.png',
      videoSrc: '/videos/braco-video.mp4'
    },
    {
      id: '2',
      title: 'Cabeça',
      description: 'Sinal para "cabeça" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:07',
      level: 'Iniciante',
      thumbnail: '/images/cabeca-thumb.png',
      videoSrc: '/videos/cabeca-video.mp4'
    },
    {
      id: '3',
      title: 'Joelho',
      description: 'Sinal para "joelho" em Libras.',
      category: 'membros-inferiores',
      duration: '0:11',
      level: 'Iniciante',
      thumbnail: '/images/joelho-thumb.png',
      videoSrc: '/videos/joelho-video.mp4'
    },
    {
      id: '4',
      title: 'Olhos',
      description: 'Sinal para "olhos" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:06',
      level: 'Iniciante',
      thumbnail: '/images/olho-thumb.png',
      videoSrc: '/videos/olho-video.mp4'
    },
    {
      id: '5',
      title: 'Costas',
      description: 'Sinal para "costas" em Libras.',
      category: 'tronco',
      duration: '0:08',
      level: 'Iniciante',
      thumbnail: '/images/costas-thumb.png',
      videoSrc: '/videos/costas-video.mp4'
    },


    {
      id: '7',
      title: 'Nariz',
      description: 'Sinal para "nariz" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:06',
      level: 'Iniciante',
      thumbnail: '/images/nariz-thumb.png',
      videoSrc: '/videos/nariz-video.mp4'
    },
    {
      id: '8',
      title: 'Tornozelo',
      description: 'Sinal para "tornozelo" em Libras.',
      category: 'membros-inferiores',
      duration: '0:11',
      level: 'Iniciante',
      thumbnail: '/images/tornozelo-thumb.png',
      videoSrc: '/videos/tornozelo-video.mp4'
    },
    {
      id: '9',
      title: 'Ombro',
      description: 'Sinal para "ombro" em Libras.',
      category: 'membros-superiores',
      duration: '0:08',
      level: 'Iniciante',
      thumbnail: '/images/ombro-thumb.png',
      videoSrc: '/videos/ombro-video.mp4'
    },
    {
      id: '10',
      title: 'Boca',
      description: 'Sinal para "boca" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:09',
      level: 'Iniciante',
      thumbnail: '/images/boca-thumb.png',
      videoSrc: '/videos/boca-video.mp4'
    },
    {
      id: '11',
      title: 'Pescoço',
      description: 'Sinal para "pescoço" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:41',
      level: 'Iniciante',
      thumbnail: '/images/pescoco-thumb.png',
      videoSrc: '/videos/pescoco-video.mp4'
    },
    {
      id: '12',
      title: 'Pé',
      description: 'Sinal para "pé" em Libras.',
      category: 'membros-inferiores',
      duration: '0:43',
      level: 'Iniciante',
      thumbnail: '/images/pe-thumb.png',
      videoSrc: '/videos/pe-video.mp4'
    },
    {
      id: '13',
      title: 'Peito',
      description: 'Sinal para "peito" em Libras.',
      category: 'tronco',
      duration: '0:48',
      level: 'Iniciante',
      thumbnail: '/images/peito-thumb.png',
      videoSrc: '/videos/peito-video.mp4'
    },
    {
      id: '14',
      title: 'Cotovelo',
      description: 'Sinal para "cotovelo" em Libras.',
      category: 'membros-superiores',
      duration: '0:45',
      level: 'Iniciante',
      thumbnail: '/images/cotovelo-thumb.png',
      videoSrc: '/videos/cotovelo-video.mp4'
    },
    {
      id: '15',
      title: 'Coxa',
      description: 'Sinal para "coxa" em Libras.',
      category: 'membros-inferiores',
      duration: '0:44',
      level: 'Iniciante',
      thumbnail: '/images/coxa-thumb.png',
      videoSrc: '/videos/coxa-video.mp4'
    },
    {
      id: '16',
      title: 'Orelha',
      description: 'Sinal para "orelha" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:39',
      level: 'Iniciante',
      thumbnail: '/images/orelha-thumb.png',
      videoSrc: '/videos/orelha-video.mp4'
    },
    {
      id: '17',
      title: 'Barriga',
      description: 'Sinal para "barriga" em Libras.',
      category: 'tronco',
      duration: '0:47',
      level: 'Iniciante',
      thumbnail: '/images/barriga-thumb.png',
      videoSrc: '/videos/barriga-video.mp4'
    },
    {
      id: '18',
      title: 'Perna',
      description: 'Sinal para "perna" em Libras.',
      category: 'membros-inferiores',
      duration: '0:46',
      level: 'Iniciante',
      thumbnail: '/images/perna-thumb.png',
      videoSrc: '/videos/perna-video.mp4'
    },
    {
      id: '19',
      title: 'Testa',
      description: 'Sinal para "testa" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:41',
      level: 'Iniciante',
      thumbnail: '/images/testa-thumb.png',
      videoSrc: '/videos/testa-video.mp4'
    },
    {
      id: '20',
      title: 'Queixo',
      description: 'Sinal para "queixo" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:40',
      level: 'Iniciante',
      thumbnail: '/images/queixo-thumb.png',
      videoSrc: '/videos/queixo-video.mp4'
    },
    {
      id: '21',
      title: 'Dedos',
      description: 'Sinal para "dedos" em Libras.',
      category: 'membros-superiores',
      duration: '0:44',
      level: 'Iniciante',
      thumbnail: '/images/dedos-thumb.png',
      videoSrc: '/videos/dedos-video.mp4'
    },
  


    {
      id: '23',
      title: 'Cabelo',
      description: 'Sinal para "cabelo" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:42',
      level: 'Iniciante',
      thumbnail: '/images/cabelo-thumb.png',
      videoSrc: '/videos/cabelo-video.mp4'
    },
    {
      id: '24',
      title: 'Sobrancelha',
      description: 'Sinal para "sobrancelha" em Libras.',
      category: 'cabeça-pescoço',
      duration: '0:41',
      level: 'Iniciante',
      thumbnail: '/images/sobrancelha-thumb.png',
      videoSrc: '/videos/sobrancelha-video.mp4'
    }
  ], [])

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'cabeça-pescoço', label: 'Cabeça e Pescoço' },
    { key: 'membros-superiores', label: 'Membros Superiores' },
    { key: 'tronco', label: 'Tronco' },
    { key: 'membros-inferiores', label: 'Membros Inferiores' }
  ]

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        activeFilter === 'todos' || video.category === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [videos, searchTerm, activeFilter])

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-white font-[Poppins]">

      <section className="px-8 pt-16 pb-10 text-center bg-gradient-to-br from-[#6633FF10] to-[#FFCC0010] border-b border-gray-200">
        <h1 className="text-[2.8rem] font-extrabold text-[#6633FF] mb-5 leading-tight">
          Partes do Corpo em Libras
        </h1>

        <p className="text-[1.2rem] text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          Vídeos gravados pelos alunos mostrando sinais de Libras.
        </p>

        <div className="max-w-[1000px] mx-auto px-5">
          <div className="relative mb-6 max-w-[600px] mx-auto">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full py-4 pl-12 pr-5 rounded-full
                border-2 border-gray-300 text-lg
                focus:outline-none focus:border-[#6633FF]
                focus:ring-4 focus:ring-[#6633FF1A]
                transition
              "
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-[800px] mx-auto">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`
                  px-5 py-2 rounded-full border-2 font-semibold text-sm transition
                  ${
                    activeFilter === filter.key
                      ? 'bg-[#6633FF] text-white border-[#6633FF]'
                      : 'bg-white text-[#6633FF] border-[#6633FF] hover:bg-[#6633FF] hover:text-white hover:-translate-y-0.5'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 pt-10 pb-20">
        <h2 className="text-[1.8rem] font-bold text-gray-800 flex items-center gap-2 mb-8">
          {activeFilter === 'todos'
            ? 'Todos os Vídeos'
            : filters.find(f => f.key === activeFilter)?.label}
          <span className="text-base text-gray-500 font-normal">
            ({filteredVideos.length})
          </span>
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onWatchClick={() => handleVideoClick(video)}
            />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <FaVideo className="text-[#6633FF] w-12 h-12 mx-auto mb-5 opacity-80" />
            <h3 className="text-2xl text-gray-800">
              Nenhum vídeo encontrado
            </h3>
          </div>
        )}
      </section>

      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={closeModal}
      />
    </main>
  )
}

    
