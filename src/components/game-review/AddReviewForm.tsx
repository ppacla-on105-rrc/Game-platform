import { useReviewForm } from "../../hooks/useReviewForm";
import type { ReviewDraft } from "../../services/reviewService";

interface AddReviewFormProps {
    onAddReview: (draft: ReviewDraft) => void;
}

/**
 * Sprint 3 Architecture and Revision: 
 * This component uses useReviewForm to manage input state and submission.
 * The hook gives validation to reviewService, which owns the business rules.
 * The service gives data changes to reviewRepository through useGameReviews.
 * This keeps form presentation separate from business logic and data access.
 */

export function AddReviewForm({ onAddReview }: AddReviewFormProps) {
    const {
        game,
        setGame,
        username,
        setUsername,
        rating,
        setRating,
        comment,
        setComment,
        error,
        handleSubmit
    } = useReviewForm(onAddReview);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="game">Game</label>
            <input 
                id="game"
                value={game}
                onChange={(event) => setGame(event.target.value)}
            />

            <label htmlFor="username">Username</label>
            <input 
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <label htmlFor="rating">Rating</label>
            <select 
                id="rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
            >
                <option value="">Select a rating</option>
                <option value="1">1 / 5</option>
                <option value="2">2 / 5</option>
                <option value="3">3 / 5</option>
                <option value="4">4 / 5</option>
                <option value="5">5 / 5</option>
            </select>

            <label htmlFor="comment">Comment (optional)</label>
            <textarea 
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            />

            {error && <p role="alert">{error}</p>}

            <button type="submit">Add Review</button>
        </form>
    );
}