import type { Review } from "../../types/Review";

/**
 * Same concept as the Lab 1.2 Solution sample that Scott sent out in Announcements for teams. 
 * Also applies to contents for pages/GameReviews.tsx.
 */

interface GameReviewProps {
    review: Review;
}

// Will display one review. 
export function GameReview({ review }: GameReviewProps) {
    return (
        /**
         * Article is used here since it groups all the information belonging to one game review together.
         * It's a container for one complete piece of content. 
         */
        <article>
            <h3>{review.game}</h3>
            
            <p>Reviewed by: {review.username}</p>

            <p>Rating: {review.rating}/5</p>

            <p>{review.comment}</p>
        </article>
    );
}