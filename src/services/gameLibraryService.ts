
import { gameLibraryRepo } from "../repositories/gameLibraryRepo";
import type { LibraryGame } from "../types/LibraryGame";

export const gameLibraryService = {
  // Get all library games.
  getGames(): LibraryGame[] {
    return gameLibraryRepo.getAll();
  },

  // Add a new game after checking the input.
  addGame(
    title: string,
    genre: string,
    status: string
  ): string {
    // Check that all fields are filled in.
    if (!title.trim() || !genre.trim() || !status.trim()) {
      return "Please fill in all fields.";
    }

    // Check whether the game is already in the library.
    const games = gameLibraryRepo.getAll();

    const duplicate = games.some(
      (game) =>
        game.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicate) {
      return "This game is already in your library.";
    }

    // Create an ID that is not already being used.
    const newId =
      Math.max(0, ...games.map((game) => game.id)) + 1;

    const newGame: LibraryGame = {
      id: newId,
      title: title.trim(),
      genre: genre.trim(),
      status: status.trim(),
    };

    gameLibraryRepo.add(newGame);

    return "Game added successfully.";
  },

  // Change the status of an existing game.
  updateGameStatus(id: number, status: string): string {
    const game = gameLibraryRepo.getById(id);

    if (!game) {
      return "Game not found.";
    }

    if (!status.trim()) {
      return "Please enter a status.";
    }

    gameLibraryRepo.update({
      ...game,
      status: status.trim(),
    });

    return "Game status updated successfully.";
  },

  // Remove a game from the library.
  removeGame(id: number): string {
    const game = gameLibraryRepo.getById(id);

    if (!game) {
      return "Game not found.";
    }

    gameLibraryRepo.delete(id);

    return "Game removed successfully.";
  },
};
