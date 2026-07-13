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
  { id: "cabeca", name: "Cabeça", image: "/images/sinais/cabeca.png", category: "cabeça" },
  { id: "olho", name: "Olho", image: "/images/sinais/olho.png", category: "cabeça" },
  { id: "orelha", name: "Orelha", image: "/images/sinais/orelha.png", category: "cabeça" },
  { id: "boca", name: "Boca", image: "/images/sinais/boca.png", category: "cabeça" },
  { id: "lingua", name: "Língua", image: "/images/sinais/lingua.png", category: "cabeça" },
  { id: "testa", name: "Testa", image: "/images/sinais/testa.png", category: "cabeça" },
  { id: "queixo", name: "Queixo", image: "/images/sinais/queixo.png", category: "cabeça" },

  { id: "ombro", name: "Ombro", image: "/images/sinais/ombro.png", category: "tronco" },
  { id: "peito", name: "Peito", image: "/images/sinais/peito.png", category: "tronco" },
  { id: "barriga", name: "Barriga", image: "/images/sinais/barriga.png", category: "tronco" },
  { id: "umbigo", name: "Umbigo", image: "/images/sinais/umbigo.png", category: "tronco" },
  { id: "costas", name: "Costas", image: "/images/sinais/costas.png", category: "tronco" },
  { id: "quadril", name: "Quadril", image: "/images/sinais/quadril.png", category: "tronco" },

  { id: "braco", name: "Braço", image: "/images/sinais/braco.png", category: "membros" },
  { id: "cotovelo", name: "Cotovelo", image: "/images/sinais/cotovelo.png", category: "membros" },
  { id: "pulso", name: "Pulso", image: "/images/sinais/pulso.png", category: "membros" },
  { id: "dedo_da_mao", name: "Dedo da mão", image: "/images/sinais/dedo_da_mao.png", category: "membros" },
  { id: "perna", name: "Perna", image: "/images/sinais/perna.png", category: "membros" },
  { id: "coxa", name: "Coxa", image: "/images/sinais/coxa.png", category: "membros" },
  { id: "joelho", name: "Joelho", image: "/images/sinais/joelho.png", category: "membros" },
  { id: "tornozelo", name: "Tornozelo", image: "/images/sinais/tornozelo.png", category: "membros" },
  { id: "pe", name: "Pé", image: "/images/sinais/pe.png", category: "membros" },
  { id: "dedo_do_pe", name: "Dedo do pé", image: "/images/sinais/dedo_do_pe.png", category: "membros" },
];
