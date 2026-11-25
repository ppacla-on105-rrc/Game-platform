import type { Game } from "../types/Game";
import { gamesRepository } from "../repositories/gamesRepository";

export const gamesService = {
  getAllGames(): Game[] {
    return gamesRepository.getAll();
  },

  createGame(title: string, genre: string, description: string): Game {
    const cleanTitle = title.trim();
    const cleanGenre = genre.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanGenre || !cleanDescription) {
      throw new Error("Please complete all fields.");
    }

    const games = gamesRepository.getAll();
    const nextId =
      games.length === 0
        ? 1
        : Math.max(...games.map((game) => game.id)) + 1;

    const newGame: Game = {
      id: nextId,
      title: cleanTitle,
      genre: cleanGenre,
      description: cleanDescription,
    };

    return gamesRepository.create(newGame);
  },

  removeGame(id: number): boolean {
    return gamesRepository.delete(id);
  },
};