
import GameLibrary from "../components/game-library/GameLibrary";
import GameLibraryForm from "../components/game-library/GameLibraryForm";
import { useGameLibrary } from "../hooks/useGameLibrary";

/**
 * Displays the Game Library page.
 * Uses one hook to manage the form and the game list.
 */
function GameLibraryPage() {
  const {
    games,
    message,
    error,
    isLoading,
    isSaving,
    addGame,
    removeGame,
    updateGameStatus,
  } = useGameLibrary();

  return (
    <main>
      <h1>Game Library</h1>

      {message && <p role="status">{message}</p>}

      {error && <p role="alert">{error}</p>}

      <GameLibraryForm
        onAddGame={addGame}
        isSaving={isSaving}
      />

      <GameLibrary
        games={games}
        isLoading={isLoading}
        isSaving={isSaving}
        onRemoveGame={removeGame}
        onUpdateStatus={updateGameStatus}
      />
    </main>
  );
}

export default GameLibraryPage;
