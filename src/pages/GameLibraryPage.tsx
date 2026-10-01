import { useState } from "react";
import GameLibrary from "../components/game-library/GameLibrary";
import GameLibraryForm from "../components/game-library/GameLibraryForm";
import type { LibraryGame } from "../types/LibraryGame";

function GameLibraryPage() {
  const [games, setGames] = useState<LibraryGame[]>([
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
  ]);

  function removeGame(id: number) {
    const updatedGames = games.filter(
      (game) => game.id !== id
    );

    setGames(updatedGames);
  }

  return (
    <main>
      <h1>Game Library</h1>

      <GameLibraryForm
        games={games}
        setGames={setGames}
      />

      <GameLibrary
        games={games}
        onRemove={removeGame}
      />
    </main>
  );
}

export default GameLibraryPage;