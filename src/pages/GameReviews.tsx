import { GameReview } from "../components/game-review/GameReview";
import { AddReviewForm } from "../components/game-review/AddReviewForm";
import type { Review } from "../types/Review";

interface GameReviewProps {
    reviews: Review[];
    onAddReview: (review: Review) => void;
    onRemoveReview: (id: number) => void;
    
}

// Displays all the reviews. 
export function GameReviews({ reviews, onAddReview, onRemoveReview }: GameReviewProps) {
    /**
     * Using ternary Operator here.
     * reviews.length > 0 is the condition. It checks if there are any reviews. 
     * ? is the "if true" part of the ternary operator.
     * reviews.map goes through each review and gets its review id. 
     * ... is the spread operator. It takes the ids from the array and spreads them out as individual
     * arguments.
     * Math.max() finds the largest id number, and + 1 creates the next id.
     * : 1 is the "else" part. If there are no reviews, the id starts at 1. 
     */
    const nextId = reviews.length > 0 ? Math.max(...reviews.map((review) => review.id)) + 1 : 1;  

    return (
        <section className="game-reviews">
            <h2>Game Reviews</h2>

            <AddReviewForm 
                onAddReview={onAddReview}
                nextId={nextId}
            />

            {reviews.map((review) => (
                // The key is there since React requires a unique key when rendering lists. 
                <GameReview 
                    key={review.id} 
                    review={review} 
                    onRemove={onRemoveReview}
                />
            ))}
        </section>
    );
}