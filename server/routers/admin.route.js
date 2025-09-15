import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
  getAllUsers,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

// User management routes
router.get("/users", protect, isAdmin, getAllUsers);
router.patch("/users/:id/status", protect, isAdmin, updateUserStatus);
router.patch("/users/:id/role", protect, isAdmin, updateUserRole);
router.delete("/users/:id", protect, isAdmin, deleteUser);

export default router;