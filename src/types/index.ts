export interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  thumbnail: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  type: 'quiz' | 'video' | 'memory';
}

export interface QuizQuestion {
  question: string;
  video: string;
  options: string[];
  correct: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}