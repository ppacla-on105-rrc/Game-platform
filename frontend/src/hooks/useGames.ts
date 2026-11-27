import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { gamesService } from "../services/gamesService";

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    gamesService.getAllGames()
      .then((loadedGames) => {
        if (active) setGames(loadedGames);
      })
      .catch((error: unknown) => {
        if (active) setError(errorMessage(error, "Unable to load games."));
      });

    return () => {
      active = false;
    };
  }, []);

  async function addGame(
    title: string,
    genre: string,
    description: string,
  ): Promise<boolean> {
    setError("");

    try {
      const game = await gamesService.createGame(title, genre, description);
      setGames((current) => [...current, game]);
      return true;
    } catch (error) {
      setError(errorMessage(error, "Unable to add the game."));
      return false;
    }
  }

  async function removeGame(id: number): Promise<void> {
    setError("");

    try {
      await gamesService.removeGame(id);
      setGames((current) => current.filter((game) => game.id !== id));
    } catch (error) {
      setError(errorMessage(error, "Unable to remove the game."));
    }
  }

  return { games, error, addGame, removeGame };
}