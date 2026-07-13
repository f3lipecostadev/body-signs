import { Link } from "react-router-dom";
import type { GameItem } from "@/types/game";

interface GameCardProps {
  game: GameItem;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-14">
      <div className="w-full overflow-hidden rounded-[24px] bg-[#eef0ff] shadow-[0_10px_28px_rgba(0,0,0,0.10)] md:w-[560px]">
        <img
          src={game.image}
          alt={game.title}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="max-w-[620px]">
        <h2 className="mb-3 text-[clamp(1.5rem,3vw,2.125rem)] font-bold text-[#111111] md:mb-[16px]">
          {game.title}
        </h2>

        <p className="mb-5 text-[clamp(1rem,1.8vw,1.3125rem)] leading-[1.55] text-[#777777] md:mb-7">
          {game.description}
        </p>

        <Link
          to={game.href}
          className="inline-flex items-center gap-3 rounded-[24px] bg-[#DDEF46] px-6 py-3 text-base font-semibold text-[#111111] shadow-[0_6px_14px_rgba(0,0,0,0.15)] transition duration-200 hover:scale-[1.05] md:px-[28px] md:py-[14px] md:text-[18px]"
        >
          <span>Jogar</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}