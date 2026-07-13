# Guia de Edição — Body Signs

Este guia explica, em ordem prática, onde mexer para mudar qualquer coisa
no site. Você não precisa entender todo o código — a maioria das mudanças
do dia a dia (textos, imagens, perguntas, cores) é feita em arquivos
simples dentro de `src/data/`.

---

## 1. Mapa de pastas (o que é o quê)

```
body-signs/
├── public/images/          ← TODAS as imagens do site, organizadas por assunto
│   ├── site/                 logo, imagem de fundo do header, imagem do hero
│   ├── team/                 fotos da equipe (página de Contato)
│   ├── sinais/                fotos dos sinais em Libras (Jogo da Memória)
│   ├── games/                 ícones/capas dos 3 jogos + verso da carta da memória
│   └── videos/                imagem usada quando um vídeo ainda não tem thumbnail
│
├── src/data/                ← TEXTOS e LISTAS do site (edite aqui na maioria das vezes)
│   ├── navigation.ts          itens do menu (Home, Jogos, Contato...)
│   ├── homeFeatures.ts        os 3 cards "Aprendizado Visual / Jogos / Acesso Prático" da Home
│   ├── bodySigns.ts           lista de sinais usados no Jogo da Memória
│   ├── games.ts               os 3 cards da página "Jogos" (título, descrição, capa, link)
│   ├── quizQuestions.ts       todas as perguntas do Quiz
│   └── videos.ts              lista de vídeos da página "Corpo em Libras"
│
├── src/pages/                ← uma página por rota (Home, Jogos, Contato, cada jogo...)
├── src/components/           ← peças visuais reutilizáveis, organizadas por assunto
│   ├── layout/                 Header, Navbar, Footer, menu mobile
│   ├── home/                   seções da página inicial (Hero, Sobre, CTA...)
│   ├── contact/                equipe e hero da página de contato
│   ├── body-signs/              busca e grade de vídeos
│   ├── games/                  peças comuns aos jogos (card da lista, moldura "tela cheia")
│   └── common/                  logo, container, animações de entrada
│
├── src/features/             ← a LÓGICA de cada jogo, cada um na sua pasta
│   ├── memory-game/
│   ├── quiz-game/
│   └── snake-game/
│
├── src/styles/
│   ├── theme.css               cores globais do site (mude aqui para trocar a paleta toda)
│   └── globals.css             reset básico (raramente precisa mexer)
│
└── src/types/                ← formatos dos dados (TypeScript). Só mexa se adicionar um
                                 campo novo em algum item de src/data/.
```

Regra prática: **90% das edições do dia a dia acontecem dentro de `src/data/`
e `public/images/`.** Só entre em `src/components` ou `src/features` quando
quiser mudar como algo se comporta ou aparece visualmente, não apenas o
conteúdo.

---

## 2. Trocar imagens

Todas as imagens ficam em `public/images/`, já organizadas por assunto.
Para trocar uma imagem, basta **substituir o arquivo pelo novo, mantendo
exatamente o mesmo nome**. Nenhum código precisa ser alterado nesse caso.

| Quero trocar...                         | Arquivo a substituir                          |
|------------------------------------------|------------------------------------------------|
| Logo do site                              | `public/images/site/logo.png`                  |
| Imagem de fundo do topo (header)          | `public/images/site/background.png`            |
| Imagem principal da Home (hero)           | `public/images/site/hero-img.png`               |
| Foto de um integrante da equipe           | `public/images/team/<nome>.jpeg`                |
| Foto de um sinal em Libras (jogo memória) | `public/images/sinais/<nome-do-sinal>.png`      |
| Capa de um dos 3 jogos                    | `public/images/games/quiz.svg` / `memoria.svg` / `cobrinha.svg` |
| Verso da carta do jogo da memória         | `public/images/games/memory-card-back.png`      |

**Adicionando um sinal novo no Jogo da Memória** (ex: "Cabelo"):
1. Coloque uma imagem quadrada (fundo neutro, ex: 500x500px) em
   `public/images/sinais/cabelo.png`.
2. Abra `src/data/bodySigns.ts` e adicione uma linha nova, seguindo o
   mesmo padrão das outras:
   ```ts
   { id: "cabelo", name: "Cabelo", image: "/images/sinais/cabelo.png", category: "cabeça" },
   ```
   A cada partida o jogo já sorteia 8 sinais aleatórios da lista inteira —
   não precisa mexer em mais nada.

---

## 3. Trocar textos

