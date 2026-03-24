import type { GameItem } from "@/types/game";

export const gamesData: GameItem[] = [
  {
    id: "quiz",
    title: "Quiz Interativo",
    description: "Teste seus conhecimentos de Libras respondendo perguntas sobre sinais.",
    image: "/images/quiz-thumb.png",
    href: "/jogos/quiz",
  },
  {
    id: "memoria",
    title: "Jogo da Memória",
    description: "Encontre os pares corretos entre a imagem e o nome de cada sinal em Libras.",
    image: "/images/memoria-thumb.png",
    href: "/jogos/memoria",
  },
  {
    id: "cobrinha",
    title: "Cobrinha com Perguntas",
    description: "Capture os pontos, responda corretamente e avance até completar o desafio.",
    image: "/images/snake-thumb.png",
    href: "/jogos/cobrinha",
  },
];