import express from "express";
import {
  getTodo,
  createTodo,
  getTodosUserById,
  updateTodo,
} from "../controllers/todos.controller.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/:id", getTodo);
router.get("/user/:userId", getTodosUserById);
router.put("/:id", updateTodo);
// router.delete("/:id", deleteTodo);

export default router;
