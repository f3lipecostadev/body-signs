import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";

// Páginas carregadas sob demanda: o celular baixa só o código da tela aberta.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/corpo-em-libras",
    lazy: async () => ({
      Component: (await import("@/pages/BodySignsPage")).BodySignsPage,
    }),
  },
  {
    path: "/jogos",
    lazy: async () => ({
      Component: (await import("@/pages/GamesPage")).GamesPage,
    }),
  },
  {
    path: "/contato",
    lazy: async () => ({
      Component: (await import("@/pages/ContactPage")).ContactPage,
    }),
  },
  {
    path: "/jogos/memoria",
    lazy: async () => ({
      Component: (await import("@/pages/MemoryGamePage")).MemoryGamePage,
    }),
  },
  {
    path: "/jogos/quiz",
    lazy: async () => ({
      Component: (await import("@/pages/QuizGamePage")).QuizGamePage,
    }),
  },
  {
    path: "/jogos/cobrinha",
    lazy: async () => ({
      Component: (await import("@/pages/SnakeGamePage")).SnakeGamePage,
    }),
  },
  {
    path: "*",
    lazy: async () => ({
      Component: (await import("@/pages/NotFoundPage")).NotFoundPage,
    }),
  },
]);
