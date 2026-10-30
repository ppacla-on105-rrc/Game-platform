import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameReviews } from "./pages/GameReviews";
import Games from "./components/games/Games";
import GameLibraryPage from "./pages/GameLibraryPage";
import "./App.css";

function App() {
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

        <Route path="game-reviews"element={<GameReviews />}/>

        <Route
          path="game-library"
          element={<GameLibraryPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;