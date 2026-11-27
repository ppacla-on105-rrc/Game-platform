import type { Request, Response, NextFunction } from "express";
import { gameSchema, gameIdSchema } from "../schemas/gameSchema.js";

export function validateGame(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = gameSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid game data.",
      errors: result.error.issues,
    });
    return;
  }

  req.body = result.data;
  next();
}

export function validateGameId(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = gameIdSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid game ID.",
      errors: result.error.issues,
    });
    return;
  }

  next();
}