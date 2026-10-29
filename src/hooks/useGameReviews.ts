// Connects the UI to the review service and manages review-list state.
import { useSyncExternalStore } from "react";
import { reviewRepository } from "../repositories/reviewRepository";
import { reviewService, type ReviewDraft } from "../services/reviewService";

export function useGameReviews() {
    // Using useSyncExternalStore is useful here because the repository maintains a shared-in-memory store. 
    const reviews = useSyncExternalStore(
        reviewRepository.subscribe,
        // Read reviews in the browser.
        reviewRepository.getAll, 
        // Read reviews during server rendering.
        reviewRepository.getAll
    );

    function addReview(draft: ReviewDraft) {
        return reviewService.addReview(draft);
    }

    function removeReview(id: number) {
        reviewService.removeReview(id);
    }

    function updatedReview(id: number, draft: ReviewDraft) {
        return reviewService.updateReview(id, draft);
    }

    return {
        reviews,
        addReview,
        removeReview,
        updatedReview
    };
}