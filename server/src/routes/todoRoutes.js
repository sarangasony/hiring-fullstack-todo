import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTodo,
} from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id/done", toggleTodoDone);
router.delete("/:id", deleteTodo);

export default router;
