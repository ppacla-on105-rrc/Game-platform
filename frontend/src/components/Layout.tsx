import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
    return (
        <>
            <header>
                <nav>
                    <NavLink to="/games">Games</NavLink>
                    <NavLink to="/game-reviews">Game Reviews</NavLink>
                    <NavLink to="/game-library">Game Library</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}