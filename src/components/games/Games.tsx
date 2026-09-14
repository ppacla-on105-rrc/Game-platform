interface Game {
  id: number;
  title: string;
  genre: string;
  description: string;
}

function Games() {
  const games: Game[] = [
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
  ];

  return (
    <section className="games">
      <h2>Available Games</h2>

      <div className="games-list">
        {games.map((game) => (
          <article className="game-card" key={game.id}>
            <h3>{game.title}</h3>
            <p>Genre: {game.genre}</p>
            <p>{game.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Games;