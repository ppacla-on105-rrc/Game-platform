import { GameReviews } from "./pages/GameReviews";
import Games from "./components/games/Games";
import "./App.css";

function App() {
    return (
        <>
        {/* Commented this out for testing purposes.  */}
            <Games />
            <GameReviews />
        </>
    );
}

export default App;