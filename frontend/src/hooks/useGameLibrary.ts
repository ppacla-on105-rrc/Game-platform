
import { useEffect, useState } from "react";
import { gameLibraryService } from "../services/gameLibraryService";
import type { LibraryGame } from "../types/LibraryGame";

// Convert unknown errors into readable messages.
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useGameLibrary() {
  const [games, setGames] = useState<LibraryGame[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved games when the page opens.
  useEffect(() => {
    let active = true;

    async function loadGames() {
      try {
        const savedGames = await gameLibraryService.getGames();

        if (active) {
          setGames(savedGames);
        }
      } catch (err) {
        if (active) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadGames();

    return () => {
      active = false;
    };
  }, []);

  // Add a new game and update the displayed list.
  async function addGame(
    title: string,
    genre: string,
    status: string
  ): Promise<string> {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const newGame = await gameLibraryService.addGame(
        title,
        genre,
        status
      );

      setGames((current) => [...current, newGame]);
      setMessage("Game added successfully.");

      return "Game added successfully.";
    } catch (err) {
      return getErrorMessage(err);
    } finally {
      setIsSaving(false);
    }
  }

  // Remove a game and update the displayed list.
  async function removeGame(id: number): Promise<void> {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      await gameLibraryService.removeGame(id);

      setGames((current) =>
        current.filter((game) => game.id !== id)
      );

      setMessage("Game removed successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  // Change a game's installation status.
  async function updateGameStatus(
    id: number,
    status: string
  ): Promise<void> {
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      await gameLibraryService.updateGameStatus(id, status);

      setGames((current) =>
        current.map((game) =>
          game.id === id ? { ...game, status } : game
        )
      );

      setMessage("Game status updated successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  }

  return {
    games,
    message,
    error,
    isLoading,
    isSaving,
    addGame,
    removeGame,
    updateGameStatus,
  };
}
