import { gamesData } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { Reveal } from "@/components/common/Reveal";

export function GamesSection() {
  return (
    <section className="flex flex-col gap-[80px]">
      {gamesData.map((game, index) => (
        <Reveal key={game.id} delay={index * 0.08}>
          <GameCard game={game} />
        </Reveal>
      ))}
    </section>
  );
}