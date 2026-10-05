export interface MemorySignal {
  nome: string;
  imagem: string;
}

export interface MemoryCardData {
  cartaId: string;
  parId: string;
  tipo: "imagem" | "texto";
  nome: string;
  imagem: string;
}

export interface FlippedCard {
  elementoId: string;
  dados: MemoryCardData;
}