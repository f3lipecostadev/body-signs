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
  // ATENÇÃO: este item não existia. Não havia entrada de "nariz" nem
  // arquivo public/images/sinais/nariz.png no projeto — por isso a questão
  // q7 nunca conseguia exibir imagem. A imagem abaixo é um PLACEHOLDER
  // gerado automaticamente; substitua por uma foto/ilustração real do sinal.
  { id: "nariz", name: "Nariz", image: "/images/sinais/nariz.png", category: "cabeça" },

  { id: "ombro", name: "Ombro", image: "/images/sinais/ombro.png", category: "tronco" },
  { id: "peito", name: "Peito", image: "/images/sinais/peito.png", category: "tronco" },
  { id: "barriga", name: "Barriga", image: "/images/sinais/barriga.png", category: "tronco" },
  { id: "umbigo", name: "Umbigo", image: "/images/sinais/umbigo.png", category: "tronco" },
  { id: "costas", name: "Costas", image: "/images/sinais/costas.png", category: "tronco" },
  { id: "quadril", name: "Quadril", image: "/images/sinais/quadril.png", category: "tronco" },

  { id: "braco", name: "Braço", image: "/images/sinais/braco.png", category: "membros" },
  { id: "cotovelo", name: "Cotovelo", image: "/images/sinais/cotovelo.png", category: "membros" },
  { id: "pulso", name: "Pulso", image: "/images/sinais/pulso.png", category: "membros" },
  // ATENÇÃO: item que também faltava (mesmo problema do "nariz"). A questão
  // q19 (resposta correta "Mão") nunca conseguia exibir imagem porque não
  // havia entrada "mão" aqui nem arquivo mao.png. Placeholder gerado —
  // substitua pela imagem real do sinal.
  { id: "mao", name: "Mão", image: "/images/sinais/mao.png", category: "membros" },
  { id: "dedo_da_mao", name: "Dedo da mão", image: "/images/sinais/dedo_da_mao.png", category: "membros" },
  { id: "perna", name: "Perna", image: "/images/sinais/perna.png", category: "membros" },
  { id: "coxa", name: "Coxa", image: "/images/sinais/coxa.png", category: "membros" },
  { id: "joelho", name: "Joelho", image: "/images/sinais/joelho.png", category: "membros" },
  { id: "tornozelo", name: "Tornozelo", image: "/images/sinais/tornozelo.png", category: "membros" },
  { id: "pe", name: "Pé", image: "/images/sinais/pe.png", category: "membros" },
  { id: "dedo_do_pe", name: "Dedo do pé", image: "/images/sinais/dedo_do_pe.png", category: "membros" },
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
