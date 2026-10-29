import type { Review } from "../../types/Review";
import { useGameReviews } from "../../hooks/useGameReviews";

interface GameReviewProps {
    review: Review;
}

/**
 * Sprint 3 Architecture and Revision: 
 * This component uses useGameReviews to access the removeReview action.
 * The hook gives the deletion to reviewService, which calls reviewRepository.
 * The component only displays one review and responds to the user's click.
 */

// Will display one review. 
export function GameReview({ review }: GameReviewProps) {
    const { removeReview } = useGameReviews();

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

            <button onClick={() => removeReview(review.id)}>
                Remove
            </button>
        </article>
    );
}