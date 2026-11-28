
import type { RequestHandler } from "express";
import { validateLibraryId } from "../validation/libraryValidation.js";


export function validateRequest(
  validator: (data: unknown) => boolean
): RequestHandler {
  return (req, res, next) => {
    if (!validator(req.body)) {
      res.status(400).json({
        message: "Invalid request data",
      });
      return;
    }

    next();
  };
}


export const validateId: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  if (typeof id !== "string" || !validateLibraryId(id)) {
    res.status(400).json({
      message: "Invalid library entry ID",
    });
    return;
  }

  next();
};
