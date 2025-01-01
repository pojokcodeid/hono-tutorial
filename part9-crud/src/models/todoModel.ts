// src/models/todoModel.ts
import { PrismaClient, Todo } from "@prisma/client";
import { logger } from "../utils/logger";

const prisma = new PrismaClient();

export const getAllTodos = async (): Promise<Todo[]> => {
  return await prisma.todo.findMany();
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: { id },
  });
};

export const createTodo = async (
  title: string,
  description: string,
  userId: string
): Promise<Todo> => {
  return await prisma.todo.create({
    data: { title, description, userId },
  });
};

export const updateTodo = async (
  id: string,
  title: string,
  description: string,
  userId: string
): Promise<Todo | null> => {
  return await prisma.todo.update({
    where: { id },
    data: { title, description, userId },
  });
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    return true;
  } catch (error: unknown) {
    logger.error("models/todoModel/deleteTodo: " + error);
    return false;
  }
};
