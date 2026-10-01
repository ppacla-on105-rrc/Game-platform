import { useState, type FormEvent } from "react";

interface Game {
  id: number;
  title: string;
  genre: string;
  description: string;
}

function Games() {
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Valorant",
      genre: "Tactical Shooter",
      description: "A team-based competitive shooting game.",
    },
    {
      id: 2,
      title: "League of Legends",
      genre: "MOBA",
      description: "A team-based strategy game with unique champions.",
    },
    {
      id: 3,
      title: "GTA 5",
      genre: "Action Adventure",
      description: "An open-world action game set in Los Santos.",
    },
    {
      id: 4,
      title: "Minecraft",
      genre: "Sandbox",
      description: "A building and survival game made of blocks.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !genre.trim() || !description.trim()) {
      setError("Please complete all fields.");
      return;
    }

    setError("");

    const newGame: Game = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      description: description.trim(),
    };

    setGames([...games, newGame]);

    setTitle("");
    setGenre("");
    setDescription("");
  }

  function handleRemove(id: number) {
    setGames(games.filter((game) => game.id !== id));
  }

  return (
    <section className="games">
      <h2>Available Games</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="game-title">Game title</label>
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
          <label htmlFor="game-description">Description</label>
          <textarea
            id="game-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Add Game</button>
      </form>

      <div className="games-list">
        {games.map((game) => (
          <article className="game-card" key={game.id}>
            <h3>{game.title}</h3>
            <p>Genre: {game.genre}</p>
            <p>{game.description}</p>
            <button type="button" onClick={() => handleRemove(game.id)}>
              Remove
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Games;