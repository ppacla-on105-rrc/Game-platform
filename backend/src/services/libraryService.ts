
import { prisma } from "../lib/prisma.js";
import type { LibraryGameInput } from "../validation/libraryValidation.js";

export const libraryService = {

  // Retrieve all games in the library
  async getGames() {
    const entries = await prisma.libraryEntry.findMany({
      include: {
        game: true,
      },
    });

    return entries.map((entry) => ({
      id: entry.id,
      title: entry.game.title,
      genre: entry.game.genre,
      status: entry.status,
    }));
  },

  // Add a game to the library
  async addGame(data: LibraryGameInput) {
    let game = await prisma.game.findFirst({
      where: {
        title: data.title.trim(),
      },
    });

    if (!game) {
      game = await prisma.game.create({
        data: {
          title: data.title.trim(),
          genre: data.genre.trim(),
          description: "Added from Game Library",
        },
      });
    }

    const existing = await prisma.libraryEntry.findUnique({
      where: {
        gameId: game.id,
      },
    });

    if (existing) {
      return null;
    }

    const entry = await prisma.libraryEntry.create({
      data: {
        gameId: game.id,
        status: data.status,
      },
    });

    return {
      id: entry.id,
      title: game.title,
      genre: game.genre,
      status: entry.status,
    };
  },

  // Update the installation status
  async updateGameStatus(id: number, status: string) {
    const existing = await prisma.libraryEntry.findUnique({
      where: { id },
    });

    if (!existing) {
      return null;
    }

    return prisma.libraryEntry.update({
      where: { id },
      data: { status },
    });
  },

  // Remove a game from the library
  async removeGame(id: number) {
    const existing = await prisma.libraryEntry.findUnique({
      where: { id },
    });

    if (!existing) {
      return false;
    }

    await prisma.libraryEntry.delete({
      where: { id },
    });

    return true;
  },
};
