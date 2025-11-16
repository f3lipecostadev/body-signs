import React, { useState, useMemo } from 'react';
import { QuizQuestion } from '../../types';
import styles from './QuizGame.module.css';

interface QuizGameProps {
  onClose: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const quizQuestions: QuizQuestion[] = useMemo(() => [
    {
      question: "Qual é o sinal correto para 'cabeça' em Libras?",
      video: "cabeça",
      options: [
        "Toque na testa com a palma da mão",
        "Toque no queixo com os dedos", 
        "Circular a mão ao redor do rosto",
        "Toque no topo da cabeça com a palma"
      ],
      correct: 3
    },
    {
      question: "Como se sinaliza 'olho' em Libras?",
      video: "olho",
      options: [
        "Apontar para o nariz",
        "Fazer círculos ao redor dos olhos",
        "Apontar para o olho com o dedo indicador",
        "Piscar rapidamente"
      ],
      correct: 2
    },
    {
      question: "Qual movimento representa 'coração' em Libras?",
      video: "coração", 
      options: [
        "Bater no peito com o punho",
        "Desenhar um coração no ar com as mãos",
        "Colocar a mão sobre o peito esquerdo",
        "Cruzar os braços sobre o peito"
      ],
      correct: 2
    }
  ], []);

  const currentQ = quizQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    if (answerIndex === currentQ.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestion(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const isGameOver = currentQuestion >= quizQuestions.length;

  if (isGameOver) {
    return (
      <div className={styles.quizResults}>
        <div className={styles.resultsContent}>
          <div className={styles.resultsIcon}>🎉</div>
          <h2 className={styles.resultsTitle}>Quiz Concluído!</h2>
          <p className={styles.resultsScore}>
            Sua pontuação final: <strong>{score}/{quizQuestions.length}</strong>
          </p>
          <p className={styles.resultsMessage}>
            {score === quizQuestions.length 
              ? 'Perfeito! Você domina os sinais do corpo humano!' 
              : score >= quizQuestions.length / 2 
              ? 'Bom trabalho! Continue praticando!' 
              : 'Não desanime! Pratique mais e você vai melhorar!'}
          </p>
          <div className={styles.resultsActions}>
            <button className={styles.resultsButton} onClick={onClose}>
              Voltar aos Jogos
            </button>
            <button 
              className={`${styles.resultsButton} ${styles.playAgain}`}
              onClick={handleRestart}
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizGame}>
      <h3 className={styles.quizQuestion}>{currentQ.question}</h3>
      
      <div className={styles.quizVideo}>
        <div className={styles.videoPlaceholder}>
          <div className={styles.videoIcon}>📹</div>
          <p>Vídeo demonstrando: {currentQ.video}</p>
        </div>
      </div>
      
      <div className={styles.quizOptions}>
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className={`${styles.quizOption} ${
              selectedAnswer === index
                ? index === currentQ.correct
                  ? styles.correct
                  : styles.incorrect
                : ''
            }`}
            onClick={() => handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className={`${styles.gameFeedback} ${
          selectedAnswer === currentQ.correct ? styles.feedbackCorrect : styles.feedbackIncorrect
        }`}>
          {selectedAnswer === currentQ.correct 
            ? "Parabéns! Resposta correta! 🎉" 
            : "Ops! Tente novamente na próxima. 💪"}
        </div>
      )}

      <div className={styles.gameStats}>
        <span>Pontuação: {score}</span>
        <span>Questão: {currentQuestion + 1}/{quizQuestions.length}</span>
      </div>

      {showFeedback && (
        <button className={styles.nextBtn} onClick={handleNextQuestion}>
          {currentQuestion + 1 === quizQuestions.length ? 'Ver Resultados' : 'Próxima Questão'}
        </button>
      )}
    </div>
  );
};

export default QuizGame;