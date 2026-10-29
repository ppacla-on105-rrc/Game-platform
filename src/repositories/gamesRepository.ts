import type { Game } from "../types/Game";
import { initialGames } from "../data/games";

let games: Game[] = [...initialGames];

export const gamesRepository = {
  getAll(): Game[] {
    return [...games];
  },

  getById(id: number): Game | undefined {
    return games.find((game) => game.id === id);
  },

  create(game: Game): Game {
    games = [...games, game];
    return game;
  },

  update(id: number, updatedGame: Game): Game | undefined {
    const index = games.findIndex((game) => game.id === id);

    if (index === -1) {
      return undefined;
    }

    games[index] = {
      ...updatedGame,
      id,
    };

    return games[index];
  },

  delete(id: number): boolean {
    const originalLength = games.length;

    games = games.filter((game) => game.id !== id);

    return games.length < originalLength;
  },
};