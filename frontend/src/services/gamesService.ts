import type { Game } from "../types/Game";
import { gamesRepository } from "../repositories/gamesRepository";

export const gamesService = {
  getAllGames(): Promise<Game[]> {
    return gamesRepository.getAll();
  },

  async createGame(
    title: string,
    genre: string,
    description: string,
  ): Promise<Game> {
    const game = {
      title: title.trim(),
      genre: genre.trim(),
      description: description.trim(),
    };

    if (!game.title || !game.genre || !game.description) {
      throw new Error("Please complete all fields.");
    }

    return gamesRepository.create(game);
  },

  removeGame(id: number): Promise<void> {
    return gamesRepository.delete(id);
  },
};