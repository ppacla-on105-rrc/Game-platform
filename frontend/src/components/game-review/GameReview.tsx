import { useState } from "react";
import type { Review } from "../../types/Review";
import { reviewService, type ReviewDraft } from "../../services/reviewService";

interface GameReviewProps {
    review: Review;
    onRemove: (id: number) => Promise<void>;
    onUpdate: (id: number, draft: ReviewDraft) => Promise<Review>;
}

/**
 * Sprint 3 Architecture and Revision: 
 * This component uses useGameReviews to access the removeReview action.
 * The hook gives the deletion to reviewService, which calls reviewRepository.
 * The component only displays one review and responds to the user's click.
 */

// Will display one review. 
export function GameReview({ review, onRemove, onUpdate }: GameReviewProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [game, setGame] = useState(review.game);
    const [username, setUsername] = useState(review.username);
    const [rating, setRating] = useState(String(review.rating));
    const [comment, setComment] = useState(review.comment);
    const [error, setError] = useState("");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const draft: ReviewDraft = {
            game,
            username,
            rating: Number(rating),
            comment
        };

        const validationError = reviewService.validateReview(draft);

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await onUpdate(review.id, draft);
            setIsEditing(false);
            setError("");
        } catch (caughtError) {
            setError(
                caughtError instanceof Error
                    ? caughtError.message
                    : "Unable to update the review."
            );
        }
    }

    function handleCancel() {
        setGame(review.game);
        setUsername(review.username);
        setRating(String(review.rating));
        setComment(review.comment);
        setError("");
        setIsEditing(false);
    }
    
    return (
        /**
         * Article is used here since it groups all the information belonging to one game review together.
         * It's a container for one complete piece of content. 
         */
        <article>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <h3>Edit Review</h3>

                    <label htmlFor={`game-${review.id}`}>Game</label>
                    <input
                        id={`game-${review.id}`}
                        value={game}
                        onChange={(event) => setGame(event.target.value)}
                    />

                    <label htmlFor={`username-${review.id}`}>Username</label>
                    <input
                        id={`username-${review.id}`}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <label htmlFor={`rating-${review.id}`}>Rating</label>
                    <select
                        id={`rating-${review.id}`}
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

                    <label htmlFor={`comment-${review.id}`}>
                        Comment (optional)
                    </label>
                    <textarea
                        id={`comment-${review.id}`}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />

                    {error && <p role="alert">{error}</p>}

                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <h3>{review.game}</h3>

                    <p>Reviewed by: {review.username}</p>

                    <p>Rating: {review.rating}/5</p>

                    <p>{review.comment}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Edit
                    </button>

                    <button onClick={() => onRemove(review.id)}>
                        Remove
                    </button>
                </>
            )}
        </article>
    );
}