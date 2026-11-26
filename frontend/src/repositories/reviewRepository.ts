// This repository uses fetch() to communicate with the back-end API.
import type { Review } from "../types/Review";

const API_URL = "http://localhost:3000/api/reviews";

// Handle unsuccessful API responses.
const hanldeResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.message ?? "Something went wrong with the Review API."
        );
    }
};

export const reviewRepository = {
    // Retrieve all reviews.
    async getAll(): Promise<Review[]> {
        const response = await fetch(API_URL);

        await hanldeResponse(response);

        return response.json();
    },

    // Retrieve one review by ID.
    async getById(id: number): Promise<Review> {
        const response = await fetch(`${API_URL}/${id}`);

        await hanldeResponse(response);

        return response.json(); 
    },

    // Create a review.
    async create(review: Omit<Review, "id">): Promise<Review> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        await hanldeResponse(response);

        return response.json();
    },

    // Update a review.
    async update(id: number, updatedReview: Omit<Review, "id">): Promise<Review> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedReview)
        });

        await hanldeResponse(response);

        return response.json();
    },

    // Delete a review..
    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        await hanldeResponse(response);
    }
};