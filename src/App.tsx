import { GameReviews } from "./pages/GameReviews";
import Games from "./components/games/Games";
import GameLibrary from "./components/game-library/GameLibrary";
import "./App.css";

function App() {
    return (
        <>
        {/* Commented this out for testing purposes.  */}
            <Games />
            <GameReviews />
            <GameLibrary />
        </>
    );
}

export default App;