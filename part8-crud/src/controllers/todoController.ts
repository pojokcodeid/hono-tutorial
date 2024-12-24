// src/controllers/todoController.ts
import { Context } from "hono";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../models/todoModel";

export const getTodos = async (c: Context) => {
  const todos = await getAllTodos();
  return c.json(todos);
};

export const getTodo = async (c: Context) => {
  const { id } = c.req.param();
  const todo = await getTodoById(id);
  if (todo) {
    return c.json(todo);
  }
  return c.json({ message: "Todo not found" }, 404);
};

export const addTodo = async (c: Context) => {
  const { title, description } = await c.req.json<{
    title: string;
    description: string;
  }>();
  const todo = await createTodo(title, description);
  return c.json(todo, 201);
};

export const editTodo = async (c: Context) => {
  const { id } = c.req.param();
  const { title, description } = await c.req.json<{
    title: string;
    description: string;
  }>();
  const todo = await updateTodo(id, title, description);
  if (todo) {
    return c.json(todo);
  }
  return c.json({ message: "Todo not found" }, 404);
};

export const removeTodo = async (c: Context) => {
  const { id } = c.req.param();
  const success = await deleteTodo(id);
  if (success) {
    return c.json({ message: "Todo deleted" });
  }
  return c.json({ message: "Todo not found" }, 404);
};
