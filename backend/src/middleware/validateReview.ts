import type { Request, Response, NextFunction } from "express";
import type { ReviewDraft } from "../services/reviewService.js";
import { reviewService } from "../services/reviewService.js"; 

export const validateReview = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const draft = req.body as ReviewDraft;

    if (
        !draft ||
        typeof draft.game !== "string" ||
        typeof draft.username !== "string" ||
        typeof draft.comment !== "string" ||
        typeof draft.rating !== "number"
    ) {
        return res.status(400).json({
            message: "Invalid review data."
        });
    }

    const error = reviewService.validateReview(draft);
    
    if (error) {
        return res.status(400).json({
            message: error
        });
    }

    next();
};