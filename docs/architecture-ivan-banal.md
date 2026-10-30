# Sprint 3 Architecture - Game Reviews

## Overview

The Game Reviews section uses a Hook-Service-Repository architecture.
This separates presentation logic, UI state, business rules, and data access.

The flow is:

Components -> Custom Hooks -> Review Service -> Review Repository -> Test Data

## 1. useGameReviews Hook

**File:** `src/hooks/useGameReviews.ts`

**What it does:**

Manages the review list using React's `useState` and provides actions to add, remove, and update reviews.
After each operation, it retrieves the updated review list from the service and updates React state to refresh the UI 
immediately.

**Why it is separated:**

Review-state mamangement and synchronization should not be repeated in individual components.
The hook connects the presentation layer to the service layer and ensures that changes appear immediately without 
switching pages.

**Where it is used:**
- `src/pages/GameReviews.tsx` reads the review list and accesses the add and remove actions.
- `src/pages/GameReviews.tsx` passes the `removeReview` action to `GameReview.tsx` through the `onRemove` prop.

## 2. useReviewForm Hook

**File:** `src/hooks/useReviewForm.ts`

**What it does:**

Manages form input values, error messages, form submission, and resetting the form.

**Why it is separated:**

This keeps form-state management and makes the logic reusable.

**Where it is used:**

- `src/components/game-review/AddReviewForm.tsx`

The hook calls `reviewService` for validation and does not access the repository directly. 

## 3 Review Service

**File:** `src/services/reviewService.ts`

**What it does:**

Validates review information, generates review IDs, and coordinates create, read, update, and delete operations.

**Why it is separated:**

Validation and review rules are business logic, not representation or data-access logic.
Keeping these rules in a service makes them easier to maintain and reuse.

**Where it is used:**

- `src/hooks/useGameReviews.ts`
- `src/hooks/useReviewForm.ts`

## 4. Review Repository

**File:** `src/repository/reviewRepository.ts`

**What it does:**

Provides CRUD methods for retrieving, creating, updating, and deleting reviews.
It imports the typed test data from `src/data/reviews.ts` and maintains in-memory store.

**Why is it separated:**

Components and services should not need to know how review data is stored.
The repository provides one place to change the data-access implementation later. 

**Where it is used:**

- `src/services/reviewService.ts`
 
The repository uses a simple in-memory array and does not notify React directly. The custom hook updates React state
after operations are performed through the service.

## 5. Review Type and Test Data

**Files:**

- `src/types/Reviews.ts`
- `src/data/reviews.ts`

**What they do:**

The `Review`interface defined the structure of a review.
The test-data file provides the initial review records used by the repository.

**Why they are separated:**

The interface keeps review data consistently typed, while the data file keeps sample records separate from application
logic.

## 6. Components and Page

**Files:**
- `src/pages/GameReviews.tsx`
- `src/components/game-review/GameReview.tsx`
- `src/components/game-review/AddReviewForm.tsx`

**What they do:**

The page composes the review form and review list.

`GameReview` displays an individual review and calls the `onRemove` callback when the Remove button is clicked.
`AddReviewForm` renders the form and uses `useReviewForm` to manage its state.

**Why they are separated:**

Each component has a focused presentation responsiblity rather than containing all the business and data-access logic.
The parent page manages the review-list state through `useGameReviews` and passes the necessary callbacks to its child
components. This avoids creating separate review-list state inside individual review components.

## 7. Data Persistence

The repository currently uses an in-memory store initialized with local test data.

Changes are reflected in the UI while the application is running, but they are not persisted after a full page refresh.