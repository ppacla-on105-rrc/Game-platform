import type { Game } from "../types/Game";

type GameInput = Omit<Game, "id">;

const apiOrigin = import.meta.env.DEV ? "http://localhost:3000" : "";
const gamesUrl = `${apiOrigin}/api/games`;

async function request(path = "", options?: RequestInit): Promise<Response> {
  const response = await fetch(`${gamesUrl}${path}`, options);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || `Games request failed (${response.status}).`);
  }

  return response;
}

export const gamesRepository = {
  async getAll(): Promise<Game[]> {
    const response = await request();
    return response.json();
  },

  async getById(id: number): Promise<Game> {
    const response = await request(`/${id}`);
    return response.json();
  },

  async create(game: GameInput): Promise<Game> {
    const response = await request("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    });
    return response.json();
  },

  async update(id: number, game: GameInput): Promise<Game> {
    const response = await request(`/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(game),
    });
    return response.json();
  },

  async delete(id: number): Promise<void> {
    await request(`/${id}`, { method: "DELETE" });
  },
};