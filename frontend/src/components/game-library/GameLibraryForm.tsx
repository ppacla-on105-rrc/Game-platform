
import { useState } from "react";
import type { FormEvent } from "react";

interface GameLibraryFormProps {
  onAddGame: (
    title: string,
    genre: string,
    status: string
  ) => Promise<string>;
  isSaving: boolean;
}

/**
 * Form for adding games to the library.
 * Shows validation errors and a live game title preview.
 */
function GameLibraryForm({
  onAddGame,
  isSaving,
}: GameLibraryFormProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Not Installed");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const result = await onAddGame(title, genre, status);

    if (result !== "Game added successfully.") {
      setError(result);
      return;
    }

    // Clear fields after successful submission.
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
            disabled={isSaving}
          />
        </div>

        <div>
          <label htmlFor="game-genre">Genre</label>
          <input
            id="game-genre"
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            disabled={isSaving}
          />
        </div>

        <div>
          <label htmlFor="game-status">Status</label>
          <select
            id="game-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            disabled={isSaving}
          >
            <option value="Installed">Installed</option>
            <option value="Not Installed">Not Installed</option>
          </select>
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Adding..." : "Add Game"}
        </button>
      </form>

      <p>
        Game Preview:{" "}
        {title === "" ? "Enter a game title" : title}
      </p>
    </section>
  );
}

export default GameLibraryForm;
