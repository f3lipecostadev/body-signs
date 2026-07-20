import type { VideoCategory, VideoItem } from "@/types/video";

import cabecaThumbnail from "@/assets/thumbnails/cabeca.jpg";
import olhoThumbnail from "@/assets/thumbnails/olho.jpg";
import orelhaThumbnail from "@/assets/thumbnails/orelha.jpg";
import narizThumbnail from "@/assets/thumbnails/nariz.jpg";
import bocaThumbnail from "@/assets/thumbnails/boca.jpg";
import linguaThumbnail from "@/assets/thumbnails/lingua.jpg";
import testaThumbnail from "@/assets/thumbnails/testa.jpg";
import queixoThumbnail from "@/assets/thumbnails/queixo.jpg";
import ombroThumbnail from "@/assets/thumbnails/ombro.jpg";
import peitoThumbnail from "@/assets/thumbnails/peito.jpg";
import barrigaThumbnail from "@/assets/thumbnails/barriga.jpg";
import costasThumbnail from "@/assets/thumbnails/costas.jpg";
import umbigoThumbnail from "@/assets/thumbnails/umbigo.jpg";
import quadrilThumbnail from "@/assets/thumbnails/quadril.jpg";
import bracoThumbnail from "@/assets/thumbnails/braco.jpg";
import cotoveloThumbnail from "@/assets/thumbnails/cotovelo.jpg";
import pulsoThumbnail from "@/assets/thumbnails/pulso.jpg";
import maoThumbnail from "@/assets/thumbnails/mao.jpg";
import dedoDaMaoThumbnail from "@/assets/thumbnails/dedo_da_mao.jpg";
import coxaThumbnail from "@/assets/thumbnails/coxa.jpg";
import joelhoThumbnail from "@/assets/thumbnails/joelho.jpg";
import pernaThumbnail from "@/assets/thumbnails/perna.jpg";
import tornozeloThumbnail from "@/assets/thumbnails/tornozelo.jpg";
import peThumbnail from "@/assets/thumbnails/pe.jpg";
import dedoDoPeThumbnail from "@/assets/thumbnails/dedo_do_pe.jpg";

import cabecaVideo from "@/assets/videos/cabeca.mp4";
import olhoVideo from "@/assets/videos/olho.mp4";
import orelhaVideo from "@/assets/videos/orelha.mp4";
import narizVideo from "@/assets/videos/nariz.mp4";
import bocaVideo from "@/assets/videos/boca.mp4";
import linguaVideo from "@/assets/videos/lingua.mp4";
import testaVideo from "@/assets/videos/testa.mp4";
import queixoVideo from "@/assets/videos/queixo.mp4";
import ombroVideo from "@/assets/videos/ombro.mp4";
import peitoVideo from "@/assets/videos/peito.mp4";
import barrigaVideo from "@/assets/videos/barriga.mp4";
import costasVideo from "@/assets/videos/costas.mp4";
import umbigoVideo from "@/assets/videos/umbigo.mp4";
import quadrilVideo from "@/assets/videos/quadril.mp4";
import bracoVideo from "@/assets/videos/braco.mp4";
import cotoveloVideo from "@/assets/videos/cotovelo.mp4";
import pulsoVideo from "@/assets/videos/pulso.mp4";
import maoVideo from "@/assets/videos/mao.mp4";
import dedoDaMaoVideo from "@/assets/videos/dedo_da_mao.mp4";
import coxaVideo from "@/assets/videos/coxa.mp4";
import joelhoVideo from "@/assets/videos/joelho.mp4";
import pernaVideo from "@/assets/videos/perna.mp4";
import tornozeloVideo from "@/assets/videos/tornozelo.mp4";
import peVideo from "@/assets/videos/pe.mp4";
import dedoDoPeVideo from "@/assets/videos/dedo_do_pe.mp4";

export const videoCategories: Array<VideoCategory> = [
  "Cabeça e Rosto",
  "Tronco",
  "Membros Superiores",
  "Membros Inferiores",
];

