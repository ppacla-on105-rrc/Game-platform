import { Review } from "@prisma/client";
import { reviewRepository } from "../repositories/reviewRepository.js";

export type ReviewDraft = {
    game: string;
    username: string;
    rating: number;
    comment: string;
};

export const reviewService = {
    // Validate review information.
    validateReview(draft: ReviewDraft): string | null {
        if (draft.game.trim().length < 2) {
            return "Game name must be at least 2 characters.";
        }

        if (draft.username.trim().length < 3) {
            return "Username must be at least 3 characters.";
        }

        if (
            !Number.isInteger(draft.rating) ||
            draft.rating < 1 ||
            draft.rating > 5
        ) {
            return "Please select a rating from 1 to 5.";
        }

        if (
            draft.comment.trim() !== "" &&
            draft.comment.trim().length < 10
        ) {
            return "Comment must be at least 10 characters if entered.";
        }

        return null;
    },

    // Retrieve all reviews.
    getReviews() {
        return reviewRepository.getAll();
    },

    // Retieve one review.
    getReview(id: number) {
        return reviewRepository.getById(id);
    },

    // Create a review.
    async addReview(draft: ReviewDraft) {
        const error = this.validateReview(draft);

        if (error) {
            throw new Error(error);
        }

        return reviewRepository.create({
            game: draft.game.trim(),
            username: draft.username.trim(),
            rating: draft.rating,
            comment: draft.comment.trim()
        });
    },

    // Update a review.
    async updateReview(id: number, draft: ReviewDraft) {
        const error = this.validateReview(draft);

        if (error) {
            throw new Error(error);
        }

        const existingReview = await reviewRepository.getById(id);

        if (!existingReview) {
            throw new Error("Review not found.");
        }

        return reviewRepository.update(id, {
            game: draft.game.trim(),
            username: draft.username.trim(),
            rating: draft.rating,
            comment: draft.comment.trim()
        });
    },

    // Delete  a review.
    async removeReview(id: number) {
        const existingReview = await reviewRepository.getById(id);

        if (!existingReview) {
            throw new Error("Review not found.");
        }

        await reviewRepository.delete(id);
    }
};