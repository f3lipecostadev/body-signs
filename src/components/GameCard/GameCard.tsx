import React from 'react';
import { Game } from '../../types';
import styles from './GameCard.module.css';

interface GameCardProps {
  game: Game;
  onPlayClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlayClick }) => {
  return (
    <div className={styles.gameCard}>
      <div className={styles.gameHeader}>
        <div className={styles.gameIcon}>{game.icon}</div>
        <h2 className={styles.gameTitle}>{game.title}</h2>
        <p className={styles.gameSubtitle}>{game.subtitle}</p>
      </div>
      <div className={styles.gameContent}>
        <p className={styles.gameDescription}>{game.description}</p>
        <ul className={styles.gameFeatures}>
          {game.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button 
          className={styles.playBtn} 
          onClick={onPlayClick}
          data-game={game.type}
        >
          Jogar Agora
        </button>
      </div>
    </div>
  );
};

export default GameCard;