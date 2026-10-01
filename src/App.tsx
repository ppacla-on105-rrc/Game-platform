import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
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
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route 
                    index
                    element={<Navigate to="/games" replace />} 
                />

                <Route 
                    path="games"
                    element={<Games />}
                />

                <Route 
                    path="game-reviews"
                    element={
                        <GameReviews 
                            reviews={reviewList}
                            onAddReview={addReview}
                            onRemoveReview={removeReview}
                        />
                    }
                />

                <Route 
                    path="game-library"
                    element={<GameLibrary />}
                />
            </Route>
        </Routes>
        // <>
        //     <Games />

        //     <GameReviews 
        //         reviews={reviewList}
        //         onAddReview={addReview}
        //         onRemoveReview={removeReview}
        //     />

        //     <GameLibrary />
        // </>
    );
}

export default App;