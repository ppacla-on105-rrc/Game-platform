import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameReviews } from "./pages/GameReviews";
import Games, { type Game } from "./components/games/Games";
import GameLibrary from "./components/game-library/GameLibrary";
import { reviews } from "./data/reviews";
import type { Review } from "./types/Review";
import "./App.css";

function App() {
  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const [gameList, setGameList] = useState<Game[]>([
    {
      id: 1,
      title: "Valorant",
      genre: "Tactical Shooter",
      description: "A team-based competitive shooting game.",
    },
    {
      id: 2,
      title: "League of Legends",
      genre: "MOBA",
      description: "A team-based strategy game with unique champions.",
    },
    {
      id: 3,
      title: "GTA 5",
      genre: "Action Adventure",
      description: "An open-world action game set in Los Santos.",
    },
    {
      id: 4,
      title: "Minecraft",
      genre: "Sandbox",
      description: "A building and survival game made of blocks.",
    },
  ]);

  function addReview(review: Review) {
    setReviewList((currentReviews) => [...currentReviews, review]);
  }

  function removeReview(id: number) {
    setReviewList((currentReviews) =>
      currentReviews.filter((review) => review.id !== id),
    );
  }

  function addGame(game: Game) {
    setGameList((currentGames) => [...currentGames, game]);
  }

  function removeGame(id: number) {
    setGameList((currentGames) =>
      currentGames.filter((game) => game.id !== id),
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/games" replace />} />

        <Route
          path="games"
          element={
            <Games
              games={gameList}
              onAddGame={addGame}
              onRemoveGame={removeGame}
            />
          }
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

        <Route path="game-library" element={<GameLibrary />} />
      </Route>
    </Routes>
  );
}

export default App;