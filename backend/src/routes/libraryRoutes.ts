
import { Router } from "express";

import {
  getLibrary,
  addLibraryGame,
  updateLibraryGame,
  deleteLibraryGame,
} from "../controllers/libraryController.js";

import {
  validateLibraryGame,
  validateLibraryStatus,
} from "../validation/libraryValidation.js";

import {
  validateRequest,
  validateId,
} from "../validate/validateRequest.js";

const router = Router();

// Retrieve all library games
router.get("/", getLibrary);

// Add a new game
router.post(
  "/",
  validateRequest(validateLibraryGame),
  addLibraryGame
);

// Update game installation status
router.patch(
  "/:id",
  validateId,
  validateRequest(validateLibraryStatus),
  updateLibraryGame
);

// Remove a game
router.delete(
  "/:id",
  validateId,
  deleteLibraryGame
);

export default router;
