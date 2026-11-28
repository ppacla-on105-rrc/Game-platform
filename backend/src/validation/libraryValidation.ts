
export interface LibraryGameInput {
  title: string;
  genre: string;
  status: string;
}


export function validateLibraryGame(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const game = data as Record<string, unknown>;

  return (
    typeof game.title === "string" &&
    game.title.trim().length > 0 &&
    typeof game.genre === "string" &&
    game.genre.trim().length > 0 &&
    (game.status === "Installed" ||
      game.status === "Not Installed")
  );
}

export function validateLibraryStatus(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const game = data as Record<string, unknown>;

  return (
    game.status === "Installed" ||
    game.status === "Not Installed"
  );
}


export function validateLibraryId(id: string): boolean {
  const gameId = Number(id);

  return Number.isInteger(gameId) && gameId > 0;
}
