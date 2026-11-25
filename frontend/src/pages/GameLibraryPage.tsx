
import GameLibrary from "../components/game-library/GameLibrary";
import GameLibraryForm from "../components/game-library/GameLibraryForm";
import { useGameLibrary } from "../hooks/useGameLibrary";

/**
 * GameLibraryPage displays the user's collection of games.
 *
 * It uses the useGameLibrary hook to manage the game list
 * and handle actions such as adding and removing games.
 *
 * The hook calls the service for business rules, and the
 * service uses the repository to access the test data.
 *
 * This keeps business logic and data access out of the page.
 */
function GameLibraryPage() {
  const { message, addGame } = useGameLibrary();
  return (
    <main>
      <h1>Game Library</h1>

      {message && <p>{message}</p>}

      <GameLibraryForm
        onAddGame={addGame}
      />

      <GameLibrary/>
    </main>
  );
}

export default GameLibraryPage;
