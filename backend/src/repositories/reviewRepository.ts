import { prisma } from "../lib/prisma.js";

// Information required to create or update a review.
type ReviewData = {
    game: string;
    username: string;
    rating: number;
    comment: string;
};

export const reviewRepository = {
    // Retrieve all reviews.
    getAll() {
        return prisma.review.findMany({
            orderBy: {
                id: "asc"
            }
        });
    },

    // Retreive one review by ID.
    getById(id: number) {
        return prisma.review.findUnique({
            where: { id }
        });
    },

    // Create a review.
    create(data: ReviewData) {
        return prisma.review.create({
            data
        });
    },

    // Update an existing review.
    update(id: number, data: ReviewData) {
        return prisma.review.update({
            where: { id },
            data
        });
    },

    // Delete a review.
    delete(id: number) {
        return prisma.review.delete({
            where: { id }
        });
    }
};