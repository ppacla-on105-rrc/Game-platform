import test from "node:test";
import assert from "node:assert/strict";
import {
  validateGame,
  validateGameId,
} from "../dist/middleware/validateGame.js";

function runMiddleware(middleware, req) {
  const result = { status: null, body: null, nextCalled: false };

  const res = {
    status(code) {
      result.status = code;
      return this;
    },
    json(body) {
      result.body = body;
      return this;
    },
  };

  middleware(req, res, () => {
    result.nextCalled = true;
  });

  return result;
}

test("valid game is trimmed and passed to the next handler", () => {
  const req = {
    body: {
      title: " Minecraft ",
      genre: " Sandbox ",
      description: " A building game. ",
    },
  };

  const result = runMiddleware(validateGame, req);

  assert.equal(result.nextCalled, true);
  assert.equal(req.body.title, "Minecraft");
  assert.equal(req.body.genre, "Sandbox");
  assert.equal(req.body.description, "A building game.");
});

test("blank game fields return 400 without continuing", () => {
  const result = runMiddleware(validateGame, {
    body: { title: " ", genre: "Sandbox", description: "A game." },
  });

  assert.equal(result.status, 400);
  assert.equal(result.nextCalled, false);
});

test("valid game ID passes to the next handler", () => {
  const result = runMiddleware(validateGameId, { params: { id: "5" } });

  assert.equal(result.nextCalled, true);
});

test("invalid game ID returns 400 without continuing", () => {
  const result = runMiddleware(validateGameId, { params: { id: "abc" } });

  assert.equal(result.status, 400);
  assert.equal(result.nextCalled, false);
});