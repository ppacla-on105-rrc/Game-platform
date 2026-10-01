import { useState } from "react";
import type { LibraryGame } from "../../types/LibraryGame";

interface GameLibraryFormProps {
  games: LibraryGame[];
  setGames: (games: LibraryGame[]) => void;
}

function GameLibraryForm({
  games,
  setGames,
}: GameLibraryFormProps) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Not Installed");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (title.trim() === "" || genre.trim() === "") {
      setError("Please enter a game title and genre.");
      return;
    }

    const newGame: LibraryGame = {
      id: Date.now(),
      title: title,
      genre: genre,
      status: status,
    };

    setGames([...games, newGame]);

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

        {error && <p>{error}</p>}

        <button type="submit">Add Game</button>
      </form>

      <p>
        Game Preview: {title === "" ? "Enter a game title" : title}
      </p>
    </section>
  );
}

export default GameLibraryForm;