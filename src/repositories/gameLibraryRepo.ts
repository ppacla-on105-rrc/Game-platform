
import { libraryGames } from "../data/libraryGames";
import type { LibraryGame } from "../types/LibraryGame";

let games: LibraryGame[] = [...libraryGames];

export const gameLibraryRepo = {
  // READ: Get all games.
  getAll(): LibraryGame[] {
    return games.map((game) => ({ ...game }));
  },

  // READ: Find one game using its ID.
  getById(id: number): LibraryGame | undefined {
    const game = games.find((game) => game.id === id);
    return game ? { ...game } : undefined;
  },

  // CREATE: Add a new game.
  add(game: LibraryGame): void {
    games.push({ ...game });
  },

  // UPDATE: Replace an existing game.
  update(updatedGame: LibraryGame): void {
    games = games.map((game) =>
      game.id === updatedGame.id ? { ...updatedGame } : game
    );
  },

  // DELETE: Remove a game using its ID.
  delete(id: number): void {
    games = games.filter((game) => game.id !== id);
  },
};
