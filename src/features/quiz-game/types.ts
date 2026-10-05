export type QuizQuestionType =
  | "image"
  | "true-false"
  | "multiple-choice"
  | "direct-answer";

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  prompt?: string;
  /**
   * Texto descritivo da imagem, usado como legenda/alt-text (acessibilidade).
   * NÃO é usado para localizar o arquivo de imagem — veja `imageId`.
   */
  assetLabel?: string;
  /**
   * Referência explícita ao sinal em `bodySignsData` (campo `id`), usada
   * para resolver a imagem exibida em perguntas do tipo "image".
   * Deve corresponder a um `id` existente em src/data/bodySigns.ts.
   */
  imageId?: string;
  options: QuizOption[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export interface QuizAnswerResult {
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId: string;
}