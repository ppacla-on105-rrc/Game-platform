import { useState } from "react";
import type { Game } from "../types/Game";
import { gamesService } from "../services/gamesService";

/**
 * Provides presentation state and actions for displaying and modifying games
 *
 * Returned values:
 * games: Current games now displayed by the component
 * error: Validation or operation message displayed to the user
 * addGame: Adds a validated game and refreshes the displayed list
 * removeGame: Removes a game and refreshes the displayed list
 */
export function useGames() {
  const [games, setGames] = useState<Game[]>(() =>
    gamesService.getAllGames(),
  );
  const [error, setError] = useState("");

  function refreshGames() {
    setGames(gamesService.getAllGames());
  }

  function addGame(
    title: string,
    genre: string,
    description: string,
  ): boolean {
    try {
      gamesService.createGame(title, genre, description);
      refreshGames();
      setError("");
      return true;
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to add the game.",
      );
      return false;
    }
  }

  function removeGame(id: number) {
    gamesService.removeGame(id);
    refreshGames();
  }

  return {
    games,
    error,
    addGame,
    removeGame,
  };
}