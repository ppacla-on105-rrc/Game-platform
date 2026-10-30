# Games Architecture - Philip Pacla-on

## Overview

For my Games feature, I used the hook, service, and repository architecture. I separated the code so that each file has its own responsibility.

The Games feature follows this order:

`Games component > useGames hook > gamesService > gamesRepository > games test data`

## useGames Hook

### What does the hook do?

The `useGames` hook manages the state that is needed by the Games component. It provides the list of games, the error message, and the functions for adding and removing games.

### Why did I put this logic in the hook?

I put this logic in the hook because React state and updating what the user sees are presentation concerns. The hook does not validate the game information or directly access the test data. It uses the service for those responsibilities.

### Where is the hook used?

The hook is located in `src/hooks/useGames.ts`. It is used by the `Games` component to get the games, display errors, and handle adding or removing games.

## Games Service

### What does the service do?

The Games service handles the business logic for the Games feature. It trims the form values, checks that all fields were completed, creates the next available ID, and handles requests to get, add, or remove games.

### Why did I put this logic in the service?

I put this logic in the service because validation and creating IDs are business rules. This keeps those rules out of the React component and repository.

### Where is the service used?

The service is located in `src/services/gamesService.ts`. It is called by the `useGames` hook. The service then calls the Games repository when it needs to read or change the game data.

## Games Repository

### What does the repository do?

The Games repository manages access to the game data. It imports the test data and contains methods to create, read, update, and delete games.

### Why did I put this logic in the repository?

I put this logic in the repository because reading and changing stored data are data-access concerns. Other parts of the application do not need to directly import or change the test-data array. Later, the repository can be changed to use a back-end without needing to completely change the Games component.

### Where is the repository used?

The repository is located in `src/repositories/gamesRepository.ts`. It is used by the Games service. It gets the original game data from `src/data/games.ts` and manages that data using its CRUD methods.