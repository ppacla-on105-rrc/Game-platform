
import { useGameLibrary } from "../../hooks/useGameLibrary";

/**
 * GameLibrary displays all games in the user's library.
 *
 * It uses the useGameLibrary custom hook to get the game list
 * and remove games.
 *
 * The hook communicates with the service, which uses the
 * repository to access and update the test data.
 *
 * This keeps data access and business logic out of
 * the component.
 */
function GameLibrary() {
  const { games, removeGame } = useGameLibrary();

  return (
    <section className="game-library">
      <h2>My Game Library</h2>

      <div className="library-list">
        {games.length === 0 ? (
          <p>No games in your library yet.</p>
        ) : (
          games.map((game) => (
            <article className="library-game" key={game.id}>
              <h3>{game.title}</h3>

              <p>Genre: {game.genre}</p>

              <p>Status: {game.status}</p>

              <button
                type="button"
                onClick={() => removeGame(game.id)}
              >
                Remove
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default GameLibrary;
