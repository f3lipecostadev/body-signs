import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { BodySignsPage } from "@/pages/BodySignsPage";
import { GamesPage } from "@/pages/GamesPage";
import { ContactPage } from "@/pages/ContactPage";
import { MemoryGamePage } from "@/pages/MemoryGamePage";
import { QuizGamePage } from "@/pages/QuizGamePage";
import { SnakeGamePage } from "@/pages/SnakeGamePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/corpo-em-libras",
    element: <BodySignsPage />,
  },
  {
    path: "/jogos",
    element: <GamesPage />,
  },
  {
    path: "/contato",
    element: <ContactPage />,
  },
  {
    path: "/jogos/memoria",
    element: <MemoryGamePage />,
  },
  {
    path: "/jogos/quiz",
    element: <QuizGamePage />,
  },
  {
    path: "/jogos/cobrinha",
    element: <SnakeGamePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);