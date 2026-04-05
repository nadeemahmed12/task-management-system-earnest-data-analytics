import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTask
} from "../controllers/taskController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/:id/toggle", verifyToken, toggleTask);


export default router;