import { useState, useMemo } from "react"
import { QuizQuestion } from "../types.ts"

interface QuizGameProps {
  onClose: () => void
}

export default function QuizGame({ onClose }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

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
  ], [])

  const currentQ = quizQuestions[currentQuestion]
  const isGameOver = currentQuestion >= quizQuestions.length

  function handleAnswerSelect(index: number) {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    setShowFeedback(true)

    if (index === currentQ.correct) {
      setScore(prev => prev + 1)
    }
  }

  function handleNextQuestion() {
    setSelectedAnswer(null)
    setShowFeedback(false)
    setCurrentQuestion(prev => prev + 1)
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  /* ================= RESULTADO ================= */
  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <div className="text-6xl mb-6">🎉</div>

        <h2 className="text-3xl font-extrabold text-primary mb-4">
          Quiz Concluído!
        </h2>

        <p className="text-xl mb-4">
          Sua pontuação: <strong>{score}/{quizQuestions.length}</strong>
        </p>

        <p className="text-gray-600 mb-8 max-w-md">
          {score === quizQuestions.length
            ? "Perfeito! Você domina os sinais do corpo humano!"
            : score >= quizQuestions.length / 2
            ? "Bom trabalho! Continue praticando!"
            : "Não desanime! Pratique mais e você vai melhorar!"}
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition"
          >
            Voltar aos Jogos
          </button>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl bg-secondary text-primary font-semibold hover:bg-yellow-400 transition"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    )
  }

  /* ================= QUIZ ================= */
  return (
    <div className="flex flex-col items-center p-6">
      <h3 className="text-2xl font-semibold text-primary text-center mb-8">
        {currentQ.question}
      </h3>

      <div className="w-full max-w-md h-64 bg-gray-100 rounded-2xl flex items-center justify-center mb-8">
        <div className="text-center text-gray-500">
          <div className="text-5xl mb-2">📹</div>
          <p>Vídeo demonstrando: {currentQ.video}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        {currentQ.options.map((option, index) => {
          const isCorrect = index === currentQ.correct
          const isSelected = selectedAnswer === index

          let optionStyle =
            "border-gray-300 hover:border-primary hover:bg-gray-50"

          if (isSelected && isCorrect) {
            optionStyle = "bg-green-500 border-green-500 text-white"
          } else if (isSelected && !isCorrect) {
            optionStyle = "bg-red-500 border-red-500 text-white"
          }

          return (
            <button
              key={index}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswerSelect(index)}
              className={`p-4 rounded-xl border-2 text-lg font-medium transition ${optionStyle}`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div
          className={`mt-6 p-4 rounded-xl font-semibold text-center w-full max-w-lg
          ${selectedAnswer === currentQ.correct
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"}`}
        >
          {selectedAnswer === currentQ.correct
            ? "Parabéns! Resposta correta! 🎉"
            : "Ops! Tente novamente na próxima. 💪"}
        </div>
      )}

      <div className="flex justify-between w-full max-w-lg mt-6 p-4 bg-gray-100 rounded-xl font-semibold">
        <span>Pontuação: {score}</span>
        <span>
          Questão: {currentQuestion + 1}/{quizQuestions.length}
        </span>
      </div>

      {showFeedback && (
        <button
          onClick={handleNextQuestion}
          className="mt-6 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-accent transition"
        >
          {currentQuestion + 1 === quizQuestions.length
            ? "Ver Resultados"
            : "Próxima Questão"}
        </button>
      )}
    </div>
  )
}
