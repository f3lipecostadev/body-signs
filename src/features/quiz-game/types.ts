export type QuizQuestionType =
  | "image"
  | "video"
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
  assetLabel?: string;
  options: QuizOption[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export interface QuizAnswerResult {
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId: string;
}