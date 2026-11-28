
import { gameLibraryRepo } from "../repositories/gameLibraryRepo";
import type { LibraryGame } from "../types/LibraryGame";

export const gameLibraryService = {
  // Retrieve all saved library games.
  async getGames(): Promise<LibraryGame[]> {
    return gameLibraryRepo.getAll();
  },

  // Validate and add a new game.
  async addGame(
    title: string,
    genre: string,
    status: string
  ): Promise<LibraryGame> {
    if (!title.trim() || !genre.trim() || !status.trim()) {
      throw new Error("Please fill in all fields.");
    }

    if (
      status !== "Installed" &&
      status !== "Not Installed"
    ) {
      throw new Error("Please select a valid status.");
    }

    // Prevent duplicate games in the library.
    const games = await gameLibraryRepo.getAll();

    const duplicate = games.some(
      (game) =>
        game.title.toLowerCase() ===
        title.trim().toLowerCase()
    );

    if (duplicate) {
      throw new Error("This game is already in your library.");
    }

    return gameLibraryRepo.add({
      title: title.trim(),
      genre: genre.trim(),
      status,
    });
  },

  // Update a game's installation status.
  async updateGameStatus(
    id: number,
    status: string
  ): Promise<void> {
    if (
      status !== "Installed" &&
      status !== "Not Installed"
    ) {
      throw new Error("Please select a valid status.");
    }

    await gameLibraryRepo.updateStatus(id, status);
  },

  // Remove an entry from the library.
  async removeGame(id: number): Promise<void> {
    await gameLibraryRepo.delete(id);
  },
};
