import type { LibraryGame as LibraryGameType } from "../../types/LibraryGame";

interface GameLibraryProps {
  games: LibraryGameType[];
  onRemove: (id: number) => void;
}

function GameLibrary({
  games,
  onRemove,
}: GameLibraryProps) {
  return (
    <section className="game-library">
      <h2>My Game Library</h2>

      <div className="library-list">
        {games.map((game) => (
          <article className="library-game" key={game.id}>
            <h3>{game.title}</h3>

            <p>Genre: {game.genre}</p>

            <p>Status: {game.status}</p>

            <button
              type="button"
              onClick={() => onRemove(game.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GameLibrary;