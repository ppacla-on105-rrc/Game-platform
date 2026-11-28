
import type { Request, Response } from "express";
import { libraryService } from "../services/libraryService.js";
import type { LibraryGameInput } from "../validation/libraryValidation.js";

// GET - Retrieve library games
export async function getLibrary(
  _req: Request,
  res: Response
) {
  try {
    const games = await libraryService.getGames();
    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve games",
    });
  }
}

// POST - Add a game
export async function addLibraryGame(
  req: Request,
  res: Response
) {
  try {
    const data = req.body as LibraryGameInput;

    const game = await libraryService.addGame(data);

    if (!game) {
      res.status(409).json({
        message: "Game already exists in the library",
      });
      return;
    }

    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add game",
    });
  }
}

// PATCH - Update game status
export async function updateLibraryGame(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const game = await libraryService.updateGameStatus(
      id,
      status
    );

    if (!game) {
      res.status(404).json({
        message: "Game not found",
      });
      return;
    }

    res.status(200).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update game",
    });
  }
}

// DELETE - Remove a game
export async function deleteLibraryGame(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const removed = await libraryService.removeGame(id);

    if (!removed) {
      res.status(404).json({
        message: "Game not found",
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to remove game",
    });
  }
}
