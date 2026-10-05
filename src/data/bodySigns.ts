import type { BodySignItem } from "@/types/body-sign";

/**
 * Lista de sinais usados no Jogo da Memória (e disponível para futura
 * reutilização em outras telas).
 *
 * IMPORTANTE: o campo "image" precisa apontar para um arquivo que REALMENTE
 * existe em public/images/sinais/. Para adicionar um novo sinal:
 *   1. Coloque a imagem (quadrada, fundo neutro) em public/images/sinais/
 *   2. Adicione um novo objeto aqui com id, name, image e category
 * Veja o guia completo em GUIA-DE-EDICAO.md na raiz do projeto.
 */
export const bodySignsData: BodySignItem[] = [
  { id: "cabeca", name: "Cabeça", image: "/images/sinais/cabeca.webp", category: "cabeça" },
  { id: "olho", name: "Olho", image: "/images/sinais/olho.webp", category: "cabeça" },
  { id: "orelha", name: "Orelha", image: "/images/sinais/orelha.webp", category: "cabeça" },
  { id: "boca", name: "Boca", image: "/images/sinais/boca.webp", category: "cabeça" },
  { id: "lingua", name: "Língua", image: "/images/sinais/lingua.webp", category: "cabeça" },
  { id: "testa", name: "Testa", image: "/images/sinais/testa.webp", category: "cabeça" },
  { id: "queixo", name: "Queixo", image: "/images/sinais/queixo.webp", category: "cabeça" },
  { id: "nariz", name: "Nariz", image: "/images/sinais/nariz.webp", category: "cabeça" },

  { id: "ombro", name: "Ombro", image: "/images/sinais/ombro.webp", category: "tronco" },
  { id: "peito", name: "Peito", image: "/images/sinais/peito.webp", category: "tronco" },
  { id: "barriga", name: "Barriga", image: "/images/sinais/barriga.webp", category: "tronco" },
  { id: "umbigo", name: "Umbigo", image: "/images/sinais/umbigo.webp", category: "tronco" },
  { id: "costas", name: "Costas", image: "/images/sinais/costas.webp", category: "tronco" },
  { id: "quadril", name: "Quadril", image: "/images/sinais/quadril.webp", category: "tronco" },

  { id: "braco", name: "Braço", image: "/images/sinais/braco.webp", category: "membros" },
  { id: "cotovelo", name: "Cotovelo", image: "/images/sinais/cotovelo.webp", category: "membros" },
  { id: "pulso", name: "Pulso", image: "/images/sinais/pulso.webp", category: "membros" },
  { id: "mao", name: "Mão", image: "/images/sinais/mao.webp", category: "membros" },
  { id: "dedo_da_mao", name: "Dedo da mão", image: "/images/sinais/dedo_da_mao.webp", category: "membros" },
  { id: "perna", name: "Perna", image: "/images/sinais/perna.webp", category: "membros" },
  { id: "coxa", name: "Coxa", image: "/images/sinais/coxa.webp", category: "membros" },
  { id: "joelho", name: "Joelho", image: "/images/sinais/joelho.webp", category: "membros" },
  { id: "tornozelo", name: "Tornozelo", image: "/images/sinais/tornozelo.webp", category: "membros" },
  { id: "pe", name: "Pé", image: "/images/sinais/pe.webp", category: "membros" },
  { id: "dedo_do_pe", name: "Dedo do pé", image: "/images/sinais/dedo_do_pe.webp", category: "membros" },
];

/**
 * Índice por id para lookup O(1) e sem ambiguidade. Esta é a forma
 * recomendada de resolver a imagem de um sinal — ao invés de tentar
 * "adivinhar" o sinal a partir de texto livre (assetLabel/opção de
 * resposta), use bodySignsById[imageId].
 */
export const bodySignsById: Record<string, BodySignItem> = Object.fromEntries(
  bodySignsData.map((item) => [item.id, item]),
);

/** Busca um sinal pelo `id`. Retorna `undefined` se o id não existir. */
export function getBodySignById(id: string): BodySignItem | undefined {
  return bodySignsById[id];
}
