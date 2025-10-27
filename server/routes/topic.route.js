import express from "express";
import { getAllTopics, createTopic } from "../controllers/topic.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllTopics);

// Admin routes
router.post("/create", protect, isAdmin, createTopic);

export default router
