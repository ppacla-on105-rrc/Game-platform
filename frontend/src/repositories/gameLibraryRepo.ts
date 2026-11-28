
import type { LibraryGame } from "../types/LibraryGame";

// Backend API address from the Vite environment.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const LIBRARY_URL =
  `${API_BASE_URL.replace(/\/$/, "")}/api/library`;

// Handle successful and unsuccessful API responses.
async function handleResponse<T>(
  response: Response
): Promise<T> {
  if (!response.ok) {
    let message = "Something went wrong with the request.";

    try {
      const data: unknown = await response.json();

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        message = data.message;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const gameLibraryRepo = {
  // GET: Retrieve games from PostgreSQL.
  async getAll(): Promise<LibraryGame[]> {
    const response = await fetch(LIBRARY_URL);
    return handleResponse<LibraryGame[]>(response);
  },

  // POST: Add a game through the backend API.
  async add(
    game: Omit<LibraryGame, "id">
  ): Promise<LibraryGame> {
    const response = await fetch(LIBRARY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

    return handleResponse<LibraryGame>(response);
  },

  // PATCH: Change a game's installation status.
  async updateStatus(
    id: number,
    status: string
  ): Promise<void> {
    const response = await fetch(`${LIBRARY_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    await handleResponse<unknown>(response);
  },

  // DELETE: Remove a game from the library.
  async delete(id: number): Promise<void> {
    const response = await fetch(`${LIBRARY_URL}/${id}`, {
      method: "DELETE",
    });

    await handleResponse<void>(response);
  },
};
