<div align="center">

# Body Signs

**Aprenda os sinais de Libras das partes do corpo humano com vídeos, jogos interativos e uma interface acessível.**

[Demonstração](https://body-signs.vercel.app/) · [Guia de edição](GUIA-DE-EDICAO.md) · [Reportar um problema](https://github.com/f3lipecostadev/body-signs/issues)

![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

![Página inicial do Body Signs](docs/screenshot-home.jpg)

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Como executar](#como-executar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Equipe](#equipe)
- [Autor](#autor)

## Sobre o projeto

O **Body Signs** é uma plataforma web em português que ensina o vocabulário de **Libras** (Língua Brasileira de Sinais) relacionado ao corpo humano, de forma interativa e visual. O conteúdo combina um catálogo de vídeos com três jogos educativos, para que o aprendizado seja dinâmico e acessível.

O projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** do curso de Tecnologia em Sistemas para Internet do IFMA, por uma equipe multidisciplinar. A implementação da plataforma foi feita por um único desenvolvedor.

## Funcionalidades

| Página | Rota | O que oferece |
| --- | --- | --- |
| **Home** | `/` | Apresentação da plataforma, destaques (aprendizado visual, jogos e acesso prático) e chamada para explorar os vídeos. |
| **Corpo em Libras** | `/corpo-em-libras` | Catálogo de 25 vídeos com miniaturas, organizados em 4 categorias: Cabeça e Rosto, Tronco, Membros Superiores e Membros Inferiores. Busca por texto (ignora acentos e maiúsculas), filtro por categoria e reprodução em modal. |
| **Jogos** | `/jogos` | Hub com os três jogos abaixo. |
| **Contato** | `/contato` | Apresentação da equipe e formulário de contato (via Formspree). |

### Jogos

| Jogo | Rota | Como funciona |
| --- | --- | --- |
| **Memória** | `/jogos/memoria` | Oito pares por partida, sorteados entre 26 sinais cadastrados. Cada par liga a imagem do sinal ao seu nome. |
| **Quiz** | `/jogos/quiz` | Dez perguntas sorteadas de um banco de 50, em três formatos: imagem, verdadeiro ou falso e múltipla escolha. |
| **Cobrinha** | `/jogos/cobrinha` | Tabuleiro 20×20 com velocidade crescente (de 220 ms para até 70 ms por passo). Controle por teclado e por gestos de toque (_swipe_). |

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Interface | [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/) |
| Build e dev server | [Vite 8](https://vite.dev/) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/) (`@tailwindcss/vite`) |
| Rotas | [React Router 7](https://reactrouter.com/) |
| Animações | [Framer Motion](https://www.framer.com/motion/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Qualidade | ESLint, Prettier |
| Hospedagem | [Vercel](https://vercel.com/) |

## Arquitetura

O código é organizado **por funcionalidade** e separa o conteúdo da interface:

- **Um módulo por jogo.** A lógica de cada jogo fica isolada em `src/features/<jogo>` (`components/`, `hooks/` e `utils/`), enquanto a interface compartilhada entre eles vive em `src/components/games`.
- **Conteúdo desacoplado dos componentes.** Menu, vídeos, sinais e perguntas do quiz são listas tipadas em `src/data`. Para mudar textos, trocar imagens ou adicionar perguntas, não é preciso alterar componentes. O passo a passo está no [Guia de edição](GUIA-DE-EDICAO.md).
- **Páginas carregadas sob demanda.** Cada rota gera um _chunk_ próprio no build (_code splitting_), o que reduz o JavaScript inicial.
- **Acessibilidade.** Atributos ARIA nos componentes interativos e respeito à preferência `prefers-reduced-motion` nas animações de entrada.
- **Responsividade.** Layout adaptável a telas pequenas e controles por toque no jogo da cobrinha.
- **Imports com alias** `@/` para evitar caminhos relativos longos.

### Estrutura de pastas

```text
body-signs/
├── public/images/       # logo, imagens do site, equipe, sinais e capas dos jogos
├── src/
│   ├── app/             # ponto de entrada, providers e rotas
│   ├── assets/          # vídeos em Libras e miniaturas
│   ├── components/      # layout, home, contact, body-signs, games e common
│   ├── data/            # menu, vídeos, sinais e perguntas do quiz
│   ├── features/        # memory-game, quiz-game e snake-game
│   ├── lib/             # utilitários (ex.: normalização de texto)
│   ├── pages/           # uma página por rota
│   ├── styles/          # tema e estilos globais
│   └── types/           # tipos compartilhados
├── docs/                # imagens usadas neste README
└── GUIA-DE-EDICAO.md    # como alterar conteúdo sem mexer na lógica
```

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) `20.19+` ou `22.12+` (exigência do Vite 8)
- npm (já vem com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/f3lipecostadev/body-signs.git
cd body-signs

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`. Não há variáveis de ambiente obrigatórias.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com recarga automática. |
| `npm run build` | Verifica os tipos (`tsc -b`) e gera o build de produção em `dist/`. |
| `npm run preview` | Serve localmente o build gerado, para conferência antes do deploy. |

## Equipe

| Nome | Papel |
| --- | --- |
| Daiane Algarves | Coordenação |
| **Felipe Costa** | Desenvolvimento da plataforma |
| Kaio Javã | Design e experiência visual |
| Alexandre Martins | Apoio à equipe |
| Sthefania de Carla | Apoio ao projeto |
| João Manoel | Colaboração geral |

## Autor

**Felipe Kauã de Sousa Costa** — Desenvolvedor de Software

[![GitHub](https://img.shields.io/badge/GitHub-f3lipecostadev-181717?style=flat-square&logo=github)](https://github.com/f3lipecostadev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-f3lipecosta-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/f3lipecosta/)
