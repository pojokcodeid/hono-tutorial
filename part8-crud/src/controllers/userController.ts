import { Context } from "hono";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
} from "../models/userModel";

// Mendapatkan semua pengguna
export const getUsers = async (c: Context) => {
  const users = await getAllUsers();
  return c.json(users);
};

// Mendapatkan pengguna berdasarkan ID
export const getUser = async (c: Context) => {
  const { id } = c.req.param();
  const user = await getUserById(id);
  if (user) {
    return c.json(user);
  }
  return c.json({ message: "User not found" }, 404);
};

// Menambahkan pengguna baru
export const addUser = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json<{
      name: string;
      email: string;
      password: string;
    }>();
    const user = await createUser(name, email, password);
    return c.json(user, 201);
  } catch (error) {
    return c.json({ message: error }, 500);
  }
};

// Memperbarui pengguna
export const editUser = async (c: Context) => {
  const { id } = c.req.param();
  const { name, email, password } = await c.req.json<{
    name: string;
    email: string;
    password: string;
  }>();
  const user = await updateUser(id, name, email, password);
  if (user) {
    return c.json(user);
  }
  return c.json({ message: "User not found" }, 404);
};

// Menghapus pengguna
export const removeUser = async (c: Context) => {
  const { id } = c.req.param();
  const success = await deleteUser(id);
  if (success) {
    return c.json({ message: "User deleted" });
  }
  return c.json({ message: "User not found" }, 404);
};

// Login pengguna
export const loginUser = async (c: Context) => {
  const { email, password } = await c.req.json<{
    email: string;
    password: string;
  }>();
  const user = await verifyUser(email, password);
  if (user) {
    return c.json({ message: "Login successful", user });
  }
  return c.json({ message: "Invalid credentials" }, 401);
};
