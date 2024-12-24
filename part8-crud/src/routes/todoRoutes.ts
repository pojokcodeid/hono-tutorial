// src/routes/todoRoutes.ts
import { Hono } from "hono";
import {
  getTodos,
  getTodo,
  addTodo,
  editTodo,
  removeTodo,
} from "../controllers/todoController";
import { validateAccessToken } from "../controllers/errorController";

const router = new Hono();

router.get("/todos", validateAccessToken, getTodos);
router.get("/todos/:id", validateAccessToken, getTodo);
router.post("/todos", validateAccessToken, addTodo);
router.put("/todos/:id", validateAccessToken, editTodo);
router.delete("/todos/:id", validateAccessToken, removeTodo);

export default router;
