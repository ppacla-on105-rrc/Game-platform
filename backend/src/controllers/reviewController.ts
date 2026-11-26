import type { Request, Response } from "express";
import { reviewService } from "../services/reviewService.js";

// GET /api/reviews.
export const getReviews = async (_req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getReviews();
        return res.json(reviews);
    } catch {
        return res.status(500).json({
            message: "Failed to retrieve reviews."
        });
    }
};

// GET /api/reviews/:id.
export const getReview = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid review ID."
            });
        }

        const review = await reviewService.getReview(id);

        if (!review) {
            return res.status(404).json({
                messsage: "Review not found."
            });
        }

        return res.json(review);
    } catch {
        return res.status(500).json({
            message: "Failed to retrieve review."
        });
    }
};

// POST /api/reviews.
export const addReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewService.addReview(req.body);
        return res.status(201).json(review);
    } catch (error) {
        const message = error instanceof Error
        ? error.message
        : "Failed to create review.";
    }
};

// PUT /api/reviews/:id.
export const updateReview = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid review ID."
            });
        }

        const review = await reviewService.updateReview(id, req.body);
        return res.json(review);
    } catch (error) {
        const message = error instanceof Error
        ? error.message
        : "Failed to update review.";
        
        const status = message === "Review not found." ? 404 : 400;

        return res.status(status).json({ message });
    }
};

// DELETE /api/reviews/:id.
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid review ID."
            });
        }

        await reviewService.removeReview(id);

        return res.status(204).send();
    } catch (error) {
        const message = error instanceof Error
        ? error.message
        : "Failed to delete review.";

        const status = message === "Review not found." ? 404: 400;

        return res.status(status).json({ message });
    }
};