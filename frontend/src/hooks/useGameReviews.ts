// This hook manages the review state and handles asynchronous operations.
import { useEffect, useState } from "react";
import type { Review } from "../types/Review";
import { reviewService, type ReviewDraft } from "../services/reviewService";

export function useGameReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load reviews from the back-end.
    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await reviewService.getReviews();
                setReviews(data);
            } catch (error) {
                setError(
                    error instanceof Error
                    ? error.message
                    : "Failed to load reviews."
                );
            } finally {
                setLoading(false);
            }
        };

        void loadReviews();
    }, []);

    // Add a review.
    async function addReview(draft: ReviewDraft) {
        await reviewService.addReview(draft);

        const data = await reviewService.getReviews();
        setReviews(data);
    }

    // Update a review.
    async function updateReview(id: number, draft: ReviewDraft) {
        const updateReview = await reviewService.updateReview(id, draft);

        const data = await reviewService.getReviews();
        setReviews(data);

        return updateReview;
    }

    // Delete a review.
    async function removeReview(id: number) {
        await reviewService.removeReview(id);

        const data = await reviewService.getReviews();
        setReviews(data);
    }

    return {
        reviews,
        loading,
        error,
        addReview,
        updateReview,
        removeReview
    };
}