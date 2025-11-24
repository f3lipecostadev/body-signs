import React, { useEffect } from 'react';
import { Video } from '../../types';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  isOpen: boolean;
  video: Video | null;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, video, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className={styles.videoModal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeModal} onClick={onClose}>
          &times;
        </button>

        <video 
          src={video.videoSrc}
          controls
          autoPlay
          className={styles.videoPlayer}
        />

        <h3 className={styles.modalTitle}>{video.title}</h3>
        <p className={styles.modalDescription}>{video.description}</p>

      </div>
    </div>
  );
};

export default VideoModal;