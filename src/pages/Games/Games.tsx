import React, { useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import QuizGame from '../../components/QuizGame/QuizGame';
import { Game } from '../../types';
import styles from './Games.module.css';

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const games: Game[] = [
    {
      id: '1',
      title: 'Quiz do Corpo',
      subtitle: 'Teste de múltipla escolha',
      description: 'Teste seus conhecimentos sobre os sinais das partes do corpo humano em Libras com perguntas de múltipla escolha.',
      icon: '❓',
      features: [
        'Perguntas com imagens e descrições',
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
      description: 'Assista a vídeos curtos de alunos sinalizando e adivinhe qual parte do corpo está sendo representada.',
      icon: '🎬',
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
      description: 'Encontre os pares correspondentes entre imagens das partes do corpo e seus sinais em Libras.',
      icon: '🧠',
      features: [
        'Cartas com imagens e sinais',
        'Diferentes níveis de dificuldade',
        'Memorização visual',
        'Modo contra o tempo'
      ],
      type: 'memory'
    }
  ];

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.gamesHero}>
        <h1>Jogos Disponíveis</h1>
        <p>
          Desafie-se e aprenda Libras com diversão! Escolha um dos jogos abaixo 
          para testar seus conhecimentos sobre o corpo humano em Língua Brasileira de Sinais.
        </p>
      </section>

      <section className={styles.gamesSection}>
        <div className={styles.gamesGrid}>
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onPlayClick={() => handlePlayGame(game)}
            />
          ))}
        </div>
      </section>

      {/* Game Modal */}
      {isModalOpen && selectedGame && (
        <div className={styles.gameModal}>
          <div className={styles.modalGameContent}>
            <button className={styles.closeModal} onClick={closeModal} aria-label="Fechar jogo">
              &times;
            </button>
            
            <div className={styles.gameArea}>
              {selectedGame.type === 'quiz' && (
                <QuizGame onClose={closeModal} />
              )}
              {selectedGame.type === 'video' && (
                <div className={styles.comingSoon}>
                  <div className={styles.comingSoonIcon}>🎬</div>
                  <h3>Descubra pelo Vídeo</h3>
                  <p>Este jogo está em desenvolvimento. Em breve estará disponível!</p>
                  <button className={styles.backButton} onClick={closeModal}>
                    Voltar aos Jogos
                  </button>
                </div>
              )}
              {selectedGame.type === 'memory' && (
                <div className={styles.comingSoon}>
                  <div className={styles.comingSoonIcon}>🧠</div>
                  <h3>Memória dos Sinais</h3>
                  <p>Este jogo está em desenvolvimento. Em breve estará disponível!</p>
                  <button className={styles.backButton} onClick={closeModal}>
                    Voltar aos Jogos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Games;