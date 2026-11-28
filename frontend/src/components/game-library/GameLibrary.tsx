
import type { LibraryGame } from "../../types/LibraryGame";

interface GameLibraryProps {
  games: LibraryGame[];
  isLoading: boolean;
  isSaving: boolean;
  onRemoveGame: (id: number) => Promise<void>;
  onUpdateStatus: (
    id: number,
    status: string
  ) => Promise<void>;
}

/**
 * Displays saved games from the backend.
 * Allows users to update their status or remove entries.
 */
function GameLibrary({
  games,
  isLoading,
  isSaving,
  onRemoveGame,
  onUpdateStatus,
}: GameLibraryProps) {
  return (
    <section className="game-library">
      <h2>My Game Library</h2>

      {isLoading ? (
        <p>Loading your games...</p>
      ) : (
        <div className="library-list">
          {games.length === 0 ? (
            <p>No games in your library yet.</p>
          ) : (
            games.map((game) => (
              <article
                className="library-game"
                key={game.id}
              >
                <h3>{game.title}</h3>

                <p>Genre: {game.genre}</p>

                <div>
                  <label htmlFor={`status-${game.id}`}>
                    Status:{" "}
                  </label>

                  <select
                    id={`status-${game.id}`}
                    value={game.status}
                    disabled={isSaving}
                    onChange={(event) => {
                      void onUpdateStatus(
                        game.id,
                        event.target.value
                      );
                    }}
                  >
                    <option value="Installed">
                      Installed
                    </option>
                    <option value="Not Installed">
                      Not Installed
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    void onRemoveGame(game.id);
                  }}
                >
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default GameLibrary;
