import React from 'react';
import { Video } from '../../types';
import styles from './VideoCard.module.css';

interface VideoCardProps {
  video: Video;
  onWatchClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onWatchClick }) => {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'iniciante': return '#4CAF50';
      case 'intermediário': return '#FF9800';
      case 'avançado': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className={styles.videoCard} data-category={video.category}>
      <div className={styles.thumbnailContainer}>
        <div className={styles.videoThumbnail}>

          <img 
            src={video.thumbnail} 
            alt={`Vídeo demonstrando o sinal de ${video.title} em Libras`} 
            className={styles.thumbnailImage}
          />

          {/* Ícone Play vira o BOTÃO */}
          <div 
            className={styles.playOverlay}
            onClick={onWatchClick}
            role="button"
            aria-label={`Assistir ${video.title}`}
          >
            <div className={styles.playIcon}>▶</div>
          </div>

          <div className={styles.videoDuration}>
            {video.duration}
          </div>
        </div>
      </div>

      <div className={styles.videoInfo}>
        <div className={styles.videoHeader}>
          <h3 className={styles.videoTitle}>{video.title}</h3>
          <div 
            className={styles.levelBadge}
            style={{ backgroundColor: getLevelColor(video.level) }}
          >
            {video.level}
          </div>
        </div>
        
        <p className={styles.videoDescription}>{video.description}</p>
        
        <div className={styles.videoMetadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            <span>{video.duration}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📊</span>
            <span>{video.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
