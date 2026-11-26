// Validation rules and review business logic.
import type { Review } from "../types/Review";
import { reviewRepository } from "../repositories/reviewRepository";

/**
 * Contains all properties of Review object except for id.
 * We omit ID because the user doesn't need to provide an ID when creating a new review.
 */
export type ReviewDraft = Omit<Review, "id">;

export const reviewService = {
    // Validate the information entered for a review.
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
    async getReviews(): Promise<Review[]> {
        return reviewRepository.getAll();
    },

    // Add a review.
    async addReview(draft: ReviewDraft): Promise<Review> {
        // Using this. here because validateReview is not a separate function, but instead a method of the same object.
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

    // Update an existing review.
    async updateReview(id: number, draft: ReviewDraft): Promise<Review> {
        const error = this.validateReview(draft);

        if (error) {
            throw new Error(error);
        }

        return reviewRepository.update(id, {
            game: draft.game.trim(),
            username: draft.username.trim(),
            rating: draft.rating,
            comment: draft.comment.trim()
        });
    },

    // Delete a review.
    async removeReview(id: number): Promise<void> {
        await reviewRepository.delete(id);
    }
};