interface LibraryGame {
  id: number;
  title: string;
  genre: string;
  status: string;
}

function GameLibrary() {
  const libraryGames: LibraryGame[] = [
    {
      id: 1,
      title: "Stardew Valley",
      genre: "Simulation",
      status: "Installed",
    },
    {
      id: 2,
      title: "Hades",
      genre: "Action",
      status: "Installed",
    },
    {
      id: 3,
      title: "Terraria",
      genre: "Adventure",
      status: "Not Installed",
    },
    {
      id: 4,
      title: "Hollow Knight",
      genre: "Metroidvania",
      status: "Installed",
    },
  ];

  return (
    <section className="game-library">
      <h2>My Game Library</h2>

      <div className="library-list">
        {libraryGames.map((game) => (
          <article className="library-game" key={game.id}>
            <h3>{game.title}</h3>
            <p>Genre: {game.genre}</p>
            <p>Status: {game.status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export default GameLibrary;