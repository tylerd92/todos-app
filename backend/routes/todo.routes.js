import express from "express";
import {
  getTodo,
  createTodo,
  getTodosUserById,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todos.controller.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/user/:userId", getTodosUserById);
router.patch("/:id/toggle", toggleTodo);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
