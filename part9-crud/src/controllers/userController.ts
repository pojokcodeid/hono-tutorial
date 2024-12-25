import { Context } from "hono";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
} from "../models/userModel";
import { logger } from "../utils/logger";
import { validateUser } from "../validations/userValidation";

// Mendapatkan semua pengguna
export const getUsers = async (c: Context) => {
  try {
    const users = await getAllUsers();
    return c.json(users);
  } catch (error: any) {
    logger.error("controller/userController/getUsers: " + error);
    return c.json(
      {
        message:
          error.message || "Something went wrong, please contact support",
      },
      500
    );
  }
};

// Mendapatkan pengguna berdasarkan ID
export const getUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const user = await getUserById(id);
    if (user) {
      return c.json(user);
    }
    return c.json({ message: "User not found" }, 404);
  } catch (error: any) {
    logger.error("controller/userController/getUser: " + error);
    return c.json(
      {
        message:
          error.message || "Something went wrong, please contact support",
      },
      500
    );
  }
};

// Menambahkan pengguna baru
export const addUser = async (c: Context) => {
  try {
    let data = await c.req.json<{
      name: string;
      email: string;
      password: string;
    }>();
    const { name, email, password } = validateUser.parse(data);
    const user = await createUser(name, email, password);
    return c.json(user, 201);
  } catch (error: any) {
    logger.error("controller/userController/addUser: " + error);
    return c.json(
      {
        message:
          JSON.parse(error.message)[0].message ||
          "Something went wrong, please contact support",
      },
      500
    );
  }
};

// Memperbarui pengguna
export const editUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    let data = await c.req.json<{
      name: string;
      email: string;
      password: string;
    }>();
    const { name, email, password } = validateUser.parse(data);
    const user = await updateUser(id, name, email, password);
    if (user) {
      return c.json(user);
    }
    return c.json({ message: "User not found" }, 404);
  } catch (error: any) {
    logger.error("controller/userController/addUser: " + error);
    return c.json(
      {
        message:
          JSON.parse(error.message)[0].message ||
          "Something went wrong, please contact support",
      },
      500
    );
  }
};

// Menghapus pengguna
export const removeUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const success = await deleteUser(id);
    if (success) {
      return c.json({ message: "User deleted" });
    }
    return c.json({ message: "User not found" }, 404);
  } catch (error: any) {
    logger.error("controller/userController/removeUser: " + error);
    return c.json(
      {
        message:
          error.message || "Something went wrong, please contact support",
      },
      500
    );
  }
};

// Login pengguna
export const loginUser = async (c: Context) => {
  try {
    // throw new Error("error tsting saja");
    const { email, password } = await c.req.json<{
      email: string;
      password: string;
    }>();
    const user = await verifyUser(email, password);
    if (user) {
      return c.json({ message: "Login successful", user });
    }
    return c.json({ message: "Invalid credentials" }, 401);
  } catch (error: any) {
    logger.error("controller/userController/loginUser: " + error);
    return c.json(
      {
        message:
          error.message || "Something went wrong, please contact support",
      },
      500
    );
  }
};
