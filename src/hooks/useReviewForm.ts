// Manages the form's input state and submission-related presentation logic.
import { useState } from "react";
import { reviewService, type ReviewDraft } from "../services/reviewService";

export function useReviewForm(onAddReview: (draft: ReviewDraft) => void) {
    const [game, setGame] = useState("");
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    function resetForm() {
        setGame("");
        setUsername("");
        setRating("");
        setComment("");
        setError("");
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
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
            onAddReview(draft);
            resetForm();
        } catch (caughtError) {
            setError(
                caughtError instanceof Error ? caughtError.message : "Unable to add the review."
            );
        }
    }

    return {
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
    };
}