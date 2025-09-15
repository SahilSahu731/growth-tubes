import express from "express";
import {
  getRoadmaps,
  getRoadmap,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
  toggleRoadmapStatus,
  forkRoadmap,
} from "../controllers/roadmap.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getRoadmaps);
router.get("/:slug", getRoadmap);

// Authenticated user routes
router.post("/:id/fork", protect, forkRoadmap);

// Admin only routes
router.post("/", protect, isAdmin, createRoadmap);
router.put("/:id", protect, isAdmin, updateRoadmap);
router.delete("/:id", protect, isAdmin, deleteRoadmap);
router.patch("/:id/status", protect, isAdmin, toggleRoadmapStatus);

export default router;