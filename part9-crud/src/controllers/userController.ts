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
    return c.json(
      {
        message: "success",
        data: users,
      },
      200
    );
  } catch (error: unknown) {
    logger.error("controller/userController/getUsers: " + error);
    return c.json(
      {
        message: "Something went wrong, please contact support",
        data: null,
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
      return c.json(
        {
          message: "success",
          data: user,
        },
        200
      );
    }
    return c.json({ message: "User not found", data: null }, 404);
  } catch (error: unknown) {
    logger.error("controller/userController/getUser: " + error);
    return c.json(
      {
        message: "Something went wrong, please contact support",
        data: null,
      },
      500
    );
  }
};

// Menambahkan pengguna baru
export const addUser = async (c: Context) => {
  try {
    const data = await c.req.json<{
      name: string;
      email: string;
      password: string;
    }>();
    const { name, email, password } = validateUser.parse(data);
    const user = await createUser(name, email, password);
    return c.json({ message: "User created", data: user }, 201);
  } catch (error: unknown) {
    logger.error("controller/userController/addUser: " + error);
    if (error instanceof Error) {
      return c.json(
        {
          message:
            JSON.parse(error.message)[0].message ||
            "Something went wrong, please contact support",
          data: null,
        },
        500
      );
    } else {
      return c.json(
        {
          message: "Something went wrong, please contact support",
          data: null,
        },
        500
      );
    }
  }
};

// Memperbarui pengguna
export const editUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const data = await c.req.json<{
      name: string;
      email: string;
      password: string;
    }>();
    const { name, email, password } = validateUser.parse(data);
    const user = await updateUser(id, name, email, password);
    if (user) {
      return c.json({ message: "User updated", data: user }, 200);
    }
    return c.json({ message: "User not found", data: null }, 404);
  } catch (error: unknown) {
    logger.error("controller/userController/addUser: " + error);
    if (error instanceof Error) {
      return c.json(
        {
          message:
            JSON.parse(error.message)[0].message ||
            "Something went wrong, please contact support",
          data: null,
        },
        500
      );
    } else {
      return c.json(
        {
          message: "Something went wrong, please contact support",
          data: null,
        },
        500
      );
    }
  }
};

// Menghapus pengguna
export const removeUser = async (c: Context) => {
  try {
    const { id } = c.req.param();
    const success = await deleteUser(id);
    if (success) {
      return c.json({ message: "User deleted", data: success }, 200);
    }
    return c.json({ message: "User not found", data: null }, 404);
  } catch (error: unknown) {
    logger.error("controller/userController/removeUser: " + error);
    return c.json(
      {
        message: "Something went wrong, please contact support",
        data: null,
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
      return c.json({ message: "Login successful", data: user });
    }
    return c.json({ message: "Invalid credentials", data: null }, 401);
  } catch (error: unknown) {
    logger.error("controller/userController/loginUser: " + error);
    return c.json(
      {
        message: "Something went wrong, please contact support",
        data: null,
      },
      500
    );
  }
};
