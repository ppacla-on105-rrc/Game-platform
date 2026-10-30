
import { useState, useSyncExternalStore } from "react";
import { gameLibraryService } from "../services/gameLibraryService";
import type { LibraryGame } from "../types/LibraryGame";

// This hook manages the Game Library's presentation state.
// Business rules belong in the service, not in this hook.
//
// Returns:
// games - the current list of library games
// message - feedback shown to the user
// addGame - adds a game through the service
// removeGame - removes a game through the service
// updateGameStatus - updates a game's status through the service

let currentGames = gameLibraryService.getGames();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): LibraryGame[] {
  return currentGames;
}

function refreshGames() {
  currentGames = gameLibraryService.getGames();
  listeners.forEach((listener) => listener());
}

export function useGameLibrary() {
  const games = useSyncExternalStore(subscribe, getSnapshot);
  const [message, setMessage] = useState("");

  function addGame(title: string, genre: string, status: string) {
    const result = gameLibraryService.addGame(title, genre, status);
    setMessage(result);
    if (result === "Game added successfully.") {
      refreshGames();
    }
    return result;
  }

  function removeGame(id: number) {
    const result = gameLibraryService.removeGame(id);
    setMessage(result);
    if (result === "Game removed successfully.") {
      refreshGames();
    }
    return result;
  }

  function updateGameStatus(id: number, status: string) {
    const result = gameLibraryService.updateGameStatus(id, status);
    setMessage(result);
    if (result === "Game status updated successfully.") {
      refreshGames();
    }
    return result;
  }

  return {
    games,
    message,
    addGame,
    removeGame,
    updateGameStatus,
  };
}
