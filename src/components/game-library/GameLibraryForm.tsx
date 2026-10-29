
import { useState } from "react";

interface GameLibraryFormProps {
  onAddGame: (
    title: string,
    genre: string,
    status: string
  ) => string;
}

/**
 * GameLibraryForm collects information for a new game.
 *
 * The component manages the input fields and displays errors.
 * It calls onAddGame, which uses the custom hook and service
 * to validate and add games through the repository.
 *
 * This keeps business logic and data access out of the form.
 */
function GameLibraryForm({ onAddGame }: GameLibraryFormProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Not Installed");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The service checks the required fields and duplicate games.
    const result = onAddGame(title, genre, status);

    if (result !== "Game added successfully.") {
      setError(result);
      return;
    }

    // Clear the form after a successful addition.
    setTitle("");
    setGenre("");
    setStatus("Not Installed");
    setError("");
  }

  return (
    <section className="library-form">
      <h2>Add a Game</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="game-title">Game Title</label>
          <input
            id="game-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="game-genre">Genre</label>
          <input
            id="game-genre"
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="game-status">Status</label>
          <select
            id="game-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Installed">Installed</option>
            <option value="Not Installed">Not Installed</option>
          </select>
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Add Game</button>
      </form>

      <p>
        Game Preview: {title === "" ? "Enter a game title" : title}
      </p>
    </section>
  );
}

export default GameLibraryForm;
