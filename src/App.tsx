import { useState } from "react";
import { GameReviews } from "./pages/GameReviews";
import Games from "./components/games/Games";
import GameLibrary from "./components/game-library/GameLibrary";
import { reviews } from "./data/reviews";
import type { Review } from "./types/Review";
import "./App.css";

function App() {
    const [reviewList, setReviewList] = useState<Review[]>(reviews);

    function addReview(review: Review) {
        setReviewList((currentReviews) => [
            ...currentReviews,
            review
        ]);
    }

    function removeReview(id: number) {
        setReviewList((currentReviews) => currentReviews.filter((review) => review.id !== id));
    }
    return (
        <>
        {/* Commented this out for testing purposes.  */}
            <Games />

            <GameReviews 
                reviews={reviewList}
                onAddReview={addReview}
                onRemoveReview={removeReview}
            />

            <GameLibrary />
        </>
    );
}

export default App;