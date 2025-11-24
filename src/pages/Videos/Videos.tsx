import React, { useState, useMemo } from 'react';
import VideoCard from '../../components/VideoCard/VideoCard';
import VideoModal from '../../components/VideoModal/VideoModal';
import { Video } from '../../types';
import styles from './Videos.module.css';

const Videos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  id: '6',
  title: 'Mão',
  description: 'Sinal para "mão" em Libras.',
  category: 'membros-superiores',
  duration: '0:09',
  level: 'Iniciante',
  thumbnail: '/images/mao-thumb.png',
  videoSrc: '/videos/mao-video.mp4'
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
  id: '22',
  title: 'Punho',
  description: 'Sinal para "punho" em Libras.',
  category: 'membros-superiores',
  duration: '0:43',
  level: 'Iniciante',
  thumbnail: '/images/punho-thumb.png',
  videoSrc: '/videos/punho-video.mp4'
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
}], []);

  const filters = [
    { key: 'todos', label: 'Todos' },
    { key: 'cabeça-pescoço', label: 'Cabeça e Pescoço' },
    { key: 'membros-superiores', label: 'Membros Superiores' },
    { key: 'tronco', label: 'Tronco' },
    { key: 'membros-inferiores', label: 'Membros Inferiores' }
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch =
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        activeFilter === 'todos' || video.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [videos, searchTerm, activeFilter]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <main className={styles.videosPage}>
      <section className={styles.teachingHero}>
        <h1>Partes do Corpo em Libras</h1>
        <p>Vídeos gravados pelos alunos mostrando sinais de Libras.</p>

        <div className={styles.searchFilters}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text"
              className={styles.searchInput}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.filterContainer}>
            {filters.map(filter => (
              <button
                key={filter.key}
                className={`${styles.filterBtn} ${
                  activeFilter === filter.key ? styles.active : ''
                }`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.videosSection}>
        <h2 className={styles.sectionTitle}>
          {activeFilter === 'todos' ? 'Todos os Vídeos' : filters.find(f => f.key === activeFilter)?.label}
          <span className={styles.videosCount}>({filteredVideos.length})</span>
        </h2>

        <div className={styles.videosGrid}>
          {filteredVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              onWatchClick={() => handleVideoClick(video)}
            />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>🎬</div>
            <h3>Nenhum vídeo encontrado</h3>
          </div>
        )}
      </section>

      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={closeModal}
      />
    </main>
  );
};

export default Videos;