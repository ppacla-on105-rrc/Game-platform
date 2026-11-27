import { z } from "zod";

// da rules for creating or fully updating a game
export const gameSchema = z.object({
  title: z.string().trim().min(1, "Game title is required."),
  genre: z.string().trim().min(1, "Genre is required."),
  description: z.string().trim().min(1, "Description is required."),
});

export type GameInput = z.infer<typeof gameSchema>;

export const gameIdSchema = z.object({
  id: z.string().regex(/^[1-9]\d*$/, "Game ID must be a positive integer."),
});