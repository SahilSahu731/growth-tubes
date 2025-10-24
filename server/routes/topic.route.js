import express from "express";
import { createTopic } from "../controllers/topic.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create topic
router.post("/create", protect, isAdmin, createTopic);

export default router
