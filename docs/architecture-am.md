
# Sprint 3 - Architecture Documentation
**Name:** Abhinaya Machiraju  
**Project:** Game Platform  
**Course:** COMP-4002 Full Stack Development

## Overview

For Sprint 3, I refactored the Game Library feature using the
hook-service-repository architecture.

The goal was to separate the presentation logic, business
logic, and data access logic. This makes the code easier to
understand, maintain, and reuse.

## 1. Custom Hook - useGameLibrary.ts

### What does it do?
The useGameLibrary hook manages the Game Library's presentation
state. It provides the list of games, feedback messages, and
functions for adding, removing, and updating games.

### Why did I include this logic?
I used a custom hook to keep React state and UI-related logic
separate from the components. Business rules are handled by
the service instead of the hook.

### Where and how is it used?
The hook is used in GameLibraryPage.tsx and GameLibrary.tsx.

GameLibraryPage uses it to add games and display feedback
messages. GameLibrary uses it to display and remove games.

Both components receive synchronized game data through the hook.

## 2. Service - gameLibraryService.ts

### What does it do?
The Game Library service handles business rules such as
checking required fields, preventing duplicate games,
generating game IDs, and updating or removing games.

### Why did I include this logic?
I moved these rules out of the React components so that
the business logic can be reused and maintained in one place.

The service does not manage React state or directly store
the game data. It calls repository methods when data
needs to be accessed or modified.

### Where and how is it used?
The service is used by the useGameLibrary hook.

When a user adds or removes a game, the hook calls
the appropriate service method. The service validates
the action and calls the repository.

## 3. Repository - gameLibraryRepo.ts

### What does it do?
The repository manages access to Game Library data.

It provides CRUD methods:
- getAll() - retrieves all games.
- getById() - finds a game using its ID.
- add() - adds a game.
- update() - updates an existing game.
- delete() - removes a game.

### Why did I include this logic?
I created the repository to keep data access separate
from business logic and presentation logic.

Currently, the repository uses test data stored in memory.
In a future sprint, this can be replaced with a backend
without rewriting the React components.

### Where and how is it used?
The repository is used by gameLibraryService.ts.

The service calls repository methods to retrieve, add,
update, or remove games.

## 4. Test Data - libraryGames.ts

I created an array of 10 sample games using the LibraryGame
TypeScript interface.

Each game contains an ID, title, genre, and installation status.

The repository imports this data instead of requesting it
from a backend service.

## 5. Architecture Flow

GameLibraryPage / GameLibrary
              |
              v
       useGameLibrary
              |
              v
     gameLibraryService
              |
              v
       gameLibraryRepo
              |
              v
         libraryGames

## Conclusion

This sprint helped me understand how to organize a React
application into separate layers.

Instead of keeping game data and business rules directly in
components, I used a custom hook, service, and repository.

This approach makes the Game Library easier to maintain,
test, and expand in future sprints.
