import { Link } from "react-router-dom";
import type { GameItem } from "@/types/game";

interface GameCardProps {
  game: GameItem;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-14">
      <img
        src={game.image}
        alt={game.title}
        className="w-full rounded-[20px] shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:w-[460px]"
      />

      <div className="max-w-[620px]">
        <h2 className="mb-[16px] text-[34px] font-bold text-[#111111]">
          {game.title}
        </h2>

        <p className="mb-7 text-[21px] leading-[1.55] text-[#777777]">
          {game.description}
        </p>

        <Link
          to={game.href}
          className="inline-flex items-center gap-3 rounded-[24px] bg-[#DDEF46] px-[28px] py-[14px] text-[18px] font-semibold text-[#111111] shadow-[0_6px_14px_rgba(0,0,0,0.15)] transition duration-200 hover:scale-[1.05]"
        >
          <span>Jogar</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}