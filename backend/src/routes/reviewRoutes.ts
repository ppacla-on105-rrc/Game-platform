import { Router } from "express";
import { 
    getReviews, 
    getReview,  
    addReview,
    updateReview,
    deleteReview
} from "../controllers/reviewController.js";
import { validateReview } from "../middleware/validateReview.js";

const router = Router();

// GET all reviews.
router.get("/reviews", getReviews);

// GET one review.
router.get("/reviews/:id", getReview);

// POST a new review.
router.post("/reviews", validateReview, addReview);

// PUT an existing review.
router.put("/reviews/:id", validateReview, updateReview);

// DELETE a review.
router.delete("/reviews/:id", deleteReview);

export default router;