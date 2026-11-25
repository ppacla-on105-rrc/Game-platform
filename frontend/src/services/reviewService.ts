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

    // Get all reviews through the repository.
    getReviews(): Review[] {
        return reviewRepository.getAll();
    },

    // Create a validated review with a unique next ID.
    addReview(draft: ReviewDraft): Review {
        // Using this. here because validateReview is not a separate function, but instead a method of the same object.
        const error = this.validateReview(draft);

        if (error) {
            throw new Error(error);
        }

        const currentReviews = reviewRepository.getAll();
        const nextId = 
            currentReviews.length > 0 
                ? Math.max(...currentReviews.map((review) => review.id)) + 1 : 1;
        
        const newReview: Review = {
            id: nextId,
            game: draft.game.trim(),
            username: draft.username.trim(),
            rating: draft.rating,
            comment: draft.comment.trim()
        };

        return reviewRepository.create(newReview);
    },

    // Update a validated review.
    updateReview(id: number, draft: ReviewDraft): Review {
        const error = this.validateReview(draft);

        if (error) {
            throw new Error(error);
        }

        const updatedReview: Review = {
            id,
            game: draft.game.trim(),
            username: draft.username.trim(),
            rating: draft.rating,
            comment: draft.comment.trim()
        };

        const result = reviewRepository.update(id, updatedReview);

        if (!result) {
            throw new Error("Review not found.");
        }

        return result;
    },

    // Delete a review.
    removeReview(id: number): void {
        const deleted = reviewRepository.delete(id);

        if (!deleted) {
            throw new Error("Review not found.");
        }
    }
};