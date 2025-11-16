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

  // Dados dos vídeos (em um projeto real, viria de uma API)
  const videos: Video[] = useMemo(() => [
    {
      id: '1',
      title: 'Braço',
      description: 'Demonstração do sinal para "braço" em Libras, mostrando o membro superior do corpo humano.',
      category: 'membros-superiores',
      duration: '0:52',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Bra%C3%A7o'
    },
    {
      id: '2',
      title: 'Cabeça',
      description: 'Aprenda o sinal correto para "cabeça" em Libras, demonstrando a região que compreende o crânio e o rosto.',
      category: 'cabeça-pescoço',
      duration: '0:45',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Cabe%C3%A7a'
    },
    {
      id: '3',
      title: 'Joelho',
      description: 'Demonstração do sinal para "joelho" em Libras, articulação entre a coxa e a perna.',
      category: 'membros-inferiores',
      duration: '0:40',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Joelho'
    },
    {
      id: '4',
      title: 'Olho',
      description: 'Aprenda o sinal para "olho" em Libras, órgão responsável pela visão localizado na face.',
      category: 'cabeça-pescoço',
      duration: '0:38',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Olho'
    },
    {
      id: '5',
      title: 'Costas',
      description: 'Demonstração do sinal para "costas" em Libras, parte posterior do tronco humano.',
      category: 'tronco',
      duration: '0:46',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Costas'
    },
    {
      id: '6',
      title: 'Mão',
      description: 'Demonstração do sinal para "mão" em Libras, parte terminal do braço usada para manipulação.',
      category: 'membros-superiores',
      duration: '0:47',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20M%C3%A3o'
    },
    {
      id: '7',
      title: 'Nariz',
      description: 'Aprenda o sinal para "nariz" em Libras, órgão responsável pelo olfato e parte da respiração.',
      category: 'cabeça-pescoço',
      duration: '0:42',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Nariz'
    },
    {
      id: '8',
      title: 'Tornozelo',
      description: 'Sinal para "tornozelo" em Libras, articulação que liga a perna ao pé.',
      category: 'membros-inferiores',
      duration: '0:42',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Tornozelo'
    },
    {
      id: '9',
      title: 'Ombro',
      description: 'Sinal para "ombro" em Libras, parte superior do tronco que conecta o braço ao corpo.',
      category: 'membros-superiores',
      duration: '0:46',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Ombro'
    },
    {
      id: '10',
      title: 'Boca',
      description: 'Demonstração do sinal para "boca" em Libras, parte do rosto usada para fala e alimentação.',
      category: 'cabeça-pescoço',
      duration: '0:44',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Boca'
    },
    {
      id: '11',
      title: 'Quadril',
      description: 'Sinal para "quadril" em Libras, região que conecta o tronco às pernas.',
      category: 'tronco',
      duration: '0:44',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Quadril'
    },
    {
      id: '12',
      title: 'Pescoço',
      description: 'Aprenda o sinal para "pescoço" em Libras, região que conecta a cabeça ao tronco.',
      category: 'cabeça-pescoço',
      duration: '0:41',
      level: 'Iniciante',
      thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Pesco%C3%A7o'
    },
    {
  id: '13',
  title: 'Pé',
  description: 'Sinal para "pé" em Libras, parte terminal do membro inferior usado para locomoção.',
  category: 'membros-inferiores',
  duration: '0:43',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20P%C3%A9'
},
{
  id: '14',
  title: 'Tórax',
  description: 'Demonstração do sinal para "tórax" em Libras, parte anterior do tronco que contém o peito.',
  category: 'tronco',
  duration: '0:48',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20T%C3%B3rax'
},
{
  id: '15',
  title: 'Cotovelo',
  description: 'Sinal para "cotovelo" em Libras, articulação que conecta o braço ao antebraço.',
  category: 'membros-superiores',
  duration: '0:45',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Cotovelo'
},
{
  id: '16',
  title: 'Coxa',
  description: 'Aprenda o sinal para "coxa" em Libras, parte superior do membro inferior entre o quadril e o joelho.',
  category: 'membros-inferiores',
  duration: '0:44',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Coxa'
},
{
  id: '17',
  title: 'Orelha',
  description: 'Demonstração do sinal para "orelha" em Libras, órgão responsável pela audição localizado na cabeça.',
  category: 'cabeça-pescoço',
  duration: '0:39',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Orelha'
},
{
  id: '18',
  title: 'Abdómen',
  description: 'Sinal para "abdómen" em Libras, parte central do tronco também conhecida como barriga.',
  category: 'tronco',
  duration: '0:47',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Abd%C3%B3men'
},
{
  id: '19',
  title: 'Antebraço',
  description: 'Aprenda o sinal para "antebraço" em Libras, parte do membro superior entre o cotovelo e o punho.',
  category: 'membros-superiores',
  duration: '0:49',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Antebra%C3%A7o'
},
{
  id: '20',
  title: 'Perna',
  description: 'Demonstração do sinal para "perna" em Libras, parte do membro inferior entre o joelho e o tornozelo.',
  category: 'membros-inferiores',
  duration: '0:46',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Perna'
},
{
  id: '21',
  title: 'Testa',
  description: 'Sinal para "testa" em Libras, parte superior da face acima dos olhos.',
  category: 'cabeça-pescoço',
  duration: '0:41',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Testa'
},
{
  id: '22',
  title: 'Queixo',
  description: 'Aprenda o sinal para "queixo" em Libras, parte inferior da face abaixo da boca.',
  category: 'cabeça-pescoço',
  duration: '0:40',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Queixo'
},
{
  id: '23',
  title: 'Dedos',
  description: 'Demonstração do sinal para "dedos" em Libras, partes terminais da mão usadas para manipulação.',
  category: 'membros-superiores',
  duration: '0:44',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Dedos'
},
{
  id: '24',
  title: 'Punho',
  description: 'Sinal para "punho" em Libras, articulação que conecta o antebraço à mão.',
  category: 'membros-superiores',
  duration: '0:43',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Punho'
},
{
  id: '25',
  title: 'Rosto',
  description: 'Aprenda o sinal para "rosto" em Libras, parte frontal da cabeça que inclui os traços faciais.',
  category: 'cabeça-pescoço',
  duration: '0:46',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Rosto'
},
{
  id: '26',
  title: 'Cabelo',
  description: 'Demonstração do sinal para "cabelo" em Libras, pelos que crescem no couro cabeludo.',
  category: 'cabeça-pescoço',
  duration: '0:42',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Cabelo'
},
{
  id: '27',
  title: 'Sobrancelha',
  description: 'Aprenda o sinal para "sobrancelha" em Libras, pelos localizados acima dos olhos na região da testa.',
  category: 'cabeça-pescoço',
  duration: '0:41',
  level: 'Iniciante',
  thumbnail: 'https://placeholder.pics/svg/400x180/DEDEDE/555555/Thumbnail%20Sobrancelha'
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
        activeFilter === 'todos' || 
        video.category === activeFilter;

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
      {/* Hero Section */}
      <section className={styles.teachingHero}>
        <h1>Partes do Corpo em Libras</h1>
        <p>
          Nesta página, você encontrará vídeos com sinais em Libras feitos pelos 
          próprios alunos, mostrando como representar diferentes partes do corpo humano.
        </p>
        
        <div className={styles.searchFilters}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Buscar sinais ou partes do corpo..."
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

      {/* Videos Grid Section */}
      <section className={styles.videosSection}>
        <div className={styles.videosHeader}>
          <h2 className={styles.sectionTitle}>
            {activeFilter === 'todos' ? 'Todos os Vídeos' : `Vídeos: ${filters.find(f => f.key === activeFilter)?.label}`}
            <span className={styles.videosCount}>({filteredVideos.length})</span>
          </h2>
        </div>

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
            <p>Tente ajustar sua busca ou filtro para encontrar o que procura.</p>
          </div>
        )}
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        video={selectedVideo}
        onClose={closeModal}
      />
    </main>
  );
};

export default Videos;