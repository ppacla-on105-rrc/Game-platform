// Connects the UI to the review service and manages review-list state.
import { useState } from "react";
import type { Review } from "../types/Review";
import { reviewService, type ReviewDraft } from "../services/reviewService";

export function useGameReviews() {
    const [reviews, setReviews] = useState<Review[]>(() => reviewService.getReviews());

    function addReview(draft: ReviewDraft) {
        reviewService.addReview(draft);
        setReviews(reviewService.getReviews());
    }

    function removeReview(id: number) {
        reviewService.removeReview(id);
        setReviews(reviewService.getReviews());
    }

    // Future implementation when adding the update feature for reviews. 
    function updatedReview(id: number, draft: ReviewDraft) {
        return reviewService.updateReview(id, draft);
        setReviews(reviewService.getReviews());
    }

    return {
        reviews,
        addReview,
        removeReview,
        updatedReview
    };
}