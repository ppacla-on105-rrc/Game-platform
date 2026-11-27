import { prisma } from "../lib/prisma.js";
import type { GameInput } from "../schemas/gameSchema.js";

export function getAllGames() {
  return prisma.game.findMany({ orderBy: { id: "asc" } });
}

export function getGameById(id: number) {
  return prisma.game.findUnique({ where: { id } });
}

export function createGame(data: GameInput) {
  return prisma.game.create({ data });
}

export function updateGame(id: number, data: GameInput) {
  return prisma.game.update({ where: { id }, data });
}

export function deleteGame(id: number) {
  return prisma.game.delete({ where: { id } });
}