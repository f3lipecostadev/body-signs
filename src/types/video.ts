export type VideoCategory =
  | "Cabeça e Rosto"
  | "Tronco"
  | "Membros Superiores"
  | "Membros Inferiores";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  youtubeUrl: string;
  thumbnail?: string;
  category: VideoCategory;
  tags: string[];
}