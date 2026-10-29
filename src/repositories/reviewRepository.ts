// CRUD methods and access to review test data.
import type { Review } from "../types/Review";
import { reviews } from "../data/reviews";
import { subscribe } from "diagnostics_channel";

type ReviewListener = () => void;

// In-memory data store initialized from the existing test data.
let reviewStore: Review[] = [...reviews];
const listeners = new Set<ReviewListener>();

function notifyListeners() {
    listeners.forEach((listener) => listener());
}

export const reviewRepository = {
    // Subscribe to changes in the review data.
    subscribe(listener: ReviewListener) {
        listener.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },

    // Read all reviews.
    getAll(): Review[] {
        return reviewStore;
    },

    // Read one review by ID.
    getById(id: number): Review | undefined {
        return reviewStore.find((review) => review.id === id);
    },

    // Add a review.
    create(review: Review): Review {
        reviewStore = [...reviewStore, review];
        notifyListeners();

        return review;
    },

    // Update an existing review.
    update(id: number, updatedReview: Review): Review | undefined {
        const exists = reviewStore.some((review) => review.id === id);

        if (!exists) {
            return undefined;
        }

        reviewStore = reviewStore.map((review) => 
            review.id === id ? updatedReview : review
        );

        notifyListeners();

        return updatedReview;
    },

    // Remove a review by ID.
    delete(id: number): boolean {
        const exists = reviewStore.some((review) => review.id === id);

        if (!exists) {
            return false;
        }

        reviewStore = reviewStore.filter((review) => review.id !== id);

        notifyListeners

        return true;
    }
};