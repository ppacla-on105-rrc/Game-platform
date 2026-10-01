import { useState } from "react";
import type { Review } from "../../types/Review";

interface AddReviewFormProps {
    onAddReview: (review: Review) => void;
    nextId: number;
}

export function AddReviewForm({ onAddReview, nextId }: AddReviewFormProps) {
    const [game, setGame] = useState("");
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (game.trim().length < 2) {
            setError("Game name must be at least 2 characters.");
            return;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }

        if (!rating) {
            setError("Please select a rating.");
            return;
        }

        // Checks if comment is not empty and less than 10 characters.
        if (comment.trim() !== "" && comment.trim().length < 10) {
            setError("Comment must be at least 10 characters if entered.");
            return;
        }

        const newReview: Review = {
            id: nextId,
            game: game.trim(),
            username: username.trim(),
            rating: Number(rating),
            comment: comment.trim()
        };

        onAddReview(newReview);

        setGame("");
        setUsername("");
        setRating("");
        setComment("");
        setError("");
    }

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

            {error && <p>{error}</p>}

            <button type="submit">Add Review</button>
        </form>
    );
}