/**
 * Lista oficial de vídeos da página "Corpo em Libras".
 *
 * O projeto contém exclusivamente os 25 sinais abaixo. Cada sinal segue um
 * único padrão de nomenclatura em todas as suas referências (id, arquivo de
 * thumbnail, arquivo de vídeo, nome da variável de import): minúsculo, sem
 * acento, no singular, com "_" separando palavras compostas
 * (ex.: "dedo_da_mao", "dedo_do_pe").
 */
export const videosData: VideoItem[] = [
  {
    id: "cabeca",
    title: "Cabeça em Libras",
    description: "Aprenda o sinal de cabeça em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: cabecaThumbnail,
    video: cabecaVideo,
    duration: "0:42",
    tags: ["cabeça", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "olho",
    title: "Olho em Libras",
    description: "Aprenda o sinal de olho em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: olhoThumbnail,
    video: olhoVideo,
    duration: "0:40",
    tags: ["olho", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "orelha",
    title: "Orelha em Libras",
    description: "Aprenda o sinal de orelha em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: orelhaThumbnail,
    video: orelhaVideo,
    duration: "0:39",
    tags: ["orelha", "ouvido", "rosto", "libras"],
  },
  {
    id: "nariz",
    title: "Nariz em Libras",
    description: "Aprenda o sinal de nariz em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: narizThumbnail,
    video: narizVideo,
    duration: "0:37",
    tags: ["nariz", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "boca",
    title: "Boca em Libras",
    description: "Aprenda o sinal de boca em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: bocaThumbnail,
    video: bocaVideo,
    duration: "0:36",
    tags: ["boca", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "lingua",
    title: "Língua em Libras",
    description: "Aprenda o sinal de língua em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: linguaThumbnail,
    video: linguaVideo,
    duration: "0:38",
    tags: ["língua", "boca", "rosto", "libras"],
  },
  {
    id: "testa",
    title: "Testa em Libras",
    description: "Aprenda o sinal de testa em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: testaThumbnail,
    video: testaVideo,
    duration: "0:03",
    tags: ["testa", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "queixo",
    title: "Queixo em Libras",
    description: "Aprenda o sinal de queixo em Libras.",
    category: "Cabeça e Rosto",
    thumbnail: queixoThumbnail,
    video: queixoVideo,
    duration: "0:03",
    tags: ["queixo", "rosto", "partes do corpo", "libras"],
  },
  {
    id: "ombro",
    title: "Ombro em Libras",
    description: "Aprenda o sinal de ombro em Libras.",
    category: "Tronco",
    thumbnail: ombroThumbnail,
    video: ombroVideo,
    duration: "0:43",
    tags: ["ombro", "tronco", "partes do corpo", "libras"],
  },
  {
    id: "peito",
    title: "Peito em Libras",
    description: "Aprenda o sinal de peito em Libras.",
    category: "Tronco",
    thumbnail: peitoThumbnail,
    video: peitoVideo,
    duration: "0:40",
    tags: ["peito", "tronco", "partes do corpo", "libras"],
  },
  {
    id: "barriga",
    title: "Barriga em Libras",
    description: "Aprenda o sinal de barriga em Libras.",
    category: "Tronco",
    thumbnail: barrigaThumbnail,
    video: barrigaVideo,
    duration: "0:39",
    tags: ["barriga", "abdômen", "tronco", "libras"],
  },
  {
    id: "costas",
    title: "Costas em Libras",
    description: "Aprenda o sinal de costas em Libras.",
    category: "Tronco",
    thumbnail: costasThumbnail,
    video: costasVideo,
    duration: "0:44",
    tags: ["costas", "tronco", "partes do corpo", "libras"],
  },
  {
    id: "umbigo",
    title: "Umbigo em Libras",
    description: "Aprenda o sinal de umbigo em Libras.",
    category: "Tronco",
    thumbnail: umbigoThumbnail,
    video: umbigoVideo,
    duration: "0:24",
    tags: ["umbigo", "tronco", "partes do corpo", "libras"],
  },
  {
    id: "quadril",
    title: "Quadril em Libras",
    description: "Aprenda o sinal de quadril em Libras.",
    category: "Tronco",
    thumbnail: quadrilThumbnail,
    video: quadrilVideo,
    duration: "0:42",
    tags: ["quadril", "tronco", "partes do corpo", "libras"],
  },
  {
    id: "braco",
    title: "Braço em Libras",
    description: "Aprenda o sinal de braço em Libras.",
    category: "Membros Superiores",
    thumbnail: bracoThumbnail,
    video: bracoVideo,
    duration: "0:40",
    tags: ["braço", "membros superiores", "libras"],
  },
  {
    id: "cotovelo",
    title: "Cotovelo em Libras",
    description: "Aprenda o sinal de cotovelo em Libras.",
    category: "Membros Superiores",
    thumbnail: cotoveloThumbnail,
    video: cotoveloVideo,
    duration: "0:38",
    tags: ["cotovelo", "membros superiores", "libras"],
  },
  {
    id: "pulso",
    title: "Pulso em Libras",
    description: "Aprenda o sinal de pulso em Libras.",
    category: "Membros Superiores",
    thumbnail: pulsoThumbnail,
    video: pulsoVideo,
    duration: "0:36",
    tags: ["pulso", "membros superiores", "libras"],
  },
  {
    id: "mao",
    title: "Mão em Libras",
    description: "Aprenda o sinal de mão em Libras.",
    category: "Membros Superiores",
    thumbnail: maoThumbnail,
    video: maoVideo,
    duration: "0:39",
    tags: ["mão", "membros superiores", "libras"],
  },
  {
    id: "dedo_da_mao",
    title: "Dedo da mão em Libras",
    description: "Aprenda o sinal de dedo da mão em Libras.",
    category: "Membros Superiores",
    thumbnail: dedoDaMaoThumbnail,
    video: dedoDaMaoVideo,
    duration: "0:37",
    tags: ["dedo da mão", "mão", "membros superiores", "libras"],
  },
  {
    id: "coxa",
    title: "Coxa em Libras",
    description: "Aprenda o sinal de coxa em Libras.",
    category: "Membros Inferiores",
    thumbnail: coxaThumbnail,
    video: coxaVideo,
    duration: "0:43",
    tags: ["coxa", "membros inferiores", "libras"],
  },
  {
    id: "joelho",
    title: "Joelho em Libras",
    description: "Aprenda o sinal de joelho em Libras.",
    category: "Membros Inferiores",
    thumbnail: joelhoThumbnail,
    video: joelhoVideo,
    duration: "0:40",
    tags: ["joelho", "membros inferiores", "libras"],
  },
  {
    id: "perna",
    title: "Perna em Libras",
    description: "Aprenda o sinal de perna em Libras.",
    category: "Membros Inferiores",
    thumbnail: pernaThumbnail,
    video: pernaVideo,
    duration: "0:39",
    tags: ["perna", "membros inferiores", "libras"],
  },
  {
    id: "tornozelo",
    title: "Tornozelo em Libras",
    description: "Aprenda o sinal de tornozelo em Libras.",
    category: "Membros Inferiores",
    thumbnail: tornozeloThumbnail,
    video: tornozeloVideo,
    duration: "0:37",
    tags: ["tornozelo", "membros inferiores", "libras"],
  },
  {
    id: "pe",
    title: "Pé em Libras",
    description: "Aprenda o sinal de pé em Libras.",
    category: "Membros Inferiores",
    thumbnail: peThumbnail,
    video: peVideo,
    duration: "0:38",
    tags: ["pé", "membros inferiores", "libras"],
  },
  {
    id: "dedo_do_pe",
    title: "Dedo do pé em Libras",
    description: "Aprenda o sinal de dedo do pé em Libras.",
    category: "Membros Inferiores",
    thumbnail: dedoDoPeThumbnail,
    video: dedoDoPeVideo,
    duration: "0:03",
    tags: ["dedo do pé", "pé", "membros inferiores", "libras"],
  },
];
