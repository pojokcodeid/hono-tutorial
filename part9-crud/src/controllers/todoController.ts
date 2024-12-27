// src/controllers/todoController.ts
import { Context } from "hono";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../models/todoModel";
import { logger } from "../utils/logger";
import { validateTodo } from "../validations/todosValidation";

export const getTodos = async (c: Context) => {
  try {
    const todos = await getAllTodos();
    return c.json({ message: "success", data: todos}, 200);
  } catch (error) {
    logger.error("controller/todoController/getTodos: " + error);
    return c.json(
      { message: "Something went wrong, please contact support", data:null },
      500
    );
  }
};

export const getTodo = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const todo = await getTodoById(id);
    if (todo) {
      return c.json({ message: "success", data: todo }, 200);
    }
    return c.json({ message: "Todo not found", data: null }, 404);
  } catch (error) {
    logger.error("controller/todoController/getTodo: " + error);
    return c.json(
      { message: "Something went wrong, please contact support" , data: null},
      500
    );
  }
};

export const addTodo = async (c: Context) => {
  try {
    const data = await c.req.json<{
      title: string;
      description: string;
    }>();
    const { title, description } = validateTodo.parse(data);
    const todo = await createTodo(title, description);
    return c.json({ message: "Todo created", data: todo }, 201);
  } catch (error: any) {
    logger.error("controller/todoController/addTodo: " + error);
    return c.json(
      {
        message:
          JSON.parse(error.message)[0].message ||
          "Something went wrong, please contact support",
        data: null,
      },
      500
    );
  }
};

export const editTodo = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json<{
      title: string;
      description: string;
    }>();
    const { title, description } = validateTodo.parse(data);
    const todo = await updateTodo(id, title, description);
    if (todo) {
      return c.json({ message: "Todo updated", data: todo}, 200);
    }
    return c.json({ message: "Todo not found" }, 404);
  } catch (error: any) {
    logger.error("controller/todoController/editTodo: " + error);
    return c.json(
      {
        message:
          JSON.parse(error.message)[0].message ||
          "Something went wrong, please contact support",
        data: null,
      },
      500
    );
  }
};

export const removeTodo = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const success = await deleteTodo(id);
    if (success) {
      return c.json({ message: "Todo deleted", data: success }, 200);
    }
    return c.json({ message: "Todo not found", data: null }, 404);
  } catch (error) {
    logger.error("controller/todoController/removeTodo: " + error);
    return c.json(
      { message: "Something went wrong, please contact support", data: null },
      500
    );
  }
};
