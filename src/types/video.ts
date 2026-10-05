export type VideoCategory =
  | "Cabeça e Rosto"
  | "Tronco"
  | "Membros Superiores"
  | "Membros Inferiores";

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  thumbnail: string;
  video: string;
  duration?: string;
  tags: string[];
}
