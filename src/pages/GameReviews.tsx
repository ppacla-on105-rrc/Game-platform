import { reviews } from "../data/reviews";
import { GameReview } from "../components/game-review/GameReview";

export function GameReviews() {
    return (
        <section className="game-reviews">
            <h2>Game Reviews</h2>

            {reviews.map((review) => (
                <GameReview key={review.id} review={review} />
            ))}
        </section>
    );
}