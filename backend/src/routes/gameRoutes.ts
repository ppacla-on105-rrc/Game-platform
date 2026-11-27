import { Router, type ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { validateGame, validateGameId } from "../middleware/validateGame.js";
import * as games from "../repositories/gameRepository.js";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(await games.getAllGames());
});

router.get("/:id", validateGameId, async (req, res) => {
  const game = await games.getGameById(Number(req.params.id));

  if (!game) {
    res.status(404).json({ message: "Game not found." });
    return;
  }

  res.json(game);
});

router.post("/", validateGame, async (req, res) => {
  const game = await games.createGame(req.body);
  res.status(201).json(game);
});

router.put("/:id", validateGameId, validateGame, async (req, res) => {
  const game = await games.updateGame(Number(req.params.id), req.body);
  res.json(game);
});

router.delete("/:id", validateGameId, async (req, res) => {
  await games.deleteGame(Number(req.params.id));
  res.status(204).end();
});

const handleGameError: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  ) {
    res.status(404).json({ message: "Game not found." });
    return;
  }

  console.error("Games API error:", error);
  res.status(500).json({ message: "Could not complete the Games request." });
};

router.use(handleGameError);

export default router;