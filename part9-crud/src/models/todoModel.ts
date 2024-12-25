// src/models/todoModel.ts
import { PrismaClient, Todo } from "@prisma/client";

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
  description: string
): Promise<Todo> => {
  return await prisma.todo.create({
    data: { title, description },
  });
};

export const updateTodo = async (
  id: string,
  title: string,
  description: string
): Promise<Todo | null> => {
  return await prisma.todo.update({
    where: { id },
    data: { title, description },
  });
};

export const deleteTodo = async (id: string): Promise<boolean> => {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
};
