// src/models/userModel.ts
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../jwt";

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
};

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.update({
    where: { id },
    data: { name, email, password: hashedPassword },
  });
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
};

export const verifyUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await getUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = await generateAccessToken(user);
    return { ...user, accessToken } as User;
  }
  return null;
};
