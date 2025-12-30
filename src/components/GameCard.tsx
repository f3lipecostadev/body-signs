
import { Game } from "../types"

interface GameCardProps {
  game: Game
  onPlayClick: () => void
}

export default function GameCard({ game, onPlayClick }: GameCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border-3 border-transparent transition-all hover:shadow-xl hover:-translate-y-2.5 hover:border-[var(--secondary-color)]">
      
      <div className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] text-white text-center p-6">
        <div className="text-4xl mb-4">{game.icon}</div>
        <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
        <p className="opacity-90">{game.subtitle}</p>
      </div>

      <div className="p-7 flex flex-col gap-6">
        <p className="text-[var(--text-color)] text-lg">{game.description}</p>
        <ul className="list-none mb-6">
          {game.features.map((feature, index) => (
            <li key={index} className="relative pl-8 py-1 before:content-['✓'] before:absolute before:left-0 before:text-[var(--success-color)] before:font-bold">
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onPlayClick}
          data-game={game.type}
          className="w-full py-4 bg-[var(--secondary-color)] text-[var(--primary-color)] font-bold rounded-lg text-lg transition-all hover:bg-yellow-500 hover:scale-105"
        >
          Jogar Agora
        </button>
      </div>
    </div>
  )
}
