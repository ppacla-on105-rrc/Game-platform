import { GameReview } from "../components/game-review/GameReview";
import { AddReviewForm } from "../components/game-review/AddReviewForm";
import { useGameReviews } from "../hooks/useGameReviews";

/**
 * Sprint 3 Architecture and Revision: 
 * This page uses useGameReviews to access the shared review list and add action.
 * The hook calls reviewService, which gives data operations to reviewRepository.
 * The page is responsible for composing the form and review-list presentation.
 */

export function GameReviews() {
    const { 
        reviews, 
        loading, 
        error,
        addReview,
        updateReview,
        removeReview,
    } = useGameReviews();

    return (
        <section className="game-reviews">
            <h2>Game Reviews</h2>
            
            <AddReviewForm onAddReview={addReview} />
            {loading ? (
                <p>Loading reviews...</p>
            ) : error ? (
                <p role="alert">{error}</p>
            ) : reviews.length === 0 ? (
                <p>No reviews yet. Add the first review!</p>
            ) : (
                reviews.map((review) => (
                    <GameReview 
                        key={review.id} 
                        review={review} 
                        onRemove={removeReview}
                        onUpdate={updateReview}
                    />
                ))           
            )}
        </section>
    );
}