| Quero trocar...                              | Arquivo                        |
|------------------------------------------------|---------------------------------|
| Itens do menu (Home, Jogos, Contato...)         | `src/data/navigation.ts`       |
| Os 3 cards de destaque da Home                   | `src/data/homeFeatures.ts`     |
| Título/descrição dos 3 jogos na página "Jogos"   | `src/data/games.ts`            |
| Perguntas e alternativas do Quiz                 | `src/data/quizQuestions.ts`    |
| Lista de vídeos (título, categoria, link)         | `src/data/videos.ts`           |
| Nome/cargo/descrição da equipe                    | `src/components/contact/TeamSection.tsx` (topo do arquivo, array `teamMembers`) |
| Textos fixos do topo da Home (título, frase)      | `src/components/home/HomeHero.tsx` |
| Textos do rodapé                                  | `src/components/layout/Footer.tsx` |

Cada item nesses arquivos é um objeto simples, por exemplo:
```ts
{
  id: "q1",
  question: "Esse sinal representa:",
  options: [
    { id: "a", text: "Testa", isCorrect: false },
    { id: "b", text: "Cabeça", isCorrect: true },
    ...
  ],
}
```
Basta editar o texto entre aspas. Para adicionar uma pergunta nova no
Quiz, copie um bloco inteiro `{ ... }` de dentro de `quizQuestionsData`,
cole depois do último e mude os valores.

---

## 4. Vídeos da página "Corpo em Libras"

Em `src/data/videos.ts`, cada vídeo tem um campo `youtubeUrl`. Hoje eles
apontam para links de exemplo (`SEU_VIDEO_CABECA` etc.) — troque pelo link
real do YouTube quando tiver o vídeo gravado, por exemplo:
```ts
youtubeUrl: "https://www.youtube.com/watch?v=abcd1234",
```
A miniatura (thumbnail) é gerada automaticamente a partir do link do
YouTube. Enquanto não houver um vídeo real, aparece uma imagem de
"Vídeo em breve" no lugar (`public/images/videos/placeholder.svg`).

---

## 5. Cores e aparência geral

Todas as cores principais do site ficam centralizadas em
`src/styles/theme.css`:
```css
--brand: #3c32af;      /* roxo principal (header, botões) */
--highlight: #ddef46;   /* amarelo-esverdeado de destaque (botão "Jogar" etc.) */
--app-bg: #f1f1f1;      /* fundo geral do site */
```
Trocar o valor de uma dessas variáveis muda a cor em todos os lugares que
a usam, de uma vez só.

---

## 6. Os jogos (tela cheia e responsivos)

Os 3 jogos (`/jogos/quiz`, `/jogos/memoria`, `/jogos/cobrinha`) agora
usam uma moldura de **tela cheia** (`GameShell` e `GameSidebarShell`, em
`src/components/games/`) que ocupa exatamente a altura da janela do
computador, sem precisar rolar a página. Se o conteúdo interno de um jogo
ficar maior que a tela em telas muito pequenas, apenas aquele quadro
específico ganha uma rolagem interna — a página em si nunca "desce".

- `GameShell`: usado pelo Quiz (um card central).
- `GameSidebarShell`: usado pela Memória e pela Cobrinha (barra lateral
  com pontuação + tabuleiro do jogo ao lado).

Se quiser ajustar o tamanho das cartas do jogo da memória, edite
`src/features/memory-game/components/MemoryBoard.tsx` (largura máxima do
tabuleiro) ou `MemoryCard.tsx` (proporção/tamanho de cada carta
individual).

Para o tabuleiro da Cobrinha, o tamanho responsivo está em
`src/features/snake-game/constants.ts`, na constante `BOARD_SIZE_CSS`.

---

## 7. Equipe / página de Contato

Arquivo: `src/components/contact/TeamSection.tsx`. No topo do arquivo há
uma lista `teamMembers`; cada pessoa é um objeto com `name`, `role`,
`description` e `image`. Para adicionar alguém novo, copie um bloco,
cole no final da lista e ajuste os dados (e adicione a foto em
`public/images/team/`).

---

## 8. Resumo — "eu quero mudar X, onde eu vou?"

- **Um texto qualquer da tela** → arquivo em `src/data/` ou, se não achar
  lá, procure o texto dentro de `src/components/` (Ctrl+F pelo texto).
- **Uma imagem** → `public/images/`, substitua o arquivo mantendo o nome.
- **Uma cor** → `src/styles/theme.css`.
- **Uma pergunta do quiz** → `src/data/quizQuestions.ts`.
- **Um sinal do jogo da memória** → `src/data/bodySigns.ts` + imagem em
  `public/images/sinais/`.
- **Um vídeo** → `src/data/videos.ts`.
- **Alguém da equipe** → `src/components/contact/TeamSection.tsx`